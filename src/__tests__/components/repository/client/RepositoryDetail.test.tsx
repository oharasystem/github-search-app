import { render, screen, within } from "@testing-library/react";
import RepositoryDetail from "@/components/repository/client/RepositoryDetail";
import { Repository } from "@/lib/types/github";

const mockRepo: Repository = {
  id: 1,
  name: "test-repo",
  full_name: "user/test-repo",
  html_url: "https://github.com/user/test-repo",
  stargazers_count: 10,
  watchers_count: 5,
  forks_count: 3,
  open_issues_count: 2,
  language: "TypeScript",
  owner: {
    login: "user",
    avatar_url: "https://example.com/avatar.png",
  },
};

describe("RepositoryDetail", () => {
  it("ローディング中はプレースホルダーを表示する", () => {
    const { container } = render(<RepositoryDetail />);

    expect(screen.queryByRole("test-repo")).not.toBeInTheDocument();
    expect(screen.queryByText("user/test-repo")).not.toBeInTheDocument();
    expect(screen.queryByText("TypeScript")).not.toBeInTheDocument();
    const skeletons = container.querySelectorAll(".animate-pulse");
    expect(skeletons.length).toEqual(7);
  });

  it("リポジトリ情報を正しく表示する", () => {
    render(<RepositoryDetail repo={mockRepo} />);

    expect(
      screen.getByRole("link", { name: "user/test-repo" })
    ).toHaveAttribute("href", "https://github.com/user/test-repo");

    expect(screen.getByText("TypeScript")).toBeInTheDocument();
    expect(screen.getByText("stars")).toBeInTheDocument();
    expect(screen.getByText("watching")).toBeInTheDocument();
    expect(screen.getByText("forks")).toBeInTheDocument();
    expect(screen.getByText("issues")).toBeInTheDocument();

    const stars = screen.getByText("stars").closest("div")!;
    expect(within(stars).getByText("10")).toBeInTheDocument();

    const watching = screen.getByText("watching").closest("div")!;
    expect(within(watching).getByText("5")).toBeInTheDocument();

    const forks = screen.getByText("forks").closest("div")!;
    expect(within(forks).getByText("3")).toBeInTheDocument();

    const issues = screen.getByText("issues").closest("div")!;
    expect(within(issues).getByText("2")).toBeInTheDocument();
  });

  it("言語が未設定の場合は '言語不明' を表示する", () => {
    const repoWithoutLanguage = {
      ...mockRepo,
      language: null as string | null,
    };

    render(<RepositoryDetail repo={repoWithoutLanguage} />);
    expect(screen.getByText("言語不明")).toBeInTheDocument();
  });
});
