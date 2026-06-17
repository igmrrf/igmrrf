import TechStackViewer from "@/components/TechStackViewer";
import { parseTechStack } from "@/lib/parseTechStack";

export const metadata = {
  title: "Tech Stack Graph",
  description: "Interactive visualization of the Master Tech Stack",
};

export default function StackPage() {
  const data = parseTechStack();

  return (
    <div className="flex flex-col w-full h-screen overflow-hidden">
      <div className="flex-grow w-full relative">
        <TechStackViewer data={data} />
      </div>
    </div>
  );
}
