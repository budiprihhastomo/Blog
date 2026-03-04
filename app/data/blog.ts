export interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  category: string;
  filename: string;
  tags: string[];
}

export const blogPosts: BlogPost[] = [
  {
    id: 1,
    title: "Building Modern Websites with React and Tailwind CSS",
    excerpt:
      "Complete guide to start developing modern websites using React and Tailwind CSS. Learn best practices and important tips.",
    date: "Dec 15, 2024",
    readTime: "5 min",
    category: "Development",
    filename: "react-tailwind-guide.md",
    tags: ["React", "Tailwind CSS", "JavaScript", "Web Development"],
  },
  {
    id: 2,
    title: "Website Performance Optimization Tips for Developers",
    excerpt:
      "Various techniques and strategies to improve your website performance. From lazy loading to code splitting.",
    date: "Dec 12, 2024",
    readTime: "7 min",
    category: "Performance",
    filename: "performance-optimization.md",
    tags: ["Performance", "Web Development", "Optimization"],
  },
  {
    id: 3,
    title: "Remote Work Experience as a Developer",
    excerpt:
      "Sharing experiences and tips for developers working remotely. How to stay productive and maintain work-life balance.",
    date: "Dec 10, 2024",
    readTime: "4 min",
    category: "Career",
    filename: "remote-work-tips.md",
    tags: ["Remote Work", "Career", "Productivity"],
  },
  {
    id: 4,
    title: "Introduction to TypeScript for JavaScript Developers",
    excerpt:
      "Learn the basics of TypeScript and how it can improve your JavaScript development experience with static typing.",
    date: "Dec 5, 2024",
    readTime: "6 min",
    category: "Development",
    filename: "typescript-intro.md",
    tags: ["TypeScript", "JavaScript", "Web Development"],
  },
  {
    id: 5,
    title: "Building a RESTful API with Node.js and Express",
    excerpt:
      "Step-by-step guide to create a robust RESTful API using Node.js and Express framework with best practices.",
    date: "Nov 28, 2024",
    readTime: "8 min",
    category: "Backend",
    filename: "nodejs-rest-api.md",
    tags: ["Node.js", "Express", "API", "Backend"],
  },
  {
    id: 6,
    title: "State Management in React with Context API and Hooks",
    excerpt:
      "Modern approach to state management in React applications using Context API and React Hooks.",
    date: "Nov 20, 2024",
    readTime: "7 min",
    category: "Development",
    filename: "react-state-management.md",
    tags: ["React", "Context API", "Hooks", "State Management"],
  },
];

export const featuredBlogPosts = blogPosts.slice(0, 3);

export const allCategories = [...new Set(blogPosts.map((post) => post.category))];
export const allTags = [...new Set(blogPosts.flatMap((post) => post.tags))];
