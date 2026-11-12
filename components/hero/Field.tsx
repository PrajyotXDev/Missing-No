'use client';

import { useEffect, useRef } from 'react';

/**
 * The hero's one visual idea: a function surface drawn as a point lattice.
 * z = f(x, y, t), plus a damped ripple centred on the pointer. Raw WebGL, no library —
 * roughly twenty thousand points displaced in a single vertex shader.
 */

const VERT = /* glsl */ `
attribute vec2 a_pos;
uniform mat4 u_vp;
uniform vec2 u_extent;
uniform vec2 u_mouse;
uniform float u_strength;
uniform float u_time;
uniform float u_px;
varying float v_alpha;
varying float v_glow;

void main() {
  vec2 p = a_pos * u_extent;
  float t = u_time;

  float h = 0.17 * sin(p.x * 1.35 + t * 0.55) * cos(p.y * 1.15 - t * 0.4);
  h += 0.07 * sin(length(p) * 3.1 - t * 0.9);

  float d = distance(p, u_mouse);
  float bump = exp(-d * d * 1.5);
  h += u_strength * 0.34 * bump * cos(d * 5.2 - t * 2.4);

  vec4 clip = u_vp * vec4(p.x, h, p.y, 1.0);
  gl_Position = clip;

  v_glow = u_strength * exp(-d * d * 2.4);
  gl_PointSize = u_px * (1.0 + v_glow * 1.5) * 3.4 / clip.w;

  float depth = 1.0 - smoothstep(2.2, 7.4, clip.w);
  float edge = (1.0 - smoothstep(0.72, 1.0, abs(a_pos.x))) * (1.0 - smoothstep(0.8, 1.0, abs(a_pos.y)));
  float crest = 0.5 + 0.5 * smoothstep(-0.2, 0.24, h);
  v_alpha = depth * edge * crest;
}
`;

const FRAG = /* glsl */ `
precision mediump float;
uniform vec3 u_base;
uniform vec3 u_accent;
varying float v_alpha;
varying float v_glow;

void main() {
  vec2 c = gl_PointCoord - 0.5;
  float disc = 1.0 - smoothstep(0.18, 0.5, length(c));
  float a = disc * clamp(v_alpha * 1.2 + v_glow * 0.6, 0.0, 1.0);
  vec3 color = mix(u_base, u_accent, clamp(v_glow * 1.35, 0.0, 1.0));
  gl_FragColor = vec4(color * a, a);
}
`;

type Vec3 = [number, number, number];

const sub = (a: Vec3, b: Vec3): Vec3 => [a[0] - b[0], a[1] - b[1], a[2] - b[2]];
const cross = (a: Vec3, b: Vec3): Vec3 => [
  a[1] * b[2] - a[2] * b[1],
  a[2] * b[0] - a[0] * b[2],
  a[0] * b[1] - a[1] * b[0],
];
const dot = (a: Vec3, b: Vec3) => a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
const norm = (a: Vec3): Vec3 => {
  const l = Math.hypot(a[0], a[1], a[2]) || 1;
  return [a[0] / l, a[1] / l, a[2] / l];
};

const EYE: Vec3 = [0, 1.32, 3.5];
const TARGET: Vec3 = [0, -0.18, 0];
const NEAR = 0.1;
const FAR = 20;

function compile(gl: WebGLRenderingContext, type: number, source: string): WebGLShader | null {
  const shader = gl.createShader(type);
  if (!shader) return null;
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    gl.deleteShader(shader);
    return null;
  }
  return shader;
}

