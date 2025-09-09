"use client";

import Image from "next/image";
import IssueIcon from "@/components/icons/IssueIcon";
import ForkIcon from "@/components/icons/ForkIcon";
import StarIcon from "@/components/icons/StarIcon";
import WatcherIcon from "@/components/icons/WatcherIcon";
import RepositoryStat from "@/components/repository/client/RepositoryStat";
import { Repository } from "@/lib/types/github";

type Props = {
  repo?: Repository;
};

export default function RepositoryDetail({ repo }: Props) {
  const isLoading = !repo;
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm max-w-3xl mx-auto">
      <div className="flex items-center space-x-4 mb-6">
        {isLoading ? (
          <div className="w-16 aspect-square rounded-full bg-gray-200 animate-pulse" />
        ) : (
          <Image
            src={repo.owner.avatar_url}
            alt={repo.owner.login}
            width={64}
            height={64}
            className="w-16 h-16 rounded-full"
          />
        )}
        <div className="w-full">
          <h2 className="text-2xl font-semibold">
            {isLoading ? (
              <div className="h-6 w-full bg-gray-200 rounded animate-pulse" />
            ) : (
              <a
                href={repo.html_url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                {repo.full_name}
              </a>
            )}
          </h2>
          {isLoading ? (
            <div className="h-4 w-20 bg-gray-200 rounded mt-2 animate-pulse" />
          ) : (
            <p className="text-gray-500 mt-1">{repo.language || "言語不明"}</p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-gray-700">
        <RepositoryStat
          icon={<StarIcon />}
          value={repo?.stargazers_count}
          label="stars"
          isLoading={isLoading}
        />
        <RepositoryStat
          icon={<WatcherIcon />}
          value={repo?.watchers_count}
          label="watching"
          isLoading={isLoading}
        />
        <RepositoryStat
          icon={<ForkIcon />}
          value={repo?.forks_count}
          label="forks"
          isLoading={isLoading}
        />
        <RepositoryStat
          icon={<IssueIcon />}
          value={repo?.open_issues_count}
          label="issues"
          isLoading={isLoading}
        />
      </div>
    </div>
  );
}
