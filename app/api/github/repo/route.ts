import { NextResponse } from "next/server";
import repoTreesData from "@/data/repo-trees.json";

export const dynamic = "force-dynamic";

const USERNAME = process.env.NEXT_PUBLIC_GITHUB_USERNAME || "Subhan696";
const TOKEN = process.env.GITHUB_TOKEN;

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const name = searchParams.get("name");

  if (!name) {
    return NextResponse.json({ error: "Missing repository name" }, { status: 400 });
  }

  const trees = repoTreesData as Record<string, string>;
  const tree = trees[name] || null;

  // Try fetching raw README
  let readme = "";
  const branches = ["main", "master"];
  const filenames = ["README.md", "readme.md", "README.txt", "readme.txt"];

  for (const branch of branches) {
    if (readme) break;
    for (const filename of filenames) {
      try {
        const rawRes = await fetch(
          `https://raw.githubusercontent.com/${USERNAME}/${name}/${branch}/${filename}`,
          { next: { revalidate: 3600 } }
        );
        if (rawRes.ok) {
          readme = await rawRes.text();
          break;
        }
      } catch {
        // continue
      }
    }
  }

  // Fallback: fetch through GitHub REST API
  if (!readme) {
    try {
      const headers: HeadersInit = {
        Accept: "application/vnd.github.raw+json",
        "X-GitHub-Api-Version": "2022-11-28",
      };
      if (TOKEN) headers.Authorization = `Bearer ${TOKEN}`;

      const apiRes = await fetch(
        `https://api.github.com/repos/${USERNAME}/${name}/readme`,
        { headers, next: { revalidate: 3600 } }
      );
      if (apiRes.ok) {
        readme = await apiRes.text();
      }
    } catch {
      // ignore
    }
  }

  // Fallback default message if repository does not have a README
  if (!readme) {
    readme = `# ${name}\n\nThis repository is part of **Subhan Kashif**'s public projects portfolio.\n\n### Overview\n- **Repository**: [https://github.com/${USERNAME}/${name}](https://github.com/${USERNAME}/${name})\n- **Author**: ${USERNAME}\n\n*No dedicated README file was published in this repository yet. You can inspect the project folder structure in the "Folder Structure" tab.*`;
  }

  return NextResponse.json({
    name,
    readme,
    tree: tree || buildGenericTree(name),
    url: `https://github.com/${USERNAME}/${name}`,
  });
}

function buildGenericTree(name: string): string {
  return `├── src\n│   ├── index.ts\n│   └── components\n├── package.json\n└── README.md`;
}
