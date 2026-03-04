import { useState, useEffect } from "react";
import { Terminal, Code } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router";

const roles = ['Frontend Developer"', 'Backend Developer"', 'DevOps Engineer"'];

const Hero = () => {
  const [currentRoleIndex, setCurrentRoleIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingSpeed, setTypingSpeed] = useState(150);

  useEffect(() => {
    const currentRole = roles[currentRoleIndex];

    const timer = setTimeout(() => {
      if (!isDeleting) {
        // Typing
        if (displayText.length < currentRole.length) {
          setDisplayText(currentRole.substring(0, displayText.length + 1));
          setTypingSpeed(100);
        } else {
          // Pause at the end of typing before deleting
          setIsDeleting(true);
          setTypingSpeed(1000);
        }
      } else {
        // Deleting
        if (displayText.length > 0) {
          setDisplayText(currentRole.substring(0, displayText.length - 1));
          setTypingSpeed(50);
        } else {
          // Move to next role
          setIsDeleting(false);
          setCurrentRoleIndex((currentRoleIndex + 1) % roles.length);
          setTypingSpeed(300);
        }
      }
    }, typingSpeed);

    return () => clearTimeout(timer);
  }, [displayText, isDeleting, currentRoleIndex, roles, typingSpeed]);
  const navigate = useNavigate();

  return (
    <section
      id="welcome"
      className="min-h-screen flex flex-col justify-center items-start px-6 lg:px-8 bg-black text-white relative"
    >
      <div className="max-w-4xl mx-auto w-full">
        <div className="animate-fade-in">
          {/* Terminal-like header */}
          <div className="mb-8 bg-gray-900 rounded-lg border border-gray-700 overflow-hidden">
            <div className="flex items-center px-4 py-2 bg-gray-800 border-b border-gray-700">
              <div className="flex space-x-2">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
              </div>
              <div className="ml-4 text-sm text-gray-400 font-mono">
                ~/portfolio
              </div>
            </div>
            <div className="p-6 font-mono text-sm">
              <div className="text-green-400">
                <span className="text-gray-500">$</span> node whoami.js
              </div>
              <div className="mt-2 text-white">
                <span className="text-blue-400">const</span> developer = {"{"}
              </div>
              <div className="ml-4 text-white">
                <span className="text-red-400">name</span>:{" "}
                <span className="text-yellow-400">"Budi Prih Hastomo"</span>,
              </div>
              <div className="ml-4 text-white">
                <span className="text-red-400">role</span>:{" "}
                <span className="inline-flex">
                  <span className="text-yellow-400 min-w-[220px] inline-block">
                    "{displayText}
                    <span
                      className={`text-yellow-400 inline-block w-2 h-4 bg-yellow-400 ml-0.5 animate-cursor-blink`}
                    ></span>
                  </span>
                </span>
              </div>
              <div className="ml-4 text-white">
                <span className="text-red-400">passion</span>:{" "}
                <span className="text-yellow-400">
                  "Driven by innovation and problem-solving, I thrive on
                  architecting scalable web solutions with cutting-edge
                  technologies. My commitment to clean code, performance
                  optimization, and user-centric design creates digital
                  experiences that make a difference."
                </span>
              </div>
              <div className="text-white">{"}"}</div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <Button
              asChild
              className="bg-green-500 text-black hover:bg-green-400 font-mono"
            >
              <a
                href="#about"
                onClick={(e) => {
                  e.preventDefault();
                  navigate("/#about");
                  document
                    .getElementById("about")
                    ?.scrollIntoView({ behavior: "smooth" });
                }}
              >
                <Code className="mr-2" size={16} />
                ./about.sh
              </a>
            </Button>
            <Button
              variant="outline"
              className="border-gray-600 text-white hover:bg-gray-900 hover:border-green-500 font-mono"
              asChild
            >
              <a
                href="#blog"
                onClick={(e) => {
                  e.preventDefault();
                  navigate("/#blog");
                  document
                    .getElementById("blog")
                    ?.scrollIntoView({ behavior: "smooth" });
                }}
              >
                <Terminal className="mr-2" size={16} />
                cat blog.md
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
