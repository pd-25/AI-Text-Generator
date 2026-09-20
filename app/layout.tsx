import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import OnlineCount from "./_components/OnlineCount";
import HealthCheck from "./_components/HealthCheck";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Server-only env var, so it stays out of the client bundle
const brandName = process.env.BRAND_NAME?.trim() || "Text Generation";

export const metadata: Metadata = {
  title: `${brandName} by Pradipta`,
  description: "Generate blog articles, compose mails. ",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-white text-zinc-900">
        <div className="flex min-h-screen flex-col">
          <header className="border-b border-zinc-200">
            <div className="mx-auto flex max-w-3xl items-center justify-between px-6 py-4">
              <div className="flex items-center gap-2.5">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-zinc-900">
                  <span className="font-mono text-xs font-semibold text-white">
                    PL
                  </span>
                </div>
                <span className="text-sm font-medium text-zinc-900">
                  {brandName}
                </span>
              </div>

              <div className="flex items-center gap-2 text-xs text-zinc-500">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                <OnlineCount />
              </div>
            </div>
          </header>
          {/* Gates the page until the API answers /health */}
          <HealthCheck>{children}</HealthCheck>

          <footer className="border-t border-zinc-200 py-5 text-center text-xs text-zinc-400">
            Engineered by Pradipta S Bhuin
          </footer>
        </div>
      </body>
    </html>
  );
}
