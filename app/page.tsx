import { Post } from "./posts/PostCard";


export default function Home() {
  let posts: Post[];
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
        <div className="flex justify-center items-center w-screen">
          <div className="text-2xl">This is Hagavi Blog</div>
        </div>
    
      </div>
    </main>
  );
}
