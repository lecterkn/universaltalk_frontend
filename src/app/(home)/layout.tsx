"use client";
import { ws_handler } from "../api/ws";
import Sidebar from "../components/layouts/Sidebar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // WebSocketへの接続
  ws_handler();
  return (
          <div className="flex h-screen">
            <Sidebar />
            <div className="flex-1">{children}</div>
          </div>
  );
}
