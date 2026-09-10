"use client";

import Link from "next/link";

export default function ErrorPage({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return <section className="max-w-2xl mx-auto py-20 space-y-6"><p className="font-mono text-primary">Something went wrong</p><h1 className="text-4xl">Let’s try that again.</h1><p className="text-muted-foreground">This page couldn’t load. Try again, or return to the homepage.</p><div className="flex gap-4"><button onClick={reset} className="bg-primary text-primary-foreground px-5 py-3">Try again</button><Link href="/" className="border border-border px-5 py-3">Back home</Link></div></section>;
}
