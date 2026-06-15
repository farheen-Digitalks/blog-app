import { useQuery } from "@tanstack/react-query";
import { getPosts } from "../services/postService";
import PostCard from "../components/PostCard";
import Navbar from "../components/Navbar";

const Home = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["posts"],
    queryFn: getPosts,
  });

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      <Navbar />
      
      {/* Hero Section */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center animate-fade-in-up">
          <div className="inline-block px-4 py-1.5 rounded-full bg-indigo-50 text-indigo-700 font-semibold text-sm mb-6 border border-indigo-100">
            Welcome to Blogify
          </div>
          <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 tracking-tight mb-6">
            Insights, stories and <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">expert opinions.</span>
          </h1>
          <p className="text-xl text-gray-500 max-w-2xl mx-auto mb-10">
            Discover the best content about technology, design, and product development from our team of experts.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex justify-between items-end mb-10">
          <div>
            <h2 className="text-3xl font-bold text-gray-900">Latest Posts</h2>
            <p className="text-gray-500 mt-2">Read our most recent articles</p>
          </div>
        </div>

        {isLoading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="bg-white rounded-2xl h-96 animate-pulse border border-gray-100 shadow-sm p-4 flex flex-col">
                <div className="w-full h-48 bg-gray-200 rounded-xl mb-4"></div>
                <div className="h-6 bg-gray-200 rounded w-3/4 mb-3"></div>
                <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-5/6"></div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {data?.map((post, index) => (
              <div key={post._id || post.id} className="animate-fade-in-up" style={{ animationDelay: `${index * 0.1}s` }}>
                <PostCard post={post} />
              </div>
            ))}
            {(!data || data.length === 0) && (
              <div className="col-span-full py-20 text-center">
                <div className="text-6xl mb-4 opacity-20">📭</div>
                <h3 className="text-xl font-bold text-gray-700">No posts published yet</h3>
                <p className="text-gray-500 mt-2">Check back later for new content.</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;