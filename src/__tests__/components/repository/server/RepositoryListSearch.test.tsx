import { render, screen } from "@testing-library/react";
import RepositoryListSearch from "@/components/repository/server/RepositoryListSearch";
import { searchRepositories } from "@/lib/github";
import { Repository } from "@/lib/types/github";

// searchRepositories をモック
jest.mock("@/lib/github", () => ({
  searchRepositories: jest.fn(),
}));

const mockSearchRepositories = searchRepositories as jest.Mock;

describe("RepositoryListSearch", () => {
  const mockRepositories: Repository[] = [
    {
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
        avatar_url: "https://github.com/avatar.png",
      },
    },
  ];

  it("キーワードが空なら null を返す", async () => {
    const ui = await RepositoryListSearch({ keyword: "", page: 1 });
    const { container } = render(ui);
    expect(container).toBeEmptyDOMElement();
  });

  it("検索結果が0件", async () => {
    mockSearchRepositories.mockResolvedValueOnce({
      items: [],
      total_count: 0,
    });

    const ui = await RepositoryListSearch({ keyword: "test", page: 1 });
    render(ui);

    expect(mockSearchRepositories).toHaveBeenCalledWith({
      keyword: "test",
      page: 1,
      perPage: 30,
    });

    expect(
      screen.getByText(/検索結果「test」は見つかりませんでした。/)
    ).toBeInTheDocument();
    expect(
      screen.getByText(/キーワードを変えて再検索してみてください。/)
    ).toBeInTheDocument();

    // ページネーションは表示されない
    expect(screen.queryByRole("navigation")).not.toBeInTheDocument();
  });

  it("正常にリポジトリ一覧を表示できる", async () => {
    mockSearchRepositories.mockResolvedValueOnce({
      items: mockRepositories,
      total_count: 40, // 2ページになるように
    });

    const ui = await RepositoryListSearch({ keyword: "test", page: 1 });
    render(ui);

    expect(mockSearchRepositories).toHaveBeenCalledWith({
      keyword: "test",
      page: 1,
      perPage: 30,
    });

    expect(screen.getByText("user/test-repo")).toBeInTheDocument();
    const resultsText = screen.getByText(/検索結果/);
    expect(resultsText).toHaveTextContent(/検索結果 40 件中 1〜30 件を表示/);

    // ページネーションも存在する
    expect(screen.getByRole("navigation")).toBeInTheDocument();
  });

  it("エラー時にメッセージを表示する", async () => {
    mockSearchRepositories.mockRejectedValueOnce(new Error("API error"));

    const ui = await RepositoryListSearch({ keyword: "error", page: 1 });
    render(ui);

    expect(
      screen.getByText(
        "リポジトリの検索中にエラーが発生しました。時間をおいて再試行してください。"
      )
    ).toBeInTheDocument();
  });

  it("検索結果が1ページしかない場合、Paginationは表示されない", async () => {
    mockSearchRepositories.mockResolvedValueOnce({
      items: mockRepositories,
      total_count: 10, // 1ページ分のみ
    });

    const ui = await RepositoryListSearch({ keyword: "single", page: 1 });
    render(ui);

    // ページネーションは表示されない
    expect(screen.queryByRole("navigation")).not.toBeInTheDocument();
  });
});
