import fs from 'fs';
import path from 'path';

export interface GraphData {
  nodes: { id: string; name: string; group: number; val: number; category?: string }[];
  links: { source: string; target: string }[];
}

export interface HierarchicalData {
  name: string;
  value?: number;
  category?: string;
  children?: HierarchicalData[];
}

export interface ParsedTechStack {
  graph: GraphData;
  hierarchy: HierarchicalData;
}

export function parseTechStack(): ParsedTechStack {
  const filePath = path.join(process.cwd(), 'src/index.md');
  let fileContent = '';
  
  try {
    fileContent = fs.readFileSync(filePath, 'utf8');
  } catch (err) {
    console.error("Could not read index.md", err);
    return { graph: { nodes: [], links: [] }, hierarchy: { name: 'Root' } };
  }

  const lines = fileContent.split('\n');
  const nodes: GraphData['nodes'] = [];
  const links: GraphData['links'] = [];
  const nodeMap = new Set<string>();
  
  const hierarchy: HierarchicalData = {
    name: 'Master Tech Stack',
    children: []
  };

  // Add a root node
  nodes.push({ id: 'root', name: 'Master Tech Stack', group: 0, val: 20 });
  nodeMap.add('root');

  let currentCategory = '';
  let groupCounter = 1;
  let currentCategoryNode: HierarchicalData | null = null;

  for (const line of lines) {
    if (line.startsWith('## ')) {
      currentCategory = line.replace('## ', '').trim();
      
      currentCategoryNode = {
        name: currentCategory,
        children: []
      };
      hierarchy.children!.push(currentCategoryNode);

      if (!nodeMap.has(currentCategory)) {
        nodes.push({
          id: currentCategory,
          name: currentCategory,
          group: groupCounter,
          val: 10,
        });
        nodeMap.add(currentCategory);
        links.push({
          source: 'root',
          target: currentCategory,
        });
        groupCounter++;
      }
    } else if (line.startsWith('- ') && currentCategory && currentCategoryNode) {
      let item = line.replace('- ', '').trim();
      // Clean up the item
      item = item.replace(/\*\*/g, '');
      
      currentCategoryNode.children!.push({
        name: item,
        value: 1, // Base value for size calculations
        category: currentCategory
      });

      const itemId = `${currentCategory}-${item}`;
      if (!nodeMap.has(itemId)) {
        nodes.push({
          id: itemId,
          name: item,
          group: groupCounter - 1,
          val: 5,
          category: currentCategory
        });
        nodeMap.add(itemId);
        links.push({
          source: currentCategory,
          target: itemId,
        });
      }
    }
  }

  return { graph: { nodes, links }, hierarchy };
}
