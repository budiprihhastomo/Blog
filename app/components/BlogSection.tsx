import { Calendar, Clock, ArrowRight, Terminal } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router";
import { featuredBlogPosts } from "@/data/blog";

const BlogSection = () => {

  return (
    <section id="blog" className="py-20 bg-gray-950 text-white">
      <div className="max-w-4xl mx-auto px-6 lg:px-8">
        <div className="mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 font-mono">
            <span className="text-gray-500">{"<"}</span>
            <span className="text-green-400">Blog</span>
            <span className="text-gray-500">{">"}</span>
          </h2>
          <p className="text-gray-400 text-lg font-mono">
            <span className="text-gray-500">/* </span>
            Sharing thoughts, experiences, and insights about technology and web
            development
            <span className="text-gray-500"> */</span>
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {featuredBlogPosts.map((post, index) => (
            <Link
              key={index}
              to={`/blog/${post.id}`}
              state={{ fromBlogSection: true }}
            >
              <Card
                key={post.id}
                className="bg-gray-900 border-gray-800 hover:border-green-500/50 transition-all duration-300 group cursor-pointer animate-slide-in relative overflow-hidden min-h-[350px]"
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center text-xs text-gray-500 font-mono">
                      <Calendar size={14} className="mr-2" />
                      <span className="mr-4">{post.date}</span>
                      <Clock size={14} className="mr-2" />
                      <span>{post.readTime}</span>
                    </div>
                    <Terminal
                      size={14}
                      className="text-green-400 transition-colors duration-300"
                    />
                  </div>

                  <span className="inline-block bg-gray-800 text-green-400 text-xs px-2 py-1 rounded font-mono mb-3 group-hover:bg-green-500/20 transition-colors duration-300">
                    {post.category.toLowerCase()}
                  </span>

                  <h3 className="text-lg font-semibold text-white mb-3 group-hover:text-green-400 transition-colors duration-200">
                    {post.title}
                  </h3>

                  <p className="text-gray-400 text-sm mb-4 line-clamp-3">
                    {post.excerpt}
                  </p>

                  {/* Overlay effect for smoother transitions */}
                  <div className="absolute inset-0 bg-green-500/0 transition-colors duration-300 pointer-events-none" />
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        <div className="text-center">
          <Link to="/blog">
            <Button
              variant="outline"
              className="border-gray-600 text-white hover:bg-gray-900 hover:border-green-500 font-mono transition-all duration-300 cursor-pointer"
            >
              <Terminal className="mr-2" size={16} />
              ls -la posts/
              <ArrowRight className="ml-2" size={16} />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default BlogSection;
