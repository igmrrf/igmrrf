import { MetadataRoute } from 'next';
import { getCaseStudySlugs, getBlogPostSlugs } from '@/lib/mdx';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://theldo.com';

  // Core routes
  const routes = ['', '/case-studies', '/experience', '/blog', '/about', '/chat', '/stack'].map(
    (route) => ({
      url: `${baseUrl}${route}`,
      lastModified: new Date(),
      changeFrequency: (route === '' || route === '/blog' ? 'weekly' : 'monthly') as 'weekly' | 'monthly',
      priority: route === '' ? 1.0 : 0.8,
    })
  );

  // MDX Case Studies
  const caseStudyRoutes = getCaseStudySlugs().map((slug) => ({
    url: `${baseUrl}/case-studies/${slug.replace(/\.mdx?$/, '')}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.85,
  }));

  // MDX Blog Posts
  const blogPosts = getBlogPostSlugs().map((slug) => ({
    url: `${baseUrl}/blog/${slug.replace(/\.mdx?$/, '')}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.75,
  }));

  return [...routes, ...caseStudyRoutes, ...blogPosts];
}
