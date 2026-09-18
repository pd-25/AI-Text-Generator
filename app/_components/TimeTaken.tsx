'use client'
import { useEffect } from "react";
import { useResponseStore } from "@/store/responseStore";

export default function TimeTaken() {
    // Selector form: this subscribes to timeTaken alone, so appended stream
    // chunks no longer re-render the counter.
    const timeTaken = useResponseStore((s) => s.timeTaken);

    useEffect(() => {
        const tick = () => {
            const { startedAt, setTimeTaken } = useResponseStore.getState();
            if (startedAt === null) return;

            // Measured against the clock rather than counted up, so a late or
            // dropped tick cannot make the number drift behind real time.
            setTimeTaken(Math.floor((Date.now() - startedAt) / 1000));
        };

        tick();
        const interval = setInterval(tick, 500);

        return () => clearInterval(interval);
    }, []);

    return <span className="tabular-nums">{timeTaken}s</span>;
}
