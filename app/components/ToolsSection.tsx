import React, { useState, useMemo, type ReactNode } from "react";
import {
  Terminal,
  Code,
  Braces,
  FileCode,
  Server,
  Cog,
  Palette,
  GitBranch,
  MessageSquare,
  Boxes,
  Container,
  GitPullRequest,
  Monitor,
  BarChart3,
  Activity,
  LineChart,
  Network,
  Search,
  X,
  Filter,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";

interface Tool {
  id: number;
  name: string;
  category: string;
  description: string;
  icon: ReactNode;
  command: string;
}

const ToolsSection = () => {
  const [hoveredTool, setHoveredTool] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  const tools: Tool[] = [
    {
      id: 1,
      name: "ReactJS",
      category: "Frontend",
      description: "Modern UI library for building interactive interfaces",
      icon: <Braces className="text-blue-400" />,
      command: "npx create-next-app",
    },
    {
      id: 2,
      name: "NodeJS",
      category: "Backend",
      description: "JavaScript runtime for server-side development",
      icon: <Server className="text-green-500" />,
      command: "npm init -y",
    },
    {
      id: 3,
      name: "Golang",
      category: "Backend",
      description: "Efficient and reliable programming language",
      icon: <FileCode className="text-blue-500" />,
      command: "go mod init",
    },
    {
      id: 4,
      name: "Rust",
      category: "Systems",
      description: "Performance, reliability, and productivity",
      icon: <Cog className="text-orange-500" />,
      command: "cargo init",
    },
    {
      id: 5,
      name: "Tailwind CSS",
      category: "Styling",
      description: "Utility-first CSS framework for rapid styling",
      icon: <Palette className="text-cyan-400" />,
      command: "npx tailwindcss init",
    },
    {
      id: 6,
      name: "Git",
      category: "Version Control",
      description: "Distributed version control system",
      icon: <GitBranch className="text-orange-400" />,
      command: "git commit -m",
    },
    {
      id: 7,
      name: "Jira",
      category: "Project Management",
      description: "Issue tracking and project management",
      icon: <MessageSquare className="text-blue-400" />,
      command: "jira create issue",
    },
    {
      id: 8,
      name: "Vim",
      category: "Editor",
      description: "Highly configurable text editor",
      icon: <Terminal className="text-green-400" />,
      command: "vim file.txt",
    },
    {
      id: 9,
      name: "Claude AI / ChatGPT",
      category: "AI Assistant",
      description: "Advanced AI language models",
      icon: <Code className="text-purple-400" />,
      command: "ai prompt",
    },
    {
      id: 10,
      name: "Kubernetes",
      category: "DevOps",
      description: "Container orchestration platform",
      icon: <Boxes className="text-blue-500" />,
      command: "kubectl apply -f",
    },
    {
      id: 11,
      name: "Docker",
      category: "DevOps",
      description: "Containerization platform for deployment",
      icon: <Container className="text-blue-400" />,
      command: "docker run -p",
    },
    {
      id: 12,
      name: "CI/CD",
      category: "DevOps",
      description: "Continuous integration and deployment",
      icon: <GitPullRequest className="text-green-500" />,
      command: "pipeline run",
    },
    {
      id: 13,
      name: "ArchLinux",
      category: "OS",
      description: "Lightweight and flexible Linux distribution",
      icon: <Terminal className="text-blue-400" />,
      command: "pacman -Syu",
    },
    {
      id: 14,
      name: "Prometheus",
      category: "Monitoring",
      description: "Time series database for metrics monitoring",
      icon: <BarChart3 className="text-orange-500" />,
      command: "prometheus --config.file=prometheus.yml",
    },
    {
      id: 15,
      name: "Grafana",
      category: "Monitoring",
      description: "Visualization and analytics platform",
      icon: <LineChart className="text-blue-500" />,
      command: "grafana-server",
    },
    {
      id: 16,
      name: "OpenTelemetry",
      category: "Observability",
      description: "Observability framework for metrics, logs, and traces",
      icon: <Activity className="text-green-500" />,
      command: "otelcol --config=config.yaml",
    },
    {
      id: 17,
      name: "Grafana Tempo",
      category: "Observability",
      description: "Distributed tracing backend",
      icon: <Network className="text-purple-500" />,
      command: "tempo -config.file=tempo.yaml",
    },
    {
      id: 18,
      name: "Grafana Loki",
      category: "Observability",
      description: "Log aggregation system",
      icon: <Monitor className="text-yellow-500" />,
      command: "loki -config.file=loki.yaml",
    },
  ];

  // Filter tools based on search term and category
  const filteredTools = useMemo(() => {
    return tools.filter((tool) => {
      const matchesSearch =
        tool.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        tool.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory =
        selectedCategory === "" || tool.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchTerm, selectedCategory, tools]);

  // Get unique categories for filter pills
  const categories = Array.from(new Set(tools.map((tool) => tool.category)));

  return (
    <section
      id="tools"
      className="py-20 bg-gray-950 text-white relative overflow-hidden"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-green-400/10 to-blue-400/10"></div>
      </div>

      <div className="max-w-4xl mx-auto px-6 lg:px-8 relative">
        <div className="mb-8">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 font-mono">
            <span className="text-gray-500">{"<"}</span>
            <span className="text-green-400">Developer</span>
            <span className="text-white">Tools</span>
            <span className="text-gray-500">{">"}</span>
          </h2>

          <p className="text-gray-400 text-lg font-mono">
            <span className="text-gray-500">/* </span>
            Technologies and tools I use to build amazing digital experiences
            <span className="text-gray-500"> */</span>
          </p>
        </div>

        {/* Search and Filter */}
        <div className="mb-8 bg-gray-900 rounded-lg border border-gray-800 p-6">
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            {/* Search Input */}
            <div className="relative flex-grow">
              <Search
                size={18}
                className={`absolute left-3 top-1/2 transform -translate-y-1/2 transition-colors duration-200 ${isSearchFocused ? "text-green-400" : "text-gray-500"
                  }`}
              />
              <Input
                type="text"
                placeholder="Search tools..."
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
            {(searchTerm || selectedCategory) && (
              <Button
                variant="outline"
                onClick={() => {
                  setSearchTerm("");
                  setSelectedCategory("");
                }}
                className="border-gray-600 text-white hover:bg-gray-900 hover:border-green-500 font-mono"
              >
                <X size={16} className="mr-2" />
                Clear Filters
              </Button>
            )}
          </div>

          {/* Category Filters */}
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Filter size={16} className="text-gray-500" />
              <span className="text-sm text-gray-400 font-mono">
                Filter by Category:
              </span>
            </div>
            <div className="flex flex-wrap gap-2">
              <Button
                variant={selectedCategory === "" ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory("")}
                className={`text-xs font-mono ${selectedCategory === ""
                    ? "bg-green-500 hover:bg-green-600 text-black"
                    : "border-gray-700 text-gray-400 hover:text-white hover:border-gray-600"
                  }`}
              >
                All
              </Button>
              {categories.map((category) => (
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

          {/* Results Count */}
          <div className="mt-4">
            <p className="text-gray-400 font-mono">
              <span className="text-green-400">{filteredTools.length}</span>{" "}
              tool{filteredTools.length !== 1 ? "s" : ""} found
              {(searchTerm || selectedCategory) && " matching your filters"}
            </p>
          </div>
        </div>

        {/* Terminal-style header */}
        <div className="bg-gray-900 rounded-t-lg border border-gray-700 border-b-0">
          <div className="flex items-center px-4 py-2 bg-gray-800 rounded-t-lg">
            <div className="flex space-x-2">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
            </div>
            <div className="ml-4 text-sm text-gray-400 font-mono">
              ~/tools/stack.js
            </div>
          </div>
        </div>

        {/* Tools Grid */}
        <div className="bg-gray-900 rounded-b-lg border border-gray-700 border-t-0 p-6">
          {filteredTools.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="text-center py-8 text-gray-400"
            >
              <p>No tools found matching your search criteria.</p>
            </motion.div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredTools.map((tool, index) => (
                <motion.div
                  key={tool.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.5,
                    delay: index * 0.1,
                    type: "spring",
                    stiffness: 100,
                  }}
                >
                  <Card
                    className={`bg-gray-900 border-gray-800 hover:border-green-500/50 transition-all duration-300 cursor-default group min-h-[180px] animate-slide-in relative overflow-hidden`}
                    style={{ animationDelay: `${index * 100}ms` }}
                    onMouseEnter={() => setHoveredTool(tool.id)}
                    onMouseLeave={() => setHoveredTool(null)}
                  >
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center space-x-3">
                          <span className="text-2xl">{tool.icon}</span>
                          <div>
                            <h3 className="text-white font-semibold group-hover:text-green-400 transition-colors duration-300">
                              {tool.name}
                            </h3>
                            <div className="mt-1">
                              <span className="inline-block bg-gray-800 text-green-400 text-xs px-2 py-1 rounded font-mono group-hover:bg-green-500/20 transition-colors duration-300">
                                {tool.category}
                              </span>
                            </div>
                          </div>
                        </div>
                        <div>
                          <Terminal
                            size={14}
                            className="text-green-400 opacity-50 group-hover:opacity-100 transition-opacity duration-300"
                          />
                        </div>
                      </div>

                      <p className="text-gray-400 text-sm mb-3 group-hover:text-gray-300 transition-colors duration-300">
                        {tool.description}
                      </p>

                      {/* No command box */}
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Floating elements removed */}
    </section>
  );
};

export default ToolsSection;
