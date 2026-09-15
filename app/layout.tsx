import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import OnlineCount from "./_components/OnlineCount";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Text Generation by Pradipt",
  description: "Generate blog articles, compose mails. ",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <main className="relative min-h-screen bg-zinc-950 text-zinc-100 flex flex-col justify-between overflow-x-hidden selection:bg-indigo-500/30 selection:text-indigo-200">
          {/* Background ambient lighting */}
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center overflow-hidden">
            <div className="h-[500px] w-[750px] -translate-y-24 rounded-full bg-gradient-to-tr from-indigo-600/20 via-purple-600/15 to-emerald-500/10 blur-[130px]" />
          </div>

          {/* Top Navigation / Status Header */}
          <header className="relative z-10 border-b border-zinc-800/80 bg-zinc-950/60 backdrop-blur-xl">
            <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
              <div className="flex items-center gap-3">
                {/* Logo Monogram */}
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 via-purple-600 to-pink-500 shadow-lg shadow-indigo-500/30 ring-1 ring-white/20">
                  <span className="font-mono text-base font-black tracking-tighter text-white">
                    iP
                  </span>
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h1 className="text-lg font-bold tracking-tight text-white">
                      Pradipta
                    </h1>
                    <span className="rounded-md bg-indigo-500/10 px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-indigo-400 ring-1 ring-inset ring-indigo-500/20">
                      AI Lab
                    </span>
                  </div>
                  <p className="text-xs text-zinc-400">
                    LLM API Integration Engine
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="hidden items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-950/40 px-3 py-1 text-xs font-medium text-emerald-400 sm:flex">
                <OnlineCount />
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500"></span>
                  </span>
                  
                  <span>OpenRouter Connected</span>
                </div>
              </div>
            </div>
          </header>

      
           {children}

          {/* Footer */}
          <footer className="relative z-10 border-t border-zinc-900 py-6 text-center text-xs text-zinc-500">
            <p>
              Engineered by <span className="font-semibold text-zinc-300">Pradipta</span> • Next.js & Tailwind CSS • FastAPI Backend with OpenRouter API
            </p>
          </footer>
        </main>
       
      </body>
    </html>
  );
}
