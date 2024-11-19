"use client";
import { ws_handler } from "../websocket/websocket";
import Sidebar from "../components/layouts/Sidebar";
import { useMessageStore } from "../store/store";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  ws_handler();
  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1">{children}</div>
    </div>
  );
}
