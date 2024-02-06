'use client'

import { FormEvent, useState } from "react";

const AddPostPage = () => {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const form = {
            title,
            content
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
            const responseContent = await response.json();
            //alert(responseContent.data.tableRange);
        } catch(err) {
            console.error(err);
        }
        setTitle("");
        setContent("");
    }
    return (
        <main className="flex min-h-screen flex-col items-center justify-center">
            <div className="m-8 p-8">
                Add Your Content Blog
                <form className="flex-row justify-center items-center py-4 space-y-4" onSubmit={handleSubmit}>
                    <div className="flex items-center justify-center">
                        <label htmlFor="title" className="sr-only">Title</label>
                        <input value={title} onChange={e => setTitle(e.target.value)} type="text" name="title" id="title" className="shadow-md focus:ring-indigo-500 focus:border-indigo-500 block w-64 sm:text-md border-gray-300 rounded-md text-black p-1" placeholder="Title" />
                    </div>
                    <div className="flex items-center justify-center">
                        <label htmlFor="content" className="sr-only">Content</label>
                        <textarea value={content} onChange={e => setContent(e.target.value)} name="content" id="content" className="shadow-md focus:ring-indigo-500 focus:border-indigo-500 block w-64 sm:text-md border-gray-300 rounded-md text-black p-1" placeholder="Type your content" />
                    </div>
                    <div className="flex items-center justify-center">
                        <button type="submit" className="items-center justify-center text-sm w-64 rounded-md shadow py-3 px-2 bg-indigo-100 text-black hover:ring-indigo-500 focus:bg-indigo-300 focus:text-white" >Add Post!</button>
                    </div>
                </form>
            </div>
        </main>
    )
}

export default AddPostPage;