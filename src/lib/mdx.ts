import fs from "fs";
import path from "path";
import matter from "gray-matter";
import {
  CaseStudy,
  CaseStudySchema,
  BlogPost,
  BlogPostSchema,
  Talk,
  TalkSchema,
} from "@/schemas/portfolio";
import { estimateReadingTime } from "./readingTime";

const CASE_STUDIES_PATH = path.join(process.cwd(), "content/case-studies");
const BLOG_PATH = path.join(process.cwd(), "content/blog");
const TALKS_PATH = path.join(process.cwd(), "content/talks");

export function getCaseStudySlugs() {
  if (!fs.existsSync(CASE_STUDIES_PATH)) {
    fs.mkdirSync(CASE_STUDIES_PATH, { recursive: true });
  }
  return fs
    .readdirSync(CASE_STUDIES_PATH)
    .filter((path) => /\.mdx?$/.test(path));
}

export async function getCaseStudyBySlug(slug: string) {
  const realSlug = slug.replace(/\.mdx?$/, "");
  const filePath = path.join(CASE_STUDIES_PATH, `${realSlug}.mdx`);
  const fileContent = fs.readFileSync(filePath, "utf8");

  const { data, content } = matter(fileContent);
  const validatedData = CaseStudySchema.parse(data);
  const readingTime = estimateReadingTime(content);

  return {
    meta: validatedData,
    content,
    slug: realSlug,
    readingTime: readingTime.text,
  };
}

export async function getAllCaseStudies(): Promise<
  (CaseStudy & { slug: string; readingTime: string })[]
> {
  const slugs = getCaseStudySlugs();
  const studies = await Promise.all(
    slugs.map(async (slug) => {
      const { meta, slug: realSlug, readingTime } = await getCaseStudyBySlug(slug);
      return { ...meta, slug: realSlug, readingTime };
    }),
  );

  return studies.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  );
}

export function getBlogPostSlugs() {
  if (!fs.existsSync(BLOG_PATH)) {
    fs.mkdirSync(BLOG_PATH, { recursive: true });
  }
  return fs.readdirSync(BLOG_PATH).filter((path) => /\.mdx?$/.test(path));
}

export async function getBlogPostBySlug(slug: string) {
  const realSlug = slug.replace(/\.mdx?$/, "");
  const filePath = path.join(BLOG_PATH, `${realSlug}.mdx`);
  const fileContent = fs.readFileSync(filePath, "utf8");

  const { data, content } = matter(fileContent);
  const validatedData = BlogPostSchema.parse(data);
  const readingTime = estimateReadingTime(content);

  return {
    meta: validatedData,
    content,
    slug: realSlug,
    readingTime: readingTime.text,
  };
}

export async function getAllBlogPosts(): Promise<
  (BlogPost & { slug: string; readingTime: string })[]
> {
  const slugs = getBlogPostSlugs();
  const posts = await Promise.all(
    slugs.map(async (slug) => {
      const { meta, slug: realSlug, readingTime } = await getBlogPostBySlug(slug);
      return { ...meta, slug: realSlug, readingTime };
    }),
  );

  return posts.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  );
}

export function getTalkSlugs() {
  if (!fs.existsSync(TALKS_PATH)) {
    fs.mkdirSync(TALKS_PATH, { recursive: true });
  }
  return fs.readdirSync(TALKS_PATH).filter((path) => /\.mdx?$/.test(path));
}

export async function getTalkBySlug(slug: string) {
  const realSlug = slug.replace(/\.mdx?$/, "");
  const filePath = path.join(TALKS_PATH, `${realSlug}.mdx`);
  const fileContent = fs.readFileSync(filePath, "utf8");

  const { data, content } = matter(fileContent);
  const validatedData = TalkSchema.parse(data);
  const readingTime = estimateReadingTime(content);

  return {
    meta: validatedData,
    content,
    slug: realSlug,
    readingTime: readingTime.text,
  };
}

export async function getAllTalks(): Promise<
  (Talk & { slug: string; readingTime: string })[]
> {
  const slugs = getTalkSlugs();
  const talks = await Promise.all(
    slugs.map(async (slug) => {
      const { meta, slug: realSlug, readingTime } = await getTalkBySlug(slug);
      return { ...meta, slug: realSlug, readingTime };
    }),
  );

  return talks.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  );
}
