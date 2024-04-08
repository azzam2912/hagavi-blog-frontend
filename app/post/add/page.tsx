import AddPostPage from "../AddUpdatePostPage"
import { getUserSession } from "../../../lib/session"
import { redirect } from "next/navigation"
import { Post } from "@/types/post"

const AddPost = async() => {
    const sessionUser = await getUserSession()
    if(sessionUser?.role === "hagavi") {
        return <AddPostPage isCreate={true} post={{} as Post}/>;
    } else {
        redirect('/')
    }
}

export default AddPost