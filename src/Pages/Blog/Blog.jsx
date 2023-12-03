import { Helmet } from "react-helmet-async";
import Loader from "../../Components/Loader";
import useBlogs from "../../Hooks/useBlogs";
import BlogPostCard from "./BlogPostCard";

const Blog = () => {
  const [allBlogs, loading] = useBlogs();
  console.log(allBlogs);

  if (loading) {
    return <Loader></Loader>;
  }
  return (
    <div className="max-w-[90rem] mx-auto w-full lg:py-24">
      <Helmet>
        <title>Elevro | Blog</title>
      </Helmet>
      <h1 className="text-3xl font-semibold text-titleText text-center mb-20">
        Read Our Blogs
      </h1>

      <div className="space-y-10">
        {allBlogs.map((post) => (
          <BlogPostCard key={post._id} post={post}></BlogPostCard>
        ))}
      </div>
    </div>
  );
};

export default Blog;
