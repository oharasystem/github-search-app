"use client";

import Image from "next/image";
import Link from "next/link";
import { Repository } from "@/lib/types/github";

type Props = {
  repo?: Repository;
};

export function RepositoryCardContent({ repo }: Props) {
  const isLoading = !repo;
  return (
    <div className="flex items-center space-x-4 p-4 border border-gray-300 rounded-md bg-white hover:shadow-md transition-shadow">
      {isLoading ? (
        <div className="w-12 h-12 rounded-full bg-gray-200 animate-pulse" />
      ) : (
        <Image
          src={repo.owner.avatar_url}
          alt={repo.owner.login}
          width={48}
          height={48}
          className="w-12 h-12 rounded-full"
        />
      )}
      <div className="flex-1 w-0">
        {isLoading ? (
          <div className="h-4 bg-gray-200 rounded w-3/4 animate-pulse mb-1" />
        ) : (
          <p className="font-semibold text-gray-900 mb-1 break-words">
            {repo.full_name}
          </p>
        )}
        {isLoading ? (
          <div className="h-3 bg-gray-200 rounded w-8 animate-pulse" />
        ) : (
          <p className="text-sm text-gray-600 mb-1">{repo.language || ""}</p>
        )}
      </div>
    </div>
  );
}

type CardLinkProps = {
  repo: Repository;
};

export function RepositoryCardLink({ repo }: CardLinkProps) {
  return (
    <Link href={`/repository/${repo.owner.login}/${repo.name}`}>
      <RepositoryCardContent repo={repo} />
    </Link>
  );
}

type CardProps = {
  repo?: Repository;
};

export default function RepositoryCard({ repo }: CardProps) {
  if (!repo)
    return (
      <li>
        <RepositoryCardContent />
      </li>
    );
  return (
    <li>
      <RepositoryCardLink repo={repo} />
    </li>
  );
}
