import { Link } from "react-router-dom";

const BlogPostCard = ({ post }) => {
  return (
    <div className="hero">
      <div className="hero-content flex-col gap-20 lg:flex-row">
        <img
          src={post.image}
          className="max-w-lg rounded-lg shadow-2xl"
        />
        <div>
        <Link to={`/blog/${post._id}`}><h1 className="text-2xl font-bold mb-3">{post.title}</h1></Link>
          <div dangerouslySetInnerHTML={{ __html: `${(post.content).slice(0, 300)} ......` }}></div>
          
          <Link to={`/blog/${post._id}`}>
            <button className="mt-5 btn bg-primary hover:bg-primaryHover text-white font-bold">View Full Post</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BlogPostCard;
