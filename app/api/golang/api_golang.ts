import { Dispatch, SetStateAction } from "react";
import { Post } from "../../../components/ui/PostCard";

const BASE_URL = "http://localhost:8080/"

const getAllPostAsync = async (setPosts: Dispatch<SetStateAction<Post[]>>) => {
try {
    const response = await fetch(BASE_URL+"post");
    if(!response.ok) {
    throw new Error("Response Not OK");
    }
    const data = await response.json();
    setPosts(data);
} catch(error) {
    console.log("Error");
    return;
}
}

export default getAllPostAsync;