"use client";

import { useState, useEffect } from "react";
import { Heart } from "lucide-react";
import { cn } from "@/lib/utils";

interface LikeButtonProps {
  slug: string;
}

export function LikeButton({ slug }: LikeButtonProps) {
  const [likes, setLikes] = useState<number | null>(null);
  const [isLiking, setIsLiking] = useState(false);
  const [hasLiked, setHasLiked] = useState(false);

  useEffect(() => {
    fetch(`/api/blog/likes?slug=${slug}`)
      .then((res) => res.json())
      .then((data) => setLikes(data.count))
      .catch((err) => console.error("Failed to fetch likes:", err));
    
    // Check if user has already liked in this session (simple local storage check)
    const likedPosts = JSON.parse(localStorage.getItem("liked_posts") || "[]");
    if (likedPosts.includes(slug)) {
      setHasLiked(true);
    }
  }, [slug]);

  const handleLike = async () => {
    if (isLiking || hasLiked) return;
    setIsLiking(true);

    try {
      const res = await fetch("/api/blog/likes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ slug }),
      });

      if (res.ok) {
        const data = await res.json();
        setLikes(data.count);
        setHasLiked(true);
        const likedPosts = JSON.parse(localStorage.getItem("liked_posts") || "[]");
        localStorage.setItem("liked_posts", JSON.stringify([...likedPosts, slug]));
      }
    } catch (err) {
      console.error("Failed to like:", err);
    } finally {
      setIsLiking(false);
    }
  };

  return (
    <button
      onClick={handleLike}
      disabled={isLiking}
      className={cn(
        "flex items-center gap-3 px-6 py-3 border font-mono text-[10px] tracking-widest uppercase transition-all duration-300 active:scale-95",
        hasLiked 
          ? "bg-primary text-primary-foreground border-primary" 
          : "hover:bg-muted border-border text-muted-foreground hover:text-foreground"
      )}
    >
      <Heart className={cn("h-4 w-4", hasLiked && "fill-current")} />
      <span className="font-black">{likes === null ? "..." : `Likes.count(${likes})`}</span>
    </button>
  );
}
