'use client'

import { useEffect, useState } from "react";
import PostCard, { Post } from "../../components/ui/PostCard";
import Loading from "../../components/ui/LoadingList";
import getAllPostAsync from "../api/golang/api_golang";

export default function Blog() {
  const [posts, setPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  useEffect(() => {
    getAllPostAsync(setPosts, setLoading);

  },[])
  return (
    <div className="flex flex-col items-center p-2 w-full">
      {
        loading ? 
          <Loading />
        : 
        (posts.map((_, index, arr) => (
          <PostCard key={index} post={posts[arr.length - index - 1]} />
        )))
      }
    </div>
  );
}
