import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Experience | System Architecture & Track Record",
  description:
    "7+ years architecting scalable Fintech, Web3, and distributed systems for 500k+ users. Work history across OneRemit, Lingawa, NPC Labs, and VeendHQ.",
  openGraph: {
    title: "Experience & Track Record | Francis Igbiriki",
    description:
      "7+ years architecting scalable Fintech, Web3, and distributed systems for 500k+ users.",
  },
};

export default function ExperienceLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
