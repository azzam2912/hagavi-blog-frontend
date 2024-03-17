'use client'

import { useEffect, useState } from "react";
import PostCard from "../../components/ui/PostCard";
import Loading from "../../components/ui/LoadingList";

export default function Blog() {
  const [posts, setPosts] = useState<string[][]>([])
  const [loading, setLoading] = useState<boolean>(true)
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
      setLoading(false)
      setPosts(result.data.values);
    } catch(e) {
      alert("Error " + e);
    }
  }
  useEffect(() => {
    getAllPostAsync()
  },[])
  return (
    <div className="p-2 w-full">
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
