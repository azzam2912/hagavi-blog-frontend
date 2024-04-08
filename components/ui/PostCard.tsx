'use client'

import { convertDate } from "@/util/dateConvert";
import { useSession } from "next-auth/react";
import { ButtonPrimary, ButtonSecondary } from "./Buttons/Button";
import Image from "next/image";
import { deletePostByIdAsync } from "@/app/api/golang/api_golang";
import { Post } from "@/types/post";
import { useRouter } from "next/navigation";
import EditDeleteButtons from "./Buttons/EditDeleteButtons";

interface PostCardProps {
    post: Post;
}

const PostCard: React.FC<PostCardProps> = ({ post }) => {
  const {data: session, status} = useSession();
  const router = useRouter();
  return (
    <div className="flex flex-col items-center m-2 p-1 border border-gray-300 p-2 rounded-md w-[750px] max-w-full min-h-60 light:bg-[#f9f9f9]">
      <div className="flex flex-col items-center w-full">
        <h1 className="text-xl font-bold">{post?.title}</h1>
        <br/>
        <p className="whitespace-pre-wrap text-ellipsis overflow-hidden h-[8em]">{post?.content}</p>
        <br/>
      </div>
      <div className="flex-none">
        <ButtonSecondary type="button" onClick={() => router.push(`/post/${post.id}`)} className="text-indigo-500">
        ... click to read more ...
        </ButtonSecondary>
      </div>
      <div className="md:grow flex-none md:relative h-min w-full pl-2">
        <p className="md:absolute left-2 bottom-1 text-[0.7rem] text-red-700">Author: {post?.author}</p>
        <p className="md:absolute right-2 bottom-1 text-[0.7rem] text-blue-700">Last updated: {convertDate(post?.updated_at)}</p>
      </div>
      { (session?.user?.role === "hagavi") &&
        <EditDeleteButtons postId={post?.id}/>
      }
    </div>
  );
};

export default PostCard;