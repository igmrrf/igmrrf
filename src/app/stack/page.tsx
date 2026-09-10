import TechStackViewer from "@/components/TechStackViewer";
import { parseTechStack } from "@/lib/parseTechStack";

export const metadata = {
  title: "Tech Stack Graph",
  description: "Interactive visualization of the Master Tech Stack",
};

export default function StackPage() {
  const data = parseTechStack();

  return (
    <div className="w-full flex flex-col gap-6">
      <div><p className="font-mono text-xs text-primary mb-3">~/stack</p><h1 className="text-4xl mb-3">The toolkit</h1><p className="text-muted-foreground">Search the list, explore connections, or step into the 3D view.</p></div>
      <div className="w-full relative">
        <TechStackViewer data={data} />
      </div>
    </div>
  );
}
