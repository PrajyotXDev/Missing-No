import { NextResponse } from 'next/server';

export async function GET() {
  const username = process.env.GITHUB_USERNAME ?? 'PrajyotXDev';
  const headers: HeadersInit = { Accept: 'application/vnd.github+json' };
  if (process.env.GITHUB_TOKEN) headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;

  const [userRes, repoRes] = await Promise.all([
    fetch(`https://api.github.com/users/${username}`, { headers, next: { revalidate: 3600 } }),
    fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=6`, { headers, next: { revalidate: 900 } }),
  ]);
  if (!userRes.ok || !repoRes.ok) return NextResponse.json({ error: 'GitHub API unavailable' }, { status: 502 });

  const user = await userRes.json();
  const repos = await repoRes.json();
  return NextResponse.json({
    profile: { login: user.login, avatar_url: user.avatar_url, public_repos: user.public_repos, followers: user.followers, html_url: user.html_url },
    repos: repos.map((r: any) => ({ name: r.name, description: r.description, html_url: r.html_url, language: r.language, stars: r.stargazers_count, forks: r.forks_count, updated_at: r.updated_at }))
  });
}
