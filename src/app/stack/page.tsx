import TechStackViewer from "@/components/TechStackViewer";
import { parseTechStack } from "@/lib/parseTechStack";

export const metadata = {
  title: "Tech Stack Graph",
  description: "Interactive visualization of the Master Tech Stack",
};

export default function StackPage() {
  const data = parseTechStack();

  return (
    <div className="w-screen relative left-1/2 -translate-x-1/2 flex flex-col h-[75vh] md:h-[80vh] overflow-hidden -top-10">
      <div className="grow w-full relative">
        <TechStackViewer data={data} />
      </div>
    </div>
  );
}
