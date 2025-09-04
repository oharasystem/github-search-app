"use client";

export default function RepositoryDetailSkeleton() {
  return (
    <div className="p-4 border border-gray-200 rounded-md shadow-sm animate-pulse bg-white">
      <div className="h-6 bg-gray-300 rounded w-1/3 mb-4"></div>
      <div className="h-4 bg-gray-300 rounded w-2/3 mb-2"></div>
      <div className="h-4 bg-gray-300 rounded w-full mb-2"></div>
      <div className="h-4 bg-gray-300 rounded w-5/6 mb-6"></div>
      <div className="flex space-x-4">
        <div className="h-10 bg-gray-300 rounded w-24"></div>
        <div className="h-10 bg-gray-300 rounded w-24"></div>
        <div className="h-10 bg-gray-300 rounded w-24"></div>
      </div>
    </div>
  );
}
