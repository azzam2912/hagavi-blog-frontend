import Blog from "./blog/Blog";
import { Suspense } from "react";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between py-12 px-4 sm:px-12 lg:px-32">
      <div className="z-10 w-full flex flex-col items-center justify-between font-mono text-sm lg:flex">
        <div className="flex flex-col justify-center items-center w-screen">
          <div className="text-2xl">This is Hagavi Blog</div>
          <br />
        </div>
        <Suspense fallback={<div className="flex items-center justify-center bg-white-100">Loading Blog Posts...</div>}>
          <Blog />
        </Suspense>
      </div>
    </main>
  );
}

