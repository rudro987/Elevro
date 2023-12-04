import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import Loader from "../../Components/Loader";

const FullBlogPost = () => {
    const axiosPublic = useAxiosPublic();
    const { id } = useParams();
    const {data: blogPost, isPending: loading} = useQuery({
        queryKey: ['blogPost', id],
        queryFn: async () => {
            const res = await axiosPublic.get(`/alloBlogs/${id}`);
            return res.data;
        }
    });

    if(loading){
        return <Loader></Loader>
    }

    return (
        <div className="max-w-[90rem] mx-auto w-full lg:py-24">
            <div className="flex flex-col justify-center items-center gap-14">
            <h1 className="text-4xl font-bold text-center">{blogPost?.title}</h1>
            <img src={blogPost.image} className="rounded-lg" alt="blog-image" />
            <div dangerouslySetInnerHTML={{ __html: `${blogPost.content}`}}></div>
            </div>
        </div>
    );
};

export default FullBlogPost;