
export interface Post {
  id: number;
  title: string;
  content: string;
  created_at: Date;
  updated_at: Date;
  author: string;
}

interface PostCardProps {
    post: Post;
}

const PostCard: React.FC<PostCardProps> = ({ post }) => {
  return (
    <div className="border border-gray-300 p-4 rounded-md">
      <h2 className="text-xl font-bold">{post.title}</h2>
      <p>{post.content}</p>
    </div>
  );
};

export default PostCard;