import { processingWords } from "@/config/constant";
import { useEffect, useState } from "react";
export default function ProcessingStatus() {
    const [message, setMessage] = useState(processingWords[0]);

    useEffect(() => {
        const interval = setInterval(() => {
            const randomIndex = Math.floor(
                Math.random() * processingWords.length
            );

            setMessage(processingWords[randomIndex]);
        }, 2000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div>
            {message}...
        </div>
    );
}