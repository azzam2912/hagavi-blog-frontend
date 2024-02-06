'use client'

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

const AddPostPage = () => {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const router = useRouter();
    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const form = {
            title,
            content
        }
        if(title === "" || content === "") {
            alert("Title or Content cannot be empty.")
            return
        }
        try {
            const response = await fetch(
                'api/gsheet',
                {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(form)
                });
            if(!response.ok) {
                throw "Error " + response.status;
            }
            const result = await response.json();
            alert("Post has been added to sheetrange " + result.data.tableRange);
        } catch(err) {
            console.error(err);
            alert("Error, cannot add post: " + err);
            return;
        }
        setTitle("");
        setContent("");
    }
    const handleBackToHome = () => {
        router.push("/");
    }
    return (
        <main className="flex min-h-screen flex-col items-center justify-center">
            <div className="flex flex-col items-center w-3/4 m-8 p-8">
                Add Your Content Blog
                <form className="flex-row justify-center items-center w-4/5 py-4 space-y-4" onSubmit={handleSubmit}>
                    <div className="flex items-center justify-center">
                        <label htmlFor="title" className="sr-only">Title</label>
                        <input value={title} onChange={e => setTitle(e.target.value)} type="text" name="title" id="title" className="shadow-md focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-md border-gray-300 rounded-md text-black p-1" placeholder="Title" />
                    </div>
                    <div className="h-full flex items-center justify-center">
                        <label htmlFor="content" className="sr-only">Content</label>
                        <textarea value={content} onChange={e => setContent(e.target.value)} name="content" id="content" className="shadow-md focus:ring-indigo-500 focus:border-indigo-500 block w-full min-h-[500px] sm:text-md border-gray-300 rounded-md text-black p-1" placeholder="Type your content" />
                    </div>
                    <div className="flex items-center justify-center">
                        <button type="submit" className="items-center justify-center text-sm w-64 rounded-md shadow py-3 px-2 bg-indigo-100 text-black hover:ring-indigo-500 focus:bg-indigo-300 focus:text-white" >Add Post!</button>
                    </div>
                </form>
                <button className="hover:cursor-pointer hover:bg-slate-700 focus:bg-slate-400" onClick={handleBackToHome}>
                    back to home
                </button>
            </div>
        </main>
    )
}

export default AddPostPage;