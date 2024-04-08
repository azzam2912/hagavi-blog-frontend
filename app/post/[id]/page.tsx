'use client'

import { getPostByIdAsync } from "@/app/api/golang/api_golang";
import { ButtonPrimary } from "@/components/ui/Buttons/Button";
import { Post } from "@/types/post";
import { convertDate } from "@/util/dateConvert";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import EditDeleteButtons from "@/components/ui/Buttons/EditDeleteButtons";
import Loading from "@/components/ui/Loading/LoadingList";

const ViewPost = ({params} : {params: {id: number}}) => {
    const [post, setPost] = useState<Post>({} as Post);
    const [loading, setLoading] = useState<boolean>(true)
    const {data: session, status} = useSession();
    const router = useRouter();
    useEffect(() => {
        const fetchData = async () => {
            const data = await getPostByIdAsync(params.id);
            setPost(data);
            setLoading(false);
        }
        fetchData();
    }, [params.id])
    return (
        <div className="flex min-h-screen flex-col items-center justify-between py-12 px-4 sm:px-12 lg:px-32">
        <div className="flex items-center justify-center p-2 w-full">
            {loading ?
            <Loading />
            :
            <div className="flex flex-col items-center justify-center m-2 p-1 w-[750px] max-w-full min-h-60 light:bg-[#f9f9f9]">
                <header className="flex flex-col items-center">
                    <h1 className="text-2xl font-bold">{post?.title}</h1>
                    <h3 className="text-[0.7rem] text-red-700">By: {post?.author}</h3>
                    <p className="text-[0.7rem] text-blue-700">Last updated: {convertDate(post?.updated_at)}</p>
                </header>
                {   (session?.user?.role === "hagavi") ? (
                        <EditDeleteButtons postId={post?.id}/>
                    ) : (
                        <br/>
                    )
                }
                
                <main className="border border-gray-300 p-4 m-8 mx-4 rounded-md whitespace-pre-warp md:w-[720px]">
                    <p className="text-base whitespace-pre-line">
                        {post?.content}
                    </p>
                </main>
            </div>}
        </div>
        </div>
    )
}
export default ViewPost;