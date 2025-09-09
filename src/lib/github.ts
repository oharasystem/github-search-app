import { notFound } from "next/navigation";

const GITHUB_TOKEN = process.env.GITHUB_TOKEN;

export function getGitHubHeaders() {
  return {
    Accept: "application/vnd.github.v3+json",
    ...(GITHUB_TOKEN ? { Authorization: `token ${GITHUB_TOKEN}` } : {}),
  };
}

interface RepositoryParams {
  owner: string;
  repo: string;
}
export async function fetchRepository({ owner, repo }: RepositoryParams) {
  const res = await fetch(`https://api.github.com/repos/${owner}/${repo}`, {
    headers: getGitHubHeaders(),
    cache: "no-store",
  });

  if (!res.ok) {
    if (res.status === 404) {
      return notFound();
    }
    const error = new Error(
      `GitHub API error: ${res.status} ${res.statusText}`
    );
    throw error;
  }

  return res.json();
}

interface SearchParams {
  keyword: string;
  page: number;
  perPage: number;
}
export async function searchRepositories({
  keyword,
  page = 1,
  perPage = 30,
}: SearchParams) {
  const params = new URLSearchParams({
    q: keyword,
    sort: "stars",
    order: "desc",
    per_page: perPage.toString(),
    page: page.toString(),
  });

  const res = await fetch(
    `https://api.github.com/search/repositories?${params}`,
    {
      headers: getGitHubHeaders(),
      cache: "no-store",
    }
  );

  if (!res.ok) {
    throw new Error(`GitHub API error: ${res.status} ${res.statusText}`);
  }

  return res.json();
}
