import { Post } from "./posts/PostCard";
import { useEffect, useState } from "react";
import Blog from "./blog/Blog";

const BASE_URL = "http://localhost:8080/"

const getAllPostAsync = async () => {
  try {
    const response = await fetch(BASE_URL+"post");
    if(!response.ok) {
      throw new Error("Response Not OK");
    }
    const data = await response.json();
    return data.data;
  } catch(error) {
    console.log("Error")
    return null;
  }
}

export default function Home() {
  const [posts, setPosts] = useState([])
  useEffect(() => {
    const allPosts = getAllPostAsync();
    setPosts(allPosts);
  }, []);
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
