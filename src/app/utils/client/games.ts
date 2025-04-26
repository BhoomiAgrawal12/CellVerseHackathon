import { useQuery } from "@tanstack/react-query";

const fetchProgress = async (userId: string, gameType?: string) => {
  const res = await fetch(
    `/api/games/progress?userId=${userId}${
      gameType ? `&gameType=${gameType}` : ""
    }`
  );
  if (!res.ok) throw new Error("Failed to fetch progress");
  return res.json();
};

export function useGameProgress(userId?: string, gameType?: string) {
  return useQuery({
    queryKey: userId
      ? ["gameProgress", userId, gameType ?? "all"]
      : ["gameProgress", "anonymous"],
    queryFn: () => fetchProgress(userId!, gameType), // Use `!` since `enabled` ensures `userId` is defined
    enabled: !!userId, // Prevents query from running if `userId` is missing
  });
}
