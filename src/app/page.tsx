"use client";

import { useCookies } from "next-client-cookies";
import { redirect } from "next/navigation";

export default function Home() {
  const cookies = useCookies()
  if (cookies.get("token") == undefined) {
    redirect("/login")
  }
  else {
    redirect("/home")
  }
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        Hello World
      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
      </footer>
    </div>
  );
}
