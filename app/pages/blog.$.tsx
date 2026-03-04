import { useParams, useNavigate, useLocation } from "react-router";
import { useEffect } from "react";
import { ArrowLeft, Calendar, Clock, Terminal, Code } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Footer } from "react-day-picker";

const BlogDetail = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams();

  // Check if coming from blog section for transition effects
  const fromBlogSection = location.state?.fromBlogSection || false;

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Mock blog data - in real app, this would come from API/CMS
  const blogPost = {
    id: 1,
    title: "Building Modern Websites with React and Tailwind CSS",
    content: `
      React dan Tailwind CSS adalah kombinasi yang powerful untuk membangun website modern. 
      Dalam artikel ini, kita akan membahas best practices dan tips-tips penting untuk 
      mengoptimalkan development workflow kita.

      ## Prerequisites
      Sebelum memulai, pastikan Anda sudah familiar dengan:
      - JavaScript ES6+
      - HTML & CSS basics
      - Command line interface

      ## Setting up the Project
      
      \`\`\`bash
      npx create-react-app my-portfolio
      cd my-portfolio
      npm install -D tailwindcss postcss autoprefixer
      npx tailwindcss init -p
      \`\`\`

      ## Konfigurasi Tailwind CSS

      Edit file \`tailwind.config.js\`:

      \`\`\`javascript
      module.exports = {
        content: [
          "./src/**/*.{js,jsx,ts,tsx}",
        ],
        theme: {
          extend: {
            colors: {
              primary: '#10b981',
              dark: '#0f172a'
            }
          },
        },
        plugins: [],
      }
      \`\`\`

      ## Component Architecture

      Salah satu kekuatan React adalah component-based architecture. Berikut adalah 
      struktur folder yang saya rekomendasikan:

      \`\`\`
      src/
      ├── components/
      │   ├── ui/
      │   ├── layout/
      │   └── sections/
      ├── pages/
      ├── hooks/
      └── utils/
      \`\`\`

      ## Best Practices

      1. **Gunakan Custom Hooks** - Untuk logic yang reusable
      2. **Component Composition** - Daripada inheritance
      3. **TypeScript** - Untuk type safety
      4. **Responsive Design** - Mobile-first approach

      ## Kesimpulan

      Kombinasi React dan Tailwind CSS memungkinkan kita untuk membangun website 
      yang modern, responsive, dan maintainable dengan development experience yang 
      sangat baik.
    `,
    date: "Dec 15, 2024",
    readTime: "5 min",
    category: "Development",
    filename: "react-tailwind-guide.md",
    tags: ["React", "Tailwind CSS", "JavaScript", "Web Development"],
  };

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-black text-white">
      <main className="pt-24 pb-16">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          {/* Back Button */}
          <Button
            variant="ghost"
            onClick={() => navigate(-1)}
            className="mb-8 text-gray-400 hover:text-green-400 font-mono transition-all duration-300 group"
          >
            <ArrowLeft
              className="mr-2 transition-transform duration-300 group-hover:-translate-x-1"
              size={16}
            />
            cd ../
          </Button>

          {/* Terminal Header */}
          <div className="bg-gray-900 rounded-t-lg border border-gray-700 border-b-0 mb-0">
            <div className="flex items-center px-4 py-2 bg-gray-800 rounded-t-lg">
              <div className="flex space-x-2">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
              </div>
              <div className="ml-4 text-sm text-gray-400 font-mono">
                ~/blog/{blogPost.filename}
              </div>
            </div>
          </div>

          {/* Article Content */}
          <Card className="bg-gray-900 border-gray-700 border-t-0 rounded-t-none">
            <CardContent className="p-8">
              {/* Article Meta */}
              <div className="mb-8">
                <div className="flex items-center gap-4 mb-4 text-sm text-gray-500 font-mono">
                  <div className="flex items-center">
                    <Calendar size={14} className="mr-2" />
                    {blogPost.date}
                  </div>
                  <div className="flex items-center">
                    <Clock size={14} className="mr-2" />
                    {blogPost.readTime}
                  </div>
                  <div className="flex items-center">
                    <Terminal size={14} className="mr-2" />
                    {blogPost.category}
                  </div>
                </div>

                <h1 className="text-3xl md:text-4xl font-bold mb-4 text-white">
                  {blogPost.title}
                </h1>

                <div className="flex flex-wrap gap-2 mb-6">
                  {blogPost.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="bg-gray-800 text-green-400 text-xs px-2 py-1 rounded font-mono"
                    >
                      #{tag.toLowerCase().replace(" ", "_")}
                    </span>
                  ))}
                </div>
              </div>

              {/* Article Body */}
              <div className="prose prose-invert max-w-none">
                <div className="text-gray-300 leading-relaxed space-y-6">
                  {blogPost.content.split("\n").map((paragraph, index) => {
                    if (paragraph.trim() === "") return null;

                    // Handle headers
                    if (paragraph.startsWith("## ")) {
                      return (
                        <h2
                          key={index}
                          className="text-2xl font-bold text-green-400 font-mono mt-8 mb-4"
                        >
                          {paragraph.replace("## ", "")}
                        </h2>
                      );
                    }

                    // Handle code blocks
                    if (paragraph.includes("```")) {
                      const isStart =
                        paragraph.includes("```bash") ||
                        paragraph.includes("```javascript");
                      if (isStart) {
                        return (
                          <div
                            key={index}
                            className="bg-gray-800 rounded-lg p-4 mt-4 border border-gray-700"
                          >
                            <div className="flex items-center mb-2">
                              <Code size={14} className="text-green-400 mr-2" />
                              <span className="text-xs text-gray-500 font-mono">
                                {paragraph.includes("bash")
                                  ? "Terminal"
                                  : "JavaScript"}
                              </span>
                            </div>
                          </div>
                        );
                      }
                      return null;
                    }

                    // Handle inline code
                    if (paragraph.includes("`")) {
                      const parts = paragraph.split("`");
                      return (
                        <p key={index} className="mb-4">
                          {parts.map((part, i) =>
                            i % 2 === 0 ? (
                              part
                            ) : (
                              <code
                                key={i}
                                className="bg-gray-800 text-green-400 px-2 py-1 rounded text-sm font-mono"
                              >
                                {part}
                              </code>
                            ),
                          )}
                        </p>
                      );
                    }

                    // Regular paragraphs
                    return (
                      <p key={index} className="mb-4 text-gray-300">
                        {paragraph.trim()}
                      </p>
                    );
                  })}
                </div>
              </div>

              {/* Article Footer */}
              <div className="mt-12 pt-8 border-t border-gray-700">
                <div className="bg-gray-800 rounded-lg p-4">
                  <div className="font-mono text-sm">
                    <span className="text-green-400">// End of article</span>
                    <br />
                    <span className="text-gray-500">
                      Thanks for reading! Feel free to reach out if you have any
                      questions.
                    </span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default BlogDetail;
