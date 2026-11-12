import Link from 'next/link';

export default function NotFound() {
  return (
    <main id="main" className="shell flex min-h-[100svh] flex-col justify-between py-10">
      <p className="label text-mute">Error 404</p>
      <div>
        <h1 className="display text-[26vw] md:text-[18vw]">
          Undefined<span className="text-accent">.</span>
        </h1>
        <p className="mt-8 max-w-[28rem] text-lg leading-relaxed text-mute">
          This page is outside the domain of the function. The rest of the site is well defined.
        </p>
        <Link href="/" className="btn mt-10">
          Back to the start
        </Link>
      </div>
      <p className="label text-dim">f(x) has no value here</p>
    </main>
  );
}
