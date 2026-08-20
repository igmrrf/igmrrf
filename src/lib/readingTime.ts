export function estimateReadingTime(content: string): { minutes: number; text: string } {
  if (!content) return { minutes: 1, text: "1 min read" };

  const words = content.trim().split(/\s+/).length;
  const minutes = Math.max(1, Math.ceil(words / 200));

  return {
    minutes,
    text: `${minutes} min read`,
  };
}
