'use client'

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { ButtonPrimary, ButtonSecondary } from "../../components/ui/Buttons/Button";
import { createPostAsync, updatePostByIdAsync } from "../api/golang/api_golang";
import { CreatePost, Post } from "@/types/post";
import { useSession } from "next-auth/react";
import { Status } from "@/types/toast";
import { useToastStore } from "@/store/store";

const AddUpdatePostPage = ({isCreate, post} : {isCreate:boolean, post:Post}) => {
    const [form, setForm] = useState({title: isCreate ? "" : post.title, content: isCreate ? "" : post.content});
    const { updateToast, toast } = useToastStore((state) => ({
        updateToast: state.updateToast,
        toast: state.toast,
    }));
    const router = useRouter();
    const {data:session, status} = useSession();
    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData: CreatePost = {
            title: form.title,
            content: form.content,
            author: session?.user?.name as string
        }
        if(form.title === "" || form.content === "") {
            updateToast({
                ...toast, 
                show: true, 
                message: "Title or content cannot be empty"
            });
            return;
        }
        try {
            if(isCreate){
                createPostAsync(formData)
            } else {
                updatePostByIdAsync(post?.id, formData)
            }
            updateToast({...toast, show: true, message: "Success Added/Updated Post", status: Status.SUCCESS})
        } catch(err) {
            updateToast({...toast, show: true, message: "Error, cannot add/update post: " + err})
            return;
        }
    }
    const handleBackToHome = () => {
        router.push("/");
    }
    return (
        <main className="flex min-h-screen flex-col items-center justify-center">
            <div className="flex flex-col items-center w-3/4 m-8 p-8">
                Add Blog Content
                <form className="flex-row justify-center items-center w-full py-4 space-y-4" onSubmit={handleSubmit}>
                    <div className="flex items-center justify-center">
                        <label htmlFor="title" className="sr-only">Title</label>
                        <input value={form.title}
                         onChange={e => setForm({...form, title: e.target.value})} 
                         type="text" name="title" id="title" 
                         className="shadow-md border-indigo-300 border-2 focus:ring-indigo-500 block w-full sm:text-md border-gray-300 rounded-md light:text-black dark:bg-transparent p-1" 
                         placeholder={`Title`} />
                    </div>
                    <div className="h-full flex items-center justify-center">
                        <label htmlFor="content" className="sr-only">Content</label>
                        <textarea value={form.content} 
                        onChange={e => setForm({...form, content: e.target.value})} 
                        name="content" id="content" 
                        className="shadow-md border-indigo-300 border-2 focus:ring-indigo-500 block w-full min-h-[500px] sm:text-md border-gray-300 rounded-md light:text-black dark:bg-transparent p-1" 
                        placeholder={`Type your content`} />
                    </div>
                    <div className="flex items-center justify-center">
                        <ButtonPrimary type="submit">{isCreate ? `Add Post!` : `Update Post!`}</ButtonPrimary>
                    </div>
                </form>
                <ButtonSecondary onClick={handleBackToHome}>Back to Home</ButtonSecondary>
            </div>
        </main>
    )
}

export default AddUpdatePostPage;