
export interface Post {
  id: number;
  title: string;
  content: string;
  created_at: Date;
  updated_at: Date;
  author: string;
}

interface PostCardProps {
    post: string[];
}

const PostCard: React.FC<PostCardProps> = ({ post }) => {
  return (
    <div className="flex flex-col items-center m-4 p-1 border border-gray-300 p-4 rounded-md">
      <h2 className="text-xl font-bold">{post[0]}</h2>
      <p className="whitespace-pre-wrap">{post[1]}</p>
    </div>
  );
};

export default PostCard;