'use client'
import { useEffect, useState } from "react";

interface OnlineMessage {
  count: number;
}

// Render (and any HTTPS host) 301-redirects plain ws:// to wss://, and the
// WebSocket API refuses to follow redirects — so the scheme has to match the API.
const socketUrl = `${(process.env.NEXT_PUBLIC_BASE_API ?? "")
  .trim()
  .replace(/\/+$/, "")
  .replace(/^http/, "ws")}/ws/online`;

export default function OnlineCount() {
  const [count, setCount] = useState<number>(0);

  useEffect(() => {
    let ws: WebSocket | null = null;
    let retry: ReturnType<typeof setTimeout> | null = null;
    let attempts = 0;
    let cancelled = false;

    const connect = (): void => {
      ws = new WebSocket(socketUrl);

      ws.onopen = () => {
        attempts = 0;
      };

      ws.onmessage = (event: MessageEvent<string>) => {
        try {
          const data: OnlineMessage = JSON.parse(event.data);

          if (typeof data.count === "number") {
            setCount(data.count);
          }
        } catch (error) {
          console.error("Invalid WebSocket message:", error);
        }
      };

      ws.onclose = () => {
        if (cancelled) return;

        // Free instances sleep and cold-start slowly; back off instead of
        // retrying every 2s forever
        const delay = Math.min(30_000, 1_000 * 2 ** attempts);
        attempts += 1;
        retry = setTimeout(connect, delay);
      };
    };

    connect();

    return () => {
      cancelled = true;

      if (retry) {
        clearTimeout(retry);
      }

      if (ws) {
        ws.onclose = null;
        ws.close();
      }
    };
  }, []);

  return <span>{count} online</span>;
}
