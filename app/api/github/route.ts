import { NextResponse } from "next/server";

export const revalidate = 3600; // cache 1 hour

const USERNAME = process.env.NEXT_PUBLIC_GITHUB_USERNAME || "octocat";
const TOKEN = process.env.GITHUB_TOKEN;

type Repo = {
  id: number;
  name: string;
  full_name: string;
  html_url: string;
  description: string | null;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  updated_at: string;
  fork: boolean;
  archived: boolean;
};

export async function GET() {
  try {
    const headers: HeadersInit = {
      Accept: "application/vnd.github+json",
      "X-GitHub-Api-Version": "2022-11-28",
    };
    if (TOKEN) headers.Authorization = `Bearer ${TOKEN}`;

    const [reposRes, userRes] = await Promise.all([
      fetch(
        `https://api.github.com/users/${USERNAME}/repos?per_page=100&sort=updated`,
        { headers, next: { revalidate: 3600 } }
      ),
      fetch(`https://api.github.com/users/${USERNAME}`, {
        headers,
        next: { revalidate: 3600 },
      }),
    ]);

    if (!reposRes.ok || !userRes.ok) {
      return NextResponse.json(
        { error: "GitHub fetch failed", status: reposRes.status },
        { status: 502 }
      );
    }

    const allRepos = (await reposRes.json()) as Repo[];
    const user = await userRes.json();

    const repos = allRepos
      .filter((r) => !r.fork && !r.archived)
      .sort((a, b) => b.stargazers_count - a.stargazers_count)
      .slice(0, 9)
      .map((r) => ({
        id: r.id,
        name: r.name,
        url: r.html_url,
        description: r.description,
        language: r.language,
        stars: r.stargazers_count,
        forks: r.forks_count,
        updated: r.updated_at,
      }));

    const totalStars = allRepos.reduce(
      (acc, r) => acc + r.stargazers_count,
      0
    );

    return NextResponse.json({
      user: {
        login: user.login,
        name: user.name,
        avatar: user.avatar_url,
        bio: user.bio,
        followers: user.followers,
        following: user.following,
        publicRepos: user.public_repos,
        url: user.html_url,
      },
      stats: {
        totalStars,
        totalRepos: allRepos.length,
      },
      repos,
    });
  } catch (e) {
    return NextResponse.json(
      { error: "Internal error" },
      { status: 500 }
    );
  }
}
