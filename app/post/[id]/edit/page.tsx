import { getPostByIdAsync, updatePostByIdAsync } from "@/app/api/golang/api_golang"
import UpdatePostPage from "../../AddUpdatePostPage"
import { getUserSession } from "@/lib/session"
import { redirect } from "next/navigation"
import { useEffect } from "react"
import { Post } from "@/types/post"

const EditPost = async({params} : {params: {id: number}}) => {
    const sessionUser = await getUserSession()
    const fetchData = async (): Promise<Post> => {
        const data = await getPostByIdAsync(params.id);
        return data;
    }
    const post = await fetchData()
    if(sessionUser?.role === "hagavi") {
        return <UpdatePostPage isCreate={false} post={post} />;
    } else {
        redirect('/')
    }
}

export default EditPost