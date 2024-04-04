import { Dispatch, SetStateAction } from "react";
import { Post } from "../../../components/ui/PostCard";

const BASE_URL: string = process.env.NEXT_PUBLIC_GOLANG_API_URL!;

const getAllPostAsync = async (setPosts: Dispatch<SetStateAction<Post[]>>, setLoading: Dispatch<SetStateAction<boolean>>) => {
    const url = BASE_URL + "/post";
    try {
        const response = await fetch(url);
        if(!response.ok) {
            throw new Error(`Response Not OK: ${response.status}`);
        }
        const data = await response.json();
        setPosts(data);
        setLoading(false);
    } catch(error) {
        throw new Error(error?.message);
    }
    return;
}

export default getAllPostAsync;