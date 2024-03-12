'use client'

import { useEffect, useState } from "react";
import Blog from "./blog/Blog";
import { useRouter } from "next/navigation";
import { useSession } from 'next-auth/react';

export default function Home() {
  const [posts, setPosts] = useState<string[][]>([])
  const router = useRouter();
  const getAllPostAsync = async () => {
    // try {
    //   const response = await fetch(
    //     '/api/gsheet',
    //     {
    //       method: 'GET',
    //       headers: {
    //           'Accept': 'application/json',
    //           'Content-Type': 'application/json'
    //       },
    //     });
    //   if(!response.ok) {
    //     throw "Error " + response.status;
    //   }
    //   const result = await response.json();
    //   setPosts(result.data.values);
    // } catch(e) {
    //   alert("Error " + e);
    // }
  }
  useEffect(() => {
    getAllPostAsync();
  },[])
  const { data: session } = useSession();
    if (session) {
    // User is signed in
      console.log('User:', session.user);
  } else {
    // User is not signed in
    console.log("sucks")
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between py-12 px-4 sm:px-12 lg:px-32">
      <div className="z-10 w-full flex flex-col items-center justify-between font-mono text-sm lg:flex">
        <div className="flex flex-col justify-center items-center w-screen">
          <div className="text-2xl">This is Hagavi Blog</div>
          <br />
        </div>
        {/* <Blog posts={posts} /> */}
      </div>
    </main>
  );
}
