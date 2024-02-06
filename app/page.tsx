'use client'

import { Post } from "./posts/PostCard";
import { useEffect, useState } from "react";
import Blog from "./blog/Blog";
import { useRouter } from "next/navigation";

export default function Home() {
  const [posts, setPosts] = useState<string[][]>([])
  const router = useRouter();
  const getAllPostAsync = async () => {
    try {
      const response = await fetch(
        '/api/gsheet',
        {
          method: 'GET',
          headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
          },
        });
      if(!response.ok) {
        throw "Error " + response.status;
      }
      const result = await response.json();
      setPosts(result.data.values);
    } catch(e) {
      alert("Error " + e);
    }
  }
  useEffect(() => {
    getAllPostAsync();
  },[])

  const handleClickAddPost = () => {
      router.push('/add-post')
  }
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-16">
      <div className="z-10 w-full flex flex-col items-center justify-between font-mono text-sm lg:flex">
        <div className="flex flex-col justify-center items-center w-screen">
          <div className="text-2xl">This is Hagavi Blog</div>
          <br />
          <button className="p-2 rounded-md border border-white-100" onClick={handleClickAddPost}>Add Blog Post</button>
        </div>
        <Blog posts={posts} />
      </div>
    </main>
  );
}
