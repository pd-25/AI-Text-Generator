// 'use client'
// import { useEffect, useState } from "react";

// interface OnlineMessage {
//   count: number;
// }

// export default function OnlineCount() {
//   const [count, setCount] = useState<number>(0);

//   useEffect(() => {
//     let ws: WebSocket | null = null;
//     let retry: ReturnType<typeof setTimeout> | null = null;

//     const connect = (): void => {
//       ws = new WebSocket("ws://localhost:8000/ws/online");

//       ws.onmessage = (event: MessageEvent<string>) => {
//         try {
//           const data: OnlineMessage = JSON.parse(event.data);

//           if (typeof data.count === "number") {
//             setCount(data.count);
//           }
//         } catch (error) {
//           console.error("Invalid WebSocket message:", error);
//         }
//       };

//       ws.onclose = () => {
//         retry = setTimeout(connect, 2000);
//       };

//       ws.onerror = (error: Event) => {
//         console.error("WebSocket error:", error);
//       };
//     };

//     connect();

//     return () => {
//       if (retry) {
//         clearTimeout(retry);
//       }

//       if (ws) {
//         ws.onclose = null;
//         ws.close();
//       }
//     };
//   }, []);

//   return <span>{count} online</span>;
// }