import { Dispatch, SetStateAction } from "react";
import { CreatePost, Post } from "@/types/post";
import { json } from "stream/consumers";

const BASE_URL: string = process.env.NEXT_PUBLIC_GOLANG_API_URL_LOCAL!;

export const getAllPostAsync = async () => {
    const url = `${BASE_URL}/post`;
    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        });
        if(!response.ok) {
            throw new Error(`Response Not OK: ${response.status}`);
        }
        const data = await response.json();
        return data;
    } catch(error) {
        throw new Error("Connection Error");
    }
    return;
}

export const getPostByIdAsync = async (id: number) => {
    const url = `${BASE_URL}/post/${id}`;
    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        });
        if(!response.ok) {
            throw new Error(`Response Not OK: ${response.status}`);
        } 
        const data = await response.json();
        return data
    } catch(error) {
        throw new Error(`Error get post`);
    }
}

export const createPostAsync = async (post: CreatePost) => {
    const url = `${BASE_URL}/post`;
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(post),
        });
        if(!response.ok) {
            throw new Error(`Response Not OK: ${response.status}`);
        } 
        return response
        
    } catch(error) {
        throw new Error(`Error creating post`);
    }
}

export const updatePostByIdAsync = async (id: number, post: CreatePost) => {
    const url = `${BASE_URL}/post/${id}`;
    try {
        const response = await fetch(url, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(post),
        });
        if(!response.ok) {
            throw new Error(`Response Not OK: ${response.status}`);
        } 
        return response;
    } catch(error) {
        throw new Error(`Error updating post`);
    }
}

export const deletePostByIdAsync = async (id: number) => {
    const url = `${BASE_URL}/post/${id}`; 
    try {
        const response = await fetch(url, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            }
        });
        if(!response.ok) {
            throw new Error(`Response Not OK: ${response.status}`);
        } 
        console.log("Delete success", response);
        return response
    } catch(error) {
        throw new Error(`Error deleting post`);
    }
}