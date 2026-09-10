import Link from "next/link";

export default function NotFound() {
  return <section className="max-w-2xl mx-auto py-20 space-y-6"><p className="font-mono text-primary">404 · path not found</p><h1 className="text-4xl">This page took a different route.</h1><p className="text-muted-foreground">The link may be outdated, or the page may have moved. There’s still plenty to explore.</p><div className="flex gap-4 flex-wrap"><Link href="/" className="bg-primary text-primary-foreground px-5 py-3">Back home</Link><Link href="/blog" className="border border-border px-5 py-3">Read the blog</Link></div></section>;
}
