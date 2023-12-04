import { Link } from "react-router-dom";

const RecommendationsCard = ({ blog }) => {
  return (
    <div className="card w-96 bg-base-100 shadow-xl image-full">
      <figure>
      <img
          src={blog.image}
          alt=""
        />
      </figure>
      <div className="card-body space-y-2">
        <Link to={`/blog/${blog._id}`}>
        <h2 className="card-title font-extrabold text-base">{blog.title}</h2>
          </Link>
        <p className="text-base font-semibold">Read more on this topic by clicking the view blog button</p>
        <div className="card-actions justify-center pt-5">
          <Link to={`/blog/${blog._id}`}>
          <button className="bg-primary px-8 py-4 rounded-md border-none text-white font-bold hover:bg-primaryHover">View Blog</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RecommendationsCard;
