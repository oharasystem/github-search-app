export type Owner = {
  login: string;
  avatar_url: string;
};

export type Repository = {
  id: number;
  name: string;
  full_name: string;
  html_url: string;
  owner: Owner;
  language: string | null;
  stargazers_count: number;
  watchers_count: number;
  forks_count: number;
  open_issues_count: number;
};
