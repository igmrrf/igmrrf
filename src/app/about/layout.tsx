import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About | Francis Igbiriki — System Architect",
  description:
    "Engineering philosophy, cross-disciplinary background in Mechanical Engineering, MBA, and distributed systems architecture by Francis Igbiriki (igmrrf).",
  openGraph: {
    title: "About Francis Igbiriki | System Architect",
    description:
      "Engineering philosophy, cross-disciplinary background, and technical stack.",
  },
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
