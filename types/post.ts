export interface CreatePost {
    title: string;
    content: string;
    author: string;
}

export interface Post extends CreatePost {
    id: number;
    created_at: string;
    updated_at: string;
}

