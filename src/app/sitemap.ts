import { MetadataRoute } from 'next';
import { getCaseStudySlugs, getBlogPostSlugs } from '@/lib/mdx';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://igmrrf.dev';

  // Core routes
  const routes = ['', '/blog', '/case-studies', '/projects', '/about', '/chat'].map(
    (route) => ({
      url: `${baseUrl}${route}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 1.0,
    })
  );

  // MDX Case Studies
  const caseStudies = getCaseStudySlugs().map((slug) => ({
    url: `${baseUrl}/case-studies/${slug.replace(/\.mdx?$/, '')}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));

  // MDX Blog Posts
  const blogPosts = getBlogPostSlugs().map((slug) => ({
    url: `${baseUrl}/blog/${slug.replace(/\.mdx?$/, '')}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  return [...routes, ...caseStudies, ...blogPosts];
}
