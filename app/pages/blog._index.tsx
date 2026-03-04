import { useState, useEffect, useMemo } from "react";
import { Link } from "react-router";
import {
  Calendar,
  Clock,
  Terminal,
  Search,
  Tag,
  Filter,
  X,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { blogPosts, allCategories, allTags } from "@/data/blog";
import Footer from "@/components/Footer";

const BlogList = () => {
  // State for filtering and searching
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedTag, setSelectedTag] = useState("");
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  // Filter posts based on search term, category, and tag
  const filteredPosts = useMemo(() => {
    return blogPosts.filter((post) => {
      const matchesSearch =
        searchTerm === "" ||
        post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesCategory =
        selectedCategory === "" || post.category === selectedCategory;

      const matchesTag = selectedTag === "" || post.tags.includes(selectedTag);

      return matchesSearch && matchesCategory && matchesTag;
    });
  }, [searchTerm, selectedCategory, selectedTag]);

  // Clear all filters
  const clearFilters = () => {
    setSearchTerm("");
    setSelectedCategory("");
    setSelectedTag("");
  };

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-black text-white">
      <main className="pt-24 pb-16">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          {/* Header */}
          <div className="mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 font-mono">
              <span className="text-gray-500">{"<"}</span>
              <span className="text-green-400">Blog</span>
              <span className="text-gray-500">{">"}</span>
            </h1>
            <p className="text-gray-400 text-lg font-mono">
              <span className="text-gray-500">/* </span>
              Exploring ideas, sharing knowledge, and documenting my journey in
              tech
              <span className="text-gray-500"> */</span>
            </p>
          </div>

          {/* Search and Filter Section */}
          <div className="mb-10 bg-gray-900 rounded-lg border border-gray-800 p-6">
            <div className="flex flex-col md:flex-row gap-4 mb-6">
              {/* Search Input */}
              <div className="relative flex-grow">
                <Search
                  size={18}
                  className={`absolute left-3 top-1/2 transform -translate-y-1/2 transition-colors duration-200 ${isSearchFocused ? "text-green-400" : "text-gray-500"}`}
                />
                <Input
                  type="text"
                  placeholder="Search articles..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  onFocus={() => setIsSearchFocused(true)}
                  onBlur={() => setIsSearchFocused(false)}
                  className="pl-10 bg-gray-800 border-gray-700 focus:border-green-500 focus:ring-green-500/20 text-white"
                />
                {searchTerm && (
                  <button
                    onClick={() => setSearchTerm("")}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-white"
                  >
                    <X size={16} />
                  </button>
                )}
              </div>

              {/* Clear Filters Button */}
              {(searchTerm || selectedCategory || selectedTag) && (
                <Button
                  variant="outline"
                  onClick={clearFilters}
                  className="border-gray-600 text-white hover:bg-gray-900 hover:border-green-500 font-mono"
                >
                  <X size={16} className="mr-2" />
                  Clear Filters
                </Button>
              )}
            </div>

            {/* Category Filters */}
            <div className="mb-4">
              <div className="flex items-center gap-2 mb-2">
                <Filter size={16} className="text-gray-500" />
                <span className="text-sm text-gray-400 font-mono">
                  Filter by Category:
                </span>
              </div>
              <div className="flex flex-wrap gap-2">
                {allCategories.map((category) => (
                  <Button
                    key={category}
                    variant={
                      selectedCategory === category ? "default" : "outline"
                    }
                    size="sm"
                    onClick={() =>
                      setSelectedCategory(
                        selectedCategory === category ? "" : category,
                      )
                    }
                    className={`text-xs font-mono ${selectedCategory === category
                        ? "bg-green-500 hover:bg-green-600 text-black"
                        : "border-gray-700 text-gray-400 hover:text-white hover:border-gray-600"
                      }`}
                  >
                    <Terminal size={14} className="mr-2" />
                    {category}
                  </Button>
                ))}
              </div>
            </div>

            {/* Tag Filters */}
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Tag size={16} className="text-gray-500" />
                <span className="text-sm text-gray-400 font-mono">
                  Filter by Tag:
                </span>
              </div>
              <div className="flex flex-wrap gap-2">
                {allTags.map((tag) => (
                  <Button
                    key={tag}
                    variant={selectedTag === tag ? "default" : "outline"}
                    size="sm"
                    onClick={() =>
                      setSelectedTag(selectedTag === tag ? "" : tag)
                    }
                    className={`text-xs font-mono ${selectedTag === tag
                        ? "bg-green-500 hover:bg-green-600 text-black"
                        : "border-gray-700 text-gray-400 hover:text-white hover:border-gray-600"
                      }`}
                  >
                    #{tag.toLowerCase().replace(" ", "_")}
                  </Button>
                ))}
              </div>
            </div>
          </div>

          {/* Results Count */}
          <div className="mb-6">
            <p className="text-gray-400 font-mono">
              <span className="text-green-400">{filteredPosts.length}</span>{" "}
              article{filteredPosts.length !== 1 ? "s" : ""} found
              {(searchTerm || selectedCategory || selectedTag) &&
                " matching your filters"}
            </p>
          </div>

          {/* Blog Posts Grid */}
          {filteredPosts.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              {filteredPosts.map((post, index) => (
                <Link
                  key={post.id}
                  to={`/blog/${post.id}`}
                  state={{ fromBlogList: true }}
                >
                  <Card
                    className="bg-gray-900 border-gray-800 hover:border-green-500/50 transition-all duration-300 group cursor-pointer animate-slide-in relative overflow-hidden h-full"
                    style={{ animationDelay: `${index * 100}ms` }}
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

                      {/* Tags */}
                      <div className="flex flex-wrap gap-2 mt-auto pt-4">
                        {post.tags.slice(0, 3).map((tag, idx) => (
                          <span
                            key={idx}
                            className="text-xs text-gray-500 font-mono"
                          >
                            #{tag.toLowerCase().replace(" ", "_")}
                          </span>
                        ))}
                        {post.tags.length > 3 && (
                          <span className="text-xs text-gray-500 font-mono">
                            +{post.tags.length - 3}
                          </span>
                        )}
                      </div>

                      {/* Overlay effect for smoother transitions */}
                      <div className="absolute inset-0 bg-green-500/0 group-hover:bg-green-500/5 transition-colors duration-300 pointer-events-none" />
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-16 bg-gray-900 rounded-lg border border-gray-800">
              <Terminal size={48} className="mx-auto text-gray-700 mb-4" />
              <h3 className="text-xl font-semibold text-gray-400 mb-2">
                No articles found
              </h3>
              <p className="text-gray-500 mb-6">
                Try adjusting your search or filter criteria
              </p>
              <Button
                variant="outline"
                onClick={clearFilters}
                className="border-gray-700 text-gray-400 hover:text-white hover:border-green-500"
              >
                <X size={16} className="mr-2" />
                Clear Filters
              </Button>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default BlogList;
