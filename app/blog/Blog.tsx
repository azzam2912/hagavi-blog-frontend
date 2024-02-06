import Image from "next/image";
import PostCard, { Post } from "../posts/PostCard";

interface BlogProps {
  posts: string[][];
}

export default function Blog({ posts }: BlogProps) {
  return (
    <div className="p-4 w-full">
      {posts.map((post, index) => (
        <PostCard key={index} post={post} />
      ))}
    </div>
  );
}
