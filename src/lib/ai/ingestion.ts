import { getAllCaseStudies } from "@/lib/mdx";

export interface DocumentChunk {
  id: string;
  text: string;
  metadata: {
    source: string;
    title: string;
    type: 'case-study' | 'code' | 'about';
  };
}

export async function prepareChunksFromCaseStudies(): Promise<DocumentChunk[]> {
  const studies = await getAllCaseStudies();
  const chunks: DocumentChunk[] = [];

  for (const study of studies) {
    // Simple chunking strategy: split by sections or fixed length
    // For this prototype, we'll chunk by approximately 1000 characters
    const text = `# ${study.title}\n\nSummary: ${study.summary}\n\nBusiness Value: ${study.businessValue}\n\nTechnical Trade-offs: ${study.technicalTradeOffs}\n\nDate: ${study.date}\n\nTech Stack: ${study.techStack.join(', ')}`;
    
    // In a real RAG, we'd add more granular chunks from the content itself
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
