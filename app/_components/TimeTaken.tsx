'use client'
import { useEffect, useState } from "react";
import { useResponseStore } from "@/store/responseStore";

// Measured against the clock rather than counted up, so a late or dropped tick
// cannot make the number drift behind real time.
const secondsSince = (from: number): number => Math.floor((Date.now() - from) / 1000);

interface TimeTakenProps {
    // Times something that is not a generation run — the startup health check.
    // Omitted, the counter follows the response store as before.
    since?: number;
}

export default function TimeTaken({ since }: TimeTakenProps) {
    // Selector form: this subscribes to timeTaken alone, so appended stream
    // chunks no longer re-render the counter.
    const timeTaken = useResponseStore((s) => s.timeTaken);
    // Kept local: a health-check wait is not a response time, so it has no
    // business overwriting the store.
    const [elapsed, setElapsed] = useState(0);

    useEffect(() => {
        const tick = () => {
            if (since !== undefined) {
                setElapsed(secondsSince(since));
                return;
            }

            const { startedAt, setTimeTaken } = useResponseStore.getState();
            if (startedAt === null) return;

            setTimeTaken(secondsSince(startedAt));
        };

        tick();
        const interval = setInterval(tick, 500);

        return () => clearInterval(interval);
    }, [since]);

    return <span className="tabular-nums">{since === undefined ? timeTaken : elapsed}s</span>;
}
