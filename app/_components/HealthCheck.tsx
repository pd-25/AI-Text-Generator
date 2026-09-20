'use client'

import { healthCheckMessages } from "@/config/constant";
import { useEffect, useState, type ReactNode } from "react";
import TimeTaken from "./TimeTaken";

// Keep probing instead of giving up after one call: the API sleeps between
// visits and a cold start can outlast a single request.
const POLL_INTERVAL_MS = 2_000;
const REQUEST_TIMEOUT_MS = 10_000;
const MESSAGE_INTERVAL_MS = 5_000;

const healthUrl = `${(process.env.NEXT_PUBLIC_BASE_API ?? "")
  .trim()
  .replace(/\/+$/, "")}/health`;

interface HealthResponse {
  succes?: boolean;
}

export default function HealthCheck({ children }: { children: ReactNode }) {
  const [ready, setReady] = useState<boolean>(false);
  const [step, setStep] = useState<number>(0);
  // Pinned at mount so the counter measures the whole wait, not the current
  // retry. Never rendered directly, so the server/client values cannot clash.
  const [startedAt] = useState<number>(() => Date.now());

  useEffect(() => {
    let cancelled = false;
    let retry: ReturnType<typeof setTimeout> | null = null;

    const probe = async (): Promise<void> => {
      try {
        const res = await fetch(healthUrl, {
          cache: "no-store",
          signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS),
        });

        if (!res.ok) {
          throw new Error(`Request failed: ${res.status}`);
        }

        const data: HealthResponse = await res.json();

        if (data.succes !== true) {
          throw new Error("Health check reported a failure");
        }

        if (!cancelled) {
          setReady(true);
        }
      } catch (error) {
        if (cancelled) return;

        console.error("Health check failed:", error);
        retry = setTimeout(probe, POLL_INTERVAL_MS);
      }
    };

    setTimeout(()=> {
        probe();
    }, 15000)

    return () => {
      cancelled = true;

      if (retry) {
        clearTimeout(retry);
      }
    };
  }, []);

  const lastStep = healthCheckMessages.length - 1;

  useEffect(() => {
    // Hold on the final message — cycling back to "Connecting to server" would
    // read as if the wait had started over.
    if (ready || step === lastStep) return;

    const timer = setTimeout(() => {
      setStep((current) => current + 1);
    }, MESSAGE_INTERVAL_MS);

    return () => clearTimeout(timer);
  }, [ready, step, lastStep]);

  if (ready) {
    return <>{children}</>;
  }

  const message = healthCheckMessages[step];

  return (
    <div
      className="mx-auto flex w-full max-w-3xl flex-1 flex-col justify-center gap-4 px-6 py-24"
      role="status"
      aria-live="polite"
    >
      <div className="flex items-center gap-2.5">
        {/* Pulsing beacon */}
        <span className="relative flex h-2 w-2 shrink-0">
          <span className="motion-safe-only absolute inline-flex h-full w-full animate-ping rounded-full bg-zinc-400 opacity-70" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-zinc-500" />
        </span>

        {/* key remounts the span so every message replays the entrance */}
        <span
          key={message}
          className="shimmer-text motion-safe-only animate-shimmer text-sm font-medium"
        >
          <span className="motion-safe-only inline-block animate-word-in">
            {message}
          </span>
        </span>

        <span className="flex items-center gap-[3px] pb-0.5">
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              className="motion-safe-only h-1 w-1 animate-dot rounded-full bg-zinc-400"
              style={{ animationDelay: `${i * 0.16}s` }}
            />
          ))}
        </span>
        <span className="ml-auto text-xs text-zinc-400">
          <TimeTaken since={startedAt} />
        </span>
      </div>

      {/* Indeterminate bar — the wait has no percentage to report */}
      <div className="h-0.5 w-full overflow-hidden rounded-full bg-zinc-200">
        <div className="motion-safe-only h-full w-1/4 animate-track rounded-full bg-zinc-400" />
      </div>
    </div>
  );
}
