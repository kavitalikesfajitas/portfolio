"use client";
import { NonMainNav } from "../components/Nav/NonMainNav";

export default function Home() {
  return (
    <main className="bg-gray-950 text-white relative flex flex-col min-h-screen">
      <NonMainNav />
      <div>testing page</div>
    </main>
  );
}