export function Field() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext('webgl', {
      alpha: true,
      antialias: false,
      premultipliedAlpha: true,
      powerPreference: 'low-power',
    });
    if (!gl) return;

    const vs = compile(gl, gl.VERTEX_SHADER, VERT);
    const fs = compile(gl, gl.FRAGMENT_SHADER, FRAG);
    const program = gl.createProgram();
    if (!vs || !fs || !program) return;
    gl.attachShader(program, vs);
    gl.attachShader(program, fs);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) return;
    gl.useProgram(program);

    const compact = window.matchMedia('(max-width: 767px)').matches;
    const cols = compact ? 84 : 176;
    const rows = compact ? 96 : 118;
    const points = new Float32Array(cols * rows * 2);
    let k = 0;
    for (let j = 0; j < rows; j++) {
      for (let i = 0; i < cols; i++) {
        points[k++] = (i / (cols - 1)) * 2 - 1;
        points[k++] = (j / (rows - 1)) * 2 - 1;
      }
    }
    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, points, gl.STATIC_DRAW);
    const aPos = gl.getAttribLocation(program, 'a_pos');
    gl.enableVertexAttribArray(aPos);
    gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0);

    const uniform = (name: string) => gl.getUniformLocation(program, name);
    const uVp = uniform('u_vp');
    const uExtent = uniform('u_extent');
    const uMouse = uniform('u_mouse');
    const uStrength = uniform('u_strength');
    const uTime = uniform('u_time');
    const uPx = uniform('u_px');
    gl.uniform3f(uniform('u_base'), 0.949, 0.937, 0.91);
    gl.uniform3f(uniform('u_accent'), 1.0, 0.357, 0.122);

    gl.disable(gl.DEPTH_TEST);
    gl.enable(gl.BLEND);
    gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);
    gl.clearColor(0, 0, 0, 0);

    // Camera basis, reused for the projection matrix and for pointer picking.
    const forward = norm(sub(TARGET, EYE));
    const right = norm(cross(forward, [0, 1, 0]));
    const up = cross(right, forward);

    let width = 1;
    let height = 1;
    let tanHalf = Math.tan((38 * Math.PI) / 360);
    let aspect = 1;
    const extent: [number, number] = [3.9, 3.1];

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const rect = canvas.getBoundingClientRect();
      width = Math.max(1, Math.round(rect.width * dpr));
      height = Math.max(1, Math.round(rect.height * dpr));
      canvas.width = width;
      canvas.height = height;
      gl.viewport(0, 0, width, height);

      aspect = width / height;
      const portrait = aspect < 1;
      tanHalf = Math.tan(((portrait ? 58 : 38) * Math.PI) / 360);
      extent[0] = portrait ? 2.6 : 3.9;
      extent[1] = portrait ? 3.3 : 3.1;

      const f = 1 / tanHalf;
      const proj = [
        f / aspect, 0, 0, 0,
        0, f, 0, 0,
        0, 0, (FAR + NEAR) / (NEAR - FAR), -1,
        0, 0, (2 * FAR * NEAR) / (NEAR - FAR), 0,
      ];
      const view = [
        right[0], up[0], -forward[0], 0,
        right[1], up[1], -forward[1], 0,
        right[2], up[2], -forward[2], 0,
        -dot(right, EYE), -dot(up, EYE), dot(forward, EYE), 1,
      ];
      const vp = new Float32Array(16);
      for (let c = 0; c < 4; c++) {
        for (let r = 0; r < 4; r++) {
          let sum = 0;
          for (let n = 0; n < 4; n++) sum += proj[n * 4 + r] * view[c * 4 + n];
          vp[c * 4 + r] = sum;
        }
      }
      gl.uniformMatrix4fv(uVp, false, vp);
      gl.uniform2f(uExtent, extent[0], extent[1]);
      gl.uniform1f(uPx, (portrait ? 1.7 : 1.75) * dpr);
    };

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const pointer = { x: 0.9, y: 0.2, tx: 0.9, ty: 0.2, strength: 0, target: 0, active: false };
    let frame = 0;
    let visible = true;
    let shown = false;
    const start = performance.now();

    const draw = (now: number) => {
      const t = reduced ? 4.2 : (now - start) / 1000;

      if (!pointer.active) {
        // No pointer over the hero (or a touch device): let the ripple wander on its own.
        pointer.tx = Math.cos(t * 0.31) * extent[0] * 0.42;
        pointer.ty = Math.sin(t * 0.47) * extent[1] * 0.3 + 0.2;
        pointer.target = 0.6;
      }
      pointer.x += (pointer.tx - pointer.x) * 0.07;
      pointer.y += (pointer.ty - pointer.y) * 0.07;
      pointer.strength += (pointer.target - pointer.strength) * 0.05;

      gl.uniform1f(uTime, t);
      gl.uniform2f(uMouse, pointer.x, pointer.y);
      gl.uniform1f(uStrength, reduced ? 0.6 : pointer.strength);
      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.drawArrays(gl.POINTS, 0, cols * rows);

      if (!shown) {
        shown = true;
        canvas.style.opacity = '1';
      }
    };

    const loop = (now: number) => {
      draw(now);
      frame = requestAnimationFrame(loop);
    };
    const play = () => {
      cancelAnimationFrame(frame);
      if (reduced) {
        draw(performance.now());
      } else if (visible && !document.hidden) {
        frame = requestAnimationFrame(loop);
      }
    };

    const onPointer = (e: PointerEvent) => {
      if (e.pointerType !== 'mouse') return;
      const rect = canvas.getBoundingClientRect();
      const inside =
        e.clientX >= rect.left && e.clientX <= rect.right && e.clientY >= rect.top && e.clientY <= rect.bottom;
      if (!inside) {
        pointer.active = false;
        return;
      }
      // Cast a ray through the pointer and intersect it with the y = 0 plane.
      const nx = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const ny = 1 - ((e.clientY - rect.top) / rect.height) * 2;
      const dir: Vec3 = [
        forward[0] + right[0] * nx * tanHalf * aspect + up[0] * ny * tanHalf,
        forward[1] + right[1] * nx * tanHalf * aspect + up[1] * ny * tanHalf,
        forward[2] + right[2] * nx * tanHalf * aspect + up[2] * ny * tanHalf,
      ];
      if (dir[1] >= -0.02) {
        pointer.active = false;
        return;
      }
      const s = -EYE[1] / dir[1];
      pointer.tx = Math.max(-extent[0], Math.min(extent[0], EYE[0] + dir[0] * s));
      pointer.ty = Math.max(-extent[1], Math.min(extent[1], EYE[2] + dir[2] * s));
      pointer.target = 1;
      pointer.active = true;
    };

    const onVisibility = () => play();
    const onLost = (e: Event) => {
      e.preventDefault();
      cancelAnimationFrame(frame);
    };

    const resizeObserver = new ResizeObserver(() => {
      resize();
      if (reduced) draw(performance.now());
    });
    resizeObserver.observe(canvas);

    const viewObserver = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      play();
    });
    viewObserver.observe(canvas);

    resize();
    play();
    if (!reduced) window.addEventListener('pointermove', onPointer, { passive: true });
    document.addEventListener('visibilitychange', onVisibility);
    canvas.addEventListener('webglcontextlost', onLost);

    return () => {
      cancelAnimationFrame(frame);
      resizeObserver.disconnect();
      viewObserver.disconnect();
      window.removeEventListener('pointermove', onPointer);
      document.removeEventListener('visibilitychange', onVisibility);
      canvas.removeEventListener('webglcontextlost', onLost);
      gl.deleteBuffer(buffer);
      gl.deleteProgram(program);
      gl.deleteShader(vs);
      gl.deleteShader(fs);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="absolute inset-0 h-full w-full opacity-0 transition-opacity duration-[1600ms] ease-out"
    />
  );
}
