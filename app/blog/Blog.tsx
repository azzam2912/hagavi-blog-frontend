import Image from "next/image";
import PostCard, { Post } from "../../components/ui/PostCard";

interface BlogProps {
  posts: string[][];
}

export default function Blog({ posts }: BlogProps) {
  return (
    <div className="p-2 w-full">
      {posts.map((_, index, arr) => (
        <PostCard key={index} post={posts[arr.length - index - 1]} />
      ))}
    </div>
  );
}
