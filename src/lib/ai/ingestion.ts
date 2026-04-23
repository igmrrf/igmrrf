import { getAllCaseStudies, getAllBlogPosts } from "@/lib/mdx";

export interface DocumentChunk {
  id: string;
  text: string;
  metadata: {
    source: string;
    title: string;
    type: 'case-study' | 'blog' | 'code' | 'about';
  };
}

export async function prepareChunksFromCaseStudies(): Promise<DocumentChunk[]> {
  const studies = await getAllCaseStudies();
  const chunks: DocumentChunk[] = [];

  for (const study of studies) {
    const text = `# ${study.title}\n\nSummary: ${study.summary}\n\nBusiness Value: ${study.businessValue}\n\nTechnical Trade-offs: ${study.technicalTradeOffs}\n\nDate: ${study.date}\n\nTech Stack: ${study.techStack.join(', ')}`;
    
    chunks.push({
      id: `cs-${study.slug}`,
      text: text,
      metadata: {
        source: study.slug,
        title: study.title,
        type: 'case-study'
      }
    });
  }

  return chunks;
}

export async function prepareChunksFromBlog(): Promise<DocumentChunk[]> {
  const posts = await getAllBlogPosts();
  const chunks: DocumentChunk[] = [];

  for (const post of posts) {
    const text = `# ${post.title}\n\nSummary: ${post.summary}\n\nDate: ${post.date}\n\nTags: ${post.tags.join(', ')}`;
    
    chunks.push({
      id: `blog-${post.slug}`,
      text: text,
      metadata: {
        source: post.slug,
        title: post.title,
        type: 'blog'
      }
    });
  }

  return chunks;
}
