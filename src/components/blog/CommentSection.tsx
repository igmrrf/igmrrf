"use client";

import { useState, useEffect } from "react";
import { MessageSquare, Reply, User } from "lucide-react";
import { cn } from "@/lib/utils";

interface Comment {
  id: string;
  author_name: string;
  content: string;
  parent_id: string | null;
  created_at: string;
}

interface CommentSectionProps {
  slug: string;
}

export function CommentSection({ slug }: CommentSectionProps) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [authorName, setAuthorName] = useState("");
  const [newComment, setNewComment] = useState("");
  const [replyTo, setReplyTo] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    fetch(`/api/blog/comments?slug=${slug}`)
      .then((res) => res.json())
      .then((data) => setComments(data.comments))
      .catch((err) => console.error("Failed to fetch comments:", err));
  }, [slug]);

  const handleSubmit = async (parentId: string | null = null) => {
    if (!authorName.trim() || !newComment.trim() || isSubmitting) return;
    setIsSubmitting(true);

    try {
      const res = await fetch("/api/blog/comments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          slug,
          author_name: authorName,
          content: newComment,
          parent_id: parentId,
        }),
      });

      if (res.ok) {
        const { comment } = await res.json();
        setComments((prev) => [...prev, comment]);
        setNewComment("");
        setReplyTo(null);
      }
    } catch (err) {
      console.error("Failed to submit comment:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const rootComments = comments.filter((c) => !c.parent_id);
  const replies = comments.filter((c) => c.parent_id);

  return (
    <div className="flex flex-col gap-12 pt-16 border-t border-border mt-20">
      <div className="flex items-center gap-3 text-[10px] font-mono tracking-[0.4em] uppercase text-primary">
        <MessageSquare className="h-4 w-4" />
        Thread_Log.view({comments.length})
      </div>

      {/* New Comment Form */}
      <div className="flex flex-col gap-6 p-10 border border-border bg-accent/20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex flex-col gap-3">
            <label className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">Author.name</label>
            <input
              type="text"
              value={authorName}
              onChange={(e) => setAuthorName(e.target.value)}
              className="px-4 py-3 bg-background border border-border focus:outline-none focus:ring-1 focus:ring-primary/30 transition-all font-mono text-xs"
              placeholder="System_User"
            />
          </div>
        </div>
        <div className="flex flex-col gap-3">
          <label className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">Payload.content</label>
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            className="px-4 py-3 bg-background border border-border focus:outline-none focus:ring-1 focus:ring-primary/30 min-h-[120px] transition-all font-mono text-xs"
            placeholder="Share insights..."
          />
        </div>
        <button
          onClick={() => handleSubmit()}
          disabled={isSubmitting || !authorName.trim() || !newComment.trim()}
          className="self-end px-8 py-4 bg-foreground text-background font-mono text-[10px] tracking-widest uppercase hover:bg-foreground/90 disabled:opacity-50 transition-colors"
        >
          Push_Comment.commit()
        </button>
      </div>

      {/* Comments List */}
      <div className="flex flex-col gap-8">
        {rootComments.length === 0 ? (
          <p className="text-center font-mono text-[10px] tracking-widest text-muted-foreground py-12 border border-dashed border-border">
            NULL_RECORDS // No data found
          </p>
        ) : (
          rootComments.map((comment) => (
            <div key={comment.id} className="flex flex-col gap-6 border-l border-border pl-10">
              <CommentItem 
                comment={comment} 
                onReply={() => setReplyTo(comment.id)} 
              />
              
              {/* Replies */}
              <div className="flex flex-col gap-6 border-l border-primary/20 pl-10 ml-2">
                {replies
                  .filter((r) => r.parent_id === comment.id)
                  .map((reply) => (
                    <CommentItem key={reply.id} comment={reply} isReply />
                  ))}
                
                {replyTo === comment.id && (
                  <div className="flex flex-col gap-4 mt-2">
                    <textarea
                      value={newComment}
                      onChange={(e) => setNewComment(e.target.value)}
                      className="px-4 py-3 bg-background border border-border focus:outline-none focus:ring-1 focus:ring-primary/30 min-h-[100px] transition-all font-mono text-xs"
                      placeholder="Write a reply..."
                    />
                    <div className="flex justify-end gap-3">
                      <button
                        onClick={() => setReplyTo(null)}
                        className="px-4 py-2 text-[10px] font-mono uppercase tracking-widest hover:text-primary transition-colors"
                      >
                        Abort.cmd
                      </button>
                      <button
                        onClick={() => handleSubmit(comment.id)}
                        disabled={isSubmitting || !authorName.trim() || !newComment.trim()}
                        className="px-6 py-3 bg-foreground text-background text-[10px] font-mono uppercase tracking-widest hover:bg-foreground/90 disabled:opacity-50 transition-colors"
                      >
                        Push_Reply.commit()
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

function CommentItem({ comment, onReply, isReply = false }: { comment: Comment; onReply?: () => void; isReply?: boolean }) {
  return (
    <div className="flex flex-col gap-4 group">
      <div className="flex items-center gap-4">
        <div className="h-10 w-10 border border-border bg-accent/50 flex items-center justify-center">
          <User className="h-5 w-5 text-muted-foreground" />
        </div>
        <div className="flex flex-col">
          <span className="text-[10px] font-mono font-black uppercase tracking-widest">{comment.author_name}</span>
          <span className="text-[9px] font-mono text-muted-foreground uppercase">
            {new Date(comment.created_at).toLocaleDateString()} // SEQ_ID:{comment.id.slice(0, 8)}
          </span>
        </div>
      </div>
      <p className="text-sm font-medium text-foreground leading-relaxed pl-1">
        {comment.content}
      </p>
      {!isReply && onReply && (
        <button
          onClick={onReply}
          className="text-[9px] font-mono font-black text-primary hover:tracking-[0.2em] transition-all flex items-center gap-2 w-fit uppercase"
        >
          <Reply className="h-3 w-3" /> Reply_To.ptr
        </button>
      )}
    </div>
  );
}
