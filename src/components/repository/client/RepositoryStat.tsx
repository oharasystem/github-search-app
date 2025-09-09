"use client";

type RepositoryStatProps = {
  icon: React.ReactNode;
  value?: number;
  label: string;
  isLoading: boolean;
};

export default function RepositoryStat({
  icon,
  value,
  label,
  isLoading,
}: RepositoryStatProps) {
  return (
    <div className="flex items-center space-x-2">
      {icon}
      <div className="flex items-center">
        {isLoading ? (
          <div className="h-4 w-6 bg-gray-200 rounded animate-pulse" />
        ) : (
          <div>{value}</div>
        )}
        <span className="ml-1">{label}</span>
      </div>
    </div>
  );
}
