import PromtBar from "./_components/PromtBar";

export default function Home() {
  return (
    <>
      {/* Main Content Area */}
      <div className="relative z-10 mx-auto flex w-full max-w-4xl flex-1 flex-col items-center justify-center px-4 py-12">
        {/* Architecture & Tech Stack Info Card */}
        <section className="mb-10 w-full rounded-2xl border border-zinc-800/80 bg-zinc-900/60 p-5 shadow-2xl backdrop-blur-md">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="space-y-1">
              <div className="inline-flex items-center gap-2 rounded-md bg-indigo-500/10 px-2.5 py-1 text-xs font-medium text-indigo-400 ring-1 ring-inset ring-indigo-500/20">
                <span className="h-1.5 w-1.5 rounded-full bg-indigo-400"></span>
                Engineered by Pradipta
              </div>
              <h2 className="text-sm font-medium text-zinc-200">
                Fullstack LLM Pipeline: Next.js Frontend + FastAPI OpenRouter Backend
              </h2>
            </div>

            {/* Architecture Pills */}
            <div className="flex flex-wrap items-center gap-2">
              <div className="flex items-center gap-1.5 rounded-lg border border-zinc-800 bg-zinc-950/70 px-3 py-1.5 text-xs text-zinc-300">
                <span className="font-semibold text-white">Frontend:</span>
                <span>Next.js + Tailwind</span>
              </div>
              <div className="flex items-center gap-1.5 rounded-lg border border-zinc-800 bg-zinc-950/70 px-3 py-1.5 text-xs text-zinc-300">
                <span className="font-semibold text-white">Backend:</span>
                <span>FastAPI</span>
              </div>
              <div className="flex items-center gap-1.5 rounded-lg border border-emerald-900/40 bg-emerald-950/30 px-3 py-1.5 text-xs text-emerald-300">
                <span className="font-semibold text-emerald-200">Model:</span>
                <code className="font-mono text-[11px]">nvidia/nemotron-3.5-lightning</code>
              </div>
            </div>
          </div>
        </section>

        {/* Hero Title with Big Branding */}
        <div className="mb-8 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-zinc-800 bg-zinc-900/80 px-3.5 py-1 text-xs font-medium text-zinc-400 shadow-inner mb-4">
            <span className="text-indigo-400">⚡</span>
            <span>LLM Integration Project</span>
            <span className="text-zinc-600">•</span>
            <span className="text-zinc-300 font-semibold">by Pradipta</span>
          </div>

          <h2 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
            Text Generation{" "}
            <span className="bg-gradient-to-r from-indigo-400 via-purple-300 to-emerald-400 bg-clip-text text-transparent">
              by Pradipta
            </span>
          </h2>
          <p className="mt-3 text-sm sm:text-base text-zinc-400 max-w-xl mx-auto">
            Supercharged with NVIDIA Nemotron 3.5 Lightning via FastAPI & OpenRouter. Compose emails or generate high-impact blog posts instantly.
          </p>
        </div>

      <PromtBar />
      </div>
    </>
  );
}

