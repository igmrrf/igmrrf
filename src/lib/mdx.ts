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

function readContent(directory: string, slug: string) {
  const realSlug = slug.replace(/\.mdx?$/, "");
  if (!/^[a-zA-Z0-9][a-zA-Z0-9_-]*$/.test(realSlug)) throw new Error("Invalid content slug");
  const filename = [`${realSlug}.mdx`, `${realSlug}.md`].find((name) => fs.existsSync(path.join(directory, name)));
  if (!filename) throw new Error("Content not found");
  return { realSlug, fileContent: fs.readFileSync(path.join(directory, filename), "utf8") };
}

export function getCaseStudySlugs() {
  if (!fs.existsSync(CASE_STUDIES_PATH)) {
    return [];
  }
  return fs
    .readdirSync(CASE_STUDIES_PATH)
    .filter((path) => /\.mdx?$/.test(path));
}

export async function getCaseStudyBySlug(slug: string) {
  const { realSlug, fileContent } = readContent(CASE_STUDIES_PATH, slug);

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
    return [];
  }
  return fs.readdirSync(BLOG_PATH).filter((path) => /\.mdx?$/.test(path));
}

export async function getBlogPostBySlug(slug: string) {
  const { realSlug, fileContent } = readContent(BLOG_PATH, slug);

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
    return [];
  }
  return fs.readdirSync(TALKS_PATH).filter((path) => /\.mdx?$/.test(path));
}

export async function getTalkBySlug(slug: string) {
  const { realSlug, fileContent } = readContent(TALKS_PATH, slug);

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
