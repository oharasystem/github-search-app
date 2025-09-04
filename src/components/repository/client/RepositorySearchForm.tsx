"use client";

import { useEffect, useState } from "react";

interface Props {
  initialKeyword?: string;
}

export default function RepositorySearchForm({ initialKeyword = "" }: Props) {
  const [keyword, setKeyword] = useState(initialKeyword);

  useEffect(() => {
    setKeyword(initialKeyword);
  }, [initialKeyword]);

  return (
    <form action="/" method="get" className="flex mb-6">
      <input
        type="text"
        name="keyword"
        defaultValue={keyword}
        placeholder="キーワードを入力"
        className="flex-1 p-3 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-gray-800 focus:border-gray-800"
      />
      <input type="hidden" name="page" value="1" />
      <button
        type="submit"
        className="px-4 bg-gray-900 text-white rounded-r-md hover:bg-gray-700 transition-colors"
      >
        検索
      </button>
    </form>
  );
}
