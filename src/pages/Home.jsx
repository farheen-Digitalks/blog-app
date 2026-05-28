import { useQuery } from "@tanstack/react-query";

import { getPosts } from "../services/postService";

import PostCard from "../components/PostCard";

const Home = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["posts"],
    queryFn: getPosts,
  });

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  return (
    <div className="grid md:grid-cols-3 gap-5 p-6">
      {data?.map((post) => (
        <PostCard
          key={post._id}
          post={post}
        />
      ))}
    </div>
  );
};

export default Home;