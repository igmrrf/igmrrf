import { z } from "zod";

export const CaseStudySchema = z.object({
  title: z.string().min(1),
  summary: z.string().min(1),
  techStack: z.array(z.string()),
  businessValue: z.string().min(1),
  technicalTradeOffs: z.string().min(1),
  githubUrl: z.url(),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Format must be YYYY-MM-DD"),
  featured: z.boolean().default(false),
});

export type CaseStudy = z.infer<typeof CaseStudySchema>;

export const BlogPostSchema = z.object({
  title: z.string().min(1),
  summary: z.string().min(1),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Format must be YYYY-MM-DD"),
  tags: z.array(z.string()).default([]),
  featured: z.boolean().default(false),
});

export type BlogPost = z.infer<typeof BlogPostSchema>;

export const TalkSchema = z.object({
  title: z.string().min(1),
  summary: z.string().min(1),
  event: z.string().min(1),
  location: z.string().optional(),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Format must be YYYY-MM-DD"),
  durationMinutes: z.number().int().positive().optional(),
  tags: z.array(z.string()).default([]),
  /**
   * Slug of the compiled Slidev deck under public/decks/<deckSlug>/.
   * Omit for a talk with no published deck (yet).
   */
  deckSlug: z.string().optional(),
  /** Offline PDF export, served from public/decks/<deckSlug>.pdf */
  pdf: z.string().optional(),
  repoUrl: z.url().optional(),
  videoUrl: z.url().optional(),
  featured: z.boolean().default(false),
});

export type Talk = z.infer<typeof TalkSchema>;
