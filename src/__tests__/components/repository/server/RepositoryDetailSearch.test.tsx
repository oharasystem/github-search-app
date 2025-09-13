import { render, screen } from "@testing-library/react";
import RepositoryDetailSearch from "@/components/repository/server/RepositoryDetailSearch";
import { fetchRepository } from "@/lib/github";
import { Repository } from "@/lib/types/github";

// fetchRepository をモック
jest.mock("@/lib/github", () => ({
  fetchRepository: jest.fn(),
}));

const mockFetchRepository = fetchRepository as jest.Mock;

describe("RepositoryDetailSearch", () => {
  const mockRepo: Repository = {
    id: 1,
    name: "example-repo",
    full_name: "octocat/example-repo",
    owner: {
      login: "octocat",
      avatar_url: "/avatar.png",
    },
    language: "TypeScript",
    stargazers_count: 42,
    watchers_count: 10,
    forks_count: 5,
    open_issues_count: 2,
    html_url: "https://github.com/octocat/example-repo",
  };

  it("正常にリポジトリ詳細を表示できる", async () => {
    mockFetchRepository.mockResolvedValueOnce(mockRepo);

    const ui = await RepositoryDetailSearch({
      owner: "octocat",
      repo: "example-repo",
    });
    render(ui);

    expect(mockFetchRepository).toHaveBeenCalledWith({
      owner: "octocat",
      repo: "example-repo",
    });
    expect(screen.getByText(mockRepo.full_name)).toBeInTheDocument();
    expect(screen.getByText(mockRepo.language!)).toBeInTheDocument();
  });

  it("エラー時にメッセージを表示する", async () => {
    mockFetchRepository.mockRejectedValueOnce(new Error("API error"));

    const ui = await RepositoryDetailSearch({
      owner: "octocat",
      repo: "example-repo",
    });
    render(ui);

    expect(
      screen.getByText(
        "リポジトリの取得中にエラーが発生しました。時間をおいて再試行してください。"
      )
    ).toBeInTheDocument();
  });
});
