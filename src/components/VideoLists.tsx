"use client";

import { useState, useEffect } from "react";

interface Video {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
}

export default function VideoList({ query }: { query: string }) {
  const [videos, setVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchVideos = async () => {
      setLoading(true);
      setError(null);

      try {
        const res = await fetch(
          `/api/youtube?query=${encodeURIComponent(query)}`
        );
        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.error || "Failed to fetch videos");
        }

        setVideos(data.allVideos); // Expecting an array of videos
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchVideos();
  }, [query]);

  if (loading) return <p className="text-center text-gray-500">Loading...</p>;
  if (error) return <p className="text-center text-red-500">Error: {error}</p>;
  if (!videos.length)
    return <p className="text-center text-gray-500">No videos found.</p>;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {videos.map((video) => (
        <div
          key={video.id}
          className="border p-4 rounded-lg shadow-lg bg-white"
        >
          <h2 className="text-xl font-semibold">{video.title}</h2>
          <p className="text-gray-600">{video.description}</p>

          {/* Embed YouTube Video */}
          <div className="relative w-full aspect-video mt-3">
            <iframe
              width="100%"
              height="315"
              src={`https://www.youtube.com/embed/${video.id}`}
              title={video.title}
              allowFullScreen
              className="rounded-lg shadow-md"
            ></iframe>
          </div>
        </div>
      ))}
    </div>
  );
}
