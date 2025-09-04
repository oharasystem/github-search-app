"use client";

export default function RepositoryCardSkeleton() {
  return (
    <li className="p-4 border border-gray-200 rounded-md animate-pulse bg-white">
      <div className="h-4 bg-gray-300 rounded w-3/4 mb-2"></div>
      <div className="h-3 bg-gray-200 rounded w-1/2"></div>
    </li>
  );
}
