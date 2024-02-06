'use client'

import { Post } from "./posts/PostCard";
import { useEffect, useState } from "react";
import Blog from "./blog/Blog";
import getAllPostAsync from "./api/golang/api_golang";
import { useRouter } from "next/navigation";

export default function Home() {
  const [posts, setPosts] = useState<Post[]>([])
  const router = useRouter();
  useEffect(() => {
    //getAllPostAsync(setPosts);
  },[])

  const handleClickAddPost = () => {
      router.push('/add-post')
  }
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
        <div className="flex justify-center items-center w-screen">
          <div className="text-2xl">This is Hagavi Blog</div>
        </div>
        <button onClick={handleClickAddPost}>Add Blog Post</button>
        <Blog posts={posts} />
      </div>
    </main>
  );
}
