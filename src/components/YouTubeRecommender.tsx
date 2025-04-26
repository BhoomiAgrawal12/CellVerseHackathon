"use client";

import { useState } from "react";
import VideoList from "./VideoLists";

export default function VideoSearch() {
  const [query, setQuery] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchTerm(query); // Trigger fetching videos with the search term
  };

  return (
    <div className="w-full lg-w-[80%] mx-auto p-4 flex flex-col justify-center items-center ">
      <h1 className="text-3xl w-[60%] font-bold text-center mb-6">YouTube Video Search</h1>

      {/* Search Bar */}
      <form onSubmit={handleSearch} className="flex items-center gap-2 mb-6">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for videos..."
          className="flex-1 p-2 border rounded-lg"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Search
        </button>
      </form>

      {/* Video List Component */}
      {searchTerm && <VideoList query={searchTerm} />}
    </div>
  );
}
