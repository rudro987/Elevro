import { Helmet } from "react-helmet-async";

const Blog = () => {
  return (
    <div className="max-w-[90rem] mx-auto w-full lg:py-24">
      <Helmet>
        <title>Elevro | Blog</title>
      </Helmet>
      <h1 className="text-3xl font-semibold text-titleText text-center">
        Read Our Blogs
      </h1>
    </div>
  );
};

export default Blog;
