'use client'

import { convertDate } from "@/util/dateConvert";
import { useSession } from "next-auth/react";
import { Button } from "./Button";
import Image from "next/image";
export interface Post {
  id: number;
  title: string;
  content: string;
  created_at: string;
  updated_at: string;
  author: string;
}

interface PostCardProps {
    post: Post;
}

const PostCard: React.FC<PostCardProps> = ({ post }) => {
  const {data: session, status} = useSession();
  return (
    <div className="flex flex-col items-center m-2 p-1 border border-gray-300 p-2 rounded-md w-[750px] max-w-full min-h-60 light:bg-[#f9f9f9]">
      <div className="grow flex flex-col items-center w-full h-full">
        <h1 className="text-xl font-bold">{post?.title}</h1>
        <br/>
        <p className="whitespace-pre-wrap">{post?.content}</p>
      </div>
      <div className="md:grow flex-none md:relative h-min w-full pl-2">
        <p className="md:absolute left-2 bottom-1 text-[0.7rem] text-red-700">Author: {post?.author}</p>
        <p className="md:absolute right-2 bottom-1 text-[0.7rem] text-blue-700">Last updated: {convertDate(post?.updated_at)}</p>
      </div>
      { (session?.user?.role === "hagavi") &&
        <div className="flex justify-start w-full px-2 pt-2 gap-x-3">
          <Button type="submit" onClick={() => console.log("HOW")}>
            <Image alt="Edit" className="dark:invert" width={20} height={20} src='edit_FILL0_wght400_GRAD0_opsz24.svg' />
            Edit
          </Button>
          <Button className="border-red-500 text-red-500" type="submit">
            <Image alt="Edit" className="text-red-500" width={20} height={20} src='delete_FILL0_wght400_GRAD0_opsz24.svg' />
            Delete
          </Button>
        </div>
      }
    </div>
  );
};

export default PostCard;