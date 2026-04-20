import { z } from 'zod';

export const CaseStudySchema = z.object({
  title: z.string().min(1),
  summary: z.string().min(1),
  techStack: z.array(z.string()),
  businessValue: z.string().min(1),
  technicalTradeOffs: z.string().min(1),
  githubUrl: z.string().url(),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Format must be YYYY-MM-DD"),
  featured: z.boolean().default(false),
});

export type CaseStudy = z.infer<typeof CaseStudySchema>;

export const ProjectSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
  url: z.string().url().optional(),
  githubUrl: z.string().url(),
  techStack: z.array(z.string()),
});

export type Project = z.infer<typeof ProjectSchema>;

export const BlogPostSchema = z.object({
  title: z.string().min(1),
  summary: z.string().min(1),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Format must be YYYY-MM-DD"),
  tags: z.array(z.string()).default([]),
  featured: z.boolean().default(false),
});

export type BlogPost = z.infer<typeof BlogPostSchema>;
