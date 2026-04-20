import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { CaseStudy, CaseStudySchema, BlogPost, BlogPostSchema } from '@/schemas/portfolio';

const CASE_STUDIES_PATH = path.join(process.cwd(), 'content/case-studies');
const BLOG_PATH = path.join(process.cwd(), 'content/blog');

export function getCaseStudySlugs() {
  return fs.readdirSync(CASE_STUDIES_PATH).filter((path) => /\.mdx?$/.test(path));
}

export async function getCaseStudyBySlug(slug: string) {
  const realSlug = slug.replace(/\.mdx?$/, '');
  const filePath = path.join(CASE_STUDIES_PATH, `${realSlug}.mdx`);
  const fileContent = fs.readFileSync(filePath, 'utf8');
  
  const { data, content } = matter(fileContent);
  const validatedData = CaseStudySchema.parse(data);

  return {
    meta: validatedData,
    content,
    slug: realSlug,
  };
}

export async function getAllCaseStudies(): Promise<(CaseStudy & { slug: string })[]> {
  const slugs = getCaseStudySlugs();
  const studies = await Promise.all(
    slugs.map(async (slug) => {
      const { meta, slug: realSlug } = await getCaseStudyBySlug(slug);
      return { ...meta, slug: realSlug };
    })
  );

  return studies.sort((a, b) => (new Date(b.date).getTime() - new Date(a.date).getTime()));
}

export function getBlogPostSlugs() {
  if (!fs.existsSync(BLOG_PATH)) {
    fs.mkdirSync(BLOG_PATH, { recursive: true });
  }
  return fs.readdirSync(BLOG_PATH).filter((path) => /\.mdx?$/.test(path));
}

export async function getBlogPostBySlug(slug: string) {
  const realSlug = slug.replace(/\.mdx?$/, '');
  const filePath = path.join(BLOG_PATH, `${realSlug}.mdx`);
  const fileContent = fs.readFileSync(filePath, 'utf8');
  
  const { data, content } = matter(fileContent);
  const validatedData = BlogPostSchema.parse(data);

  return {
    meta: validatedData,
    content,
    slug: realSlug,
  };
}

export async function getAllBlogPosts(): Promise<(BlogPost & { slug: string })[]> {
  const slugs = getBlogPostSlugs();
  const posts = await Promise.all(
    slugs.map(async (slug) => {
      const { meta, slug: realSlug } = await getBlogPostBySlug(slug);
      return { ...meta, slug: realSlug };
    })
  );

  return posts.sort((a, b) => (new Date(b.date).getTime() - new Date(a.date).getTime()));
}
