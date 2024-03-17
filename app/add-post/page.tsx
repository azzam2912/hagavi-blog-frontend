import AddPostPage from "./AddPostPage"
import Home from "../page"
import { getUserSession } from "@/lib/session"
import { redirect } from "next/navigation"

const AddPost = async() => {
    const sessionUser = await getUserSession()
    console.log(sessionUser)
    if(sessionUser?.role === "hagavi") {
        return <AddPostPage />;
    } else {
        redirect('/')
    }
}

export default AddPost