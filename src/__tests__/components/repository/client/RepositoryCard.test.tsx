import { render, screen } from "@testing-library/react";
import RepositoryCard from "@/components/repository/client/RepositoryCard";
import { Repository } from "@/lib/types/github";

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

describe("RepositoryCard", () => {
  it("renders loading skeleton when repo is undefined", () => {
    const { container } = render(<RepositoryCard />);
    expect(screen.queryByRole("img", { hidden: true })).not.toBeInTheDocument();
    expect(screen.queryByRole(mockRepo.full_name)).not.toBeInTheDocument();
    expect(screen.queryByRole(mockRepo.language!)).not.toBeInTheDocument();
    expect(screen.queryByRole("link")).not.toBeInTheDocument();
    const skeletons = container.querySelectorAll(".animate-pulse");
    expect(skeletons.length).toEqual(3);
  });

  it("renders repository data when repo is provided", () => {
    render(<RepositoryCard repo={mockRepo} />);
    const img = screen.getByRole("img");
    expect(img).toHaveAttribute("src");
    expect(img.getAttribute("src")!).toContain(
      "/_next/image?url=" + encodeURIComponent(mockRepo.owner.avatar_url)
    );
    expect(img).toHaveAttribute("alt", mockRepo.owner.login);
    expect(screen.getByText(mockRepo.full_name)).toBeInTheDocument();
    expect(screen.getByText(mockRepo.language!)).toBeInTheDocument();
    const link = screen.getByRole("link");
    expect(link).toHaveAttribute(
      "href",
      `/repository/${mockRepo.owner.login}/${mockRepo.name}`
    );
  });
});
