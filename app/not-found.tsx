import Link from "next/link";
import { ArrowLeft, Compass } from "lucide-react";

export default function NotFound() {
  return (
    <main className="grid min-h-screen place-items-center px-6 py-24">
      <div className="max-w-lg text-center">
        <p className="eyebrow">404 — Lost in the warehouse</p>
        <p className="mt-6 text-8xl font-bold tracking-tight text-zinc-900 dark:text-white">404</p>
        <h1 className="mt-4 text-2xl font-semibold text-zinc-900 dark:text-white">This route isn&apos;t on the dispatch board.</h1>
        <p className="mt-3 text-zinc-600 dark:text-zinc-400">
          The page you&apos;re looking for doesn&apos;t exist, or it moved. Head back home and pick a route that does.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link href="/" className="btn-primary"><ArrowLeft className="h-4 w-4" /> Back home</Link>
          <Link href="/#projects" className="btn-ghost"><Compass className="h-4 w-4" /> Explore my work</Link>
        </div>
      </div>
    </main>
  );
}
