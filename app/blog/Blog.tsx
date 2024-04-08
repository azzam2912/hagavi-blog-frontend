'use client'

import { useEffect, useState } from "react";
import PostCard from "../../components/ui/PostCard";
import { Post } from "@/types/post";
import Loading from "../../components/ui/Loading/LoadingList";
import { getAllPostAsync }from "../api/golang/api_golang";
import { useSession } from "next-auth/react";

export default function Blog() {
  const [posts, setPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  useEffect(() => {
    const fetchData = async() => {
      const data = await getAllPostAsync();
      setPosts(data);
      setLoading(false);
    }
    fetchData();
  },[])
  return (
    <div className="flex flex-col items-center p-2 w-full">
      {
        loading ? 
          ([1,2,3,4].map((_value, index) => (
            <Loading key={index} />
          )))
        : 
          (posts.map((_, index, arr) => (
            <PostCard key={index} post={posts[arr.length - index - 1]} />
          )))
      }
    </div>
  );
}
