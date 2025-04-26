"use client";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

const VideoPage = () => {
  const searchParams = useSearchParams();
  const query = searchParams.get("query") || "default video";
  console.log("Query:", query);
  const [videoId, setVideoId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  setVideoId(query);

  // useEffect(() => {
  //   // Fetch YouTube video ID based on query from backend
  //   fetch(`/api/youtube?query=${encodeURIComponent(query)}`)
  //     .then((res) => res.json())
  //     .then((data) => {
  //       setVideoId(data.videoId); // Assuming backend returns { videoId: "..." }
  //       setLoading(false);
  //     })
  //     .catch(() => {
  //       setLoading(false);
  //       setVideoId(null);
  //     });
  // }, [query]);

  if (loading) {
    return <p className="text-center text-gray-500">Loading video...</p>;
  }

  if (!videoId) {
    return (
      <p className="text-center text-blue-500">No video found for "{query}"</p>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8 bg-gray-100">
      <h1 className="text-3xl font-bold mb-6 text-blue-700">Watch Video</h1>
      <div className="w-full max-w-2xl">
        <iframe
          width="100%"
          height="400"
          src={`https://www.youtube.com/embed/wOt2cFPQpV0`}
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="rounded-lg shadow-lg"
        ></iframe>
      </div>
      <a href="/" className="mt-6 text-blue-600 hover:underline text-lg">
        Back to Task Manager
      </a>
    </div>
  );
};

export default VideoPage;
