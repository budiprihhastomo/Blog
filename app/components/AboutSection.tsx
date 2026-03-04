import React, { useState, useEffect, useRef } from "react";
import {
  MapPin,
  Mail,
  Download,
  ExternalLink,
  Code,
  Terminal,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const AboutSection = () => {
  const [scriptExecuted, setScriptExecuted] = useState(false);
  const [showAbout, setShowAbout] = useState(false);
  const [loadingText, setLoadingText] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  const [animationStarted, setAnimationStarted] = useState(false);
  const [typingCompleted, setTypingCompleted] = useState(false);

  const sectionRef = useRef(null);

  useEffect(() => {
    // Create intersection observer to detect when section is in viewport
    const observer = new IntersectionObserver(
      ([entry]) => {
        // Update visibility state
        setIsVisible(entry.isIntersecting);

        // Start animation only once when section becomes visible
        if (entry.isIntersecting && !animationStarted) {
          setAnimationStarted(true);
        }
      },
      {
        root: null, // viewport
        rootMargin: "0px",
        threshold: 0.2, // Trigger when 20% of the element is visible
      },
    );

    // Start observing the section
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, [animationStarted]);

  // We don't need to reset animation states when section is no longer visible
  // Animation will only start once when the section becomes visible for the first time

  // Start animations only when section is visible and animation should start
  useEffect(() => {
    // Only run animation if section is visible and animation should start, but hasn't completed yet
    if (!isVisible || !animationStarted || typingCompleted) return;

    // Simulate loading text typing
    const loadingMessage =
      "./load-developer-profile --with-experience --verbose";
    let currentIndex = 0;

    // Start typing animation
    const typingInterval = setInterval(() => {
      if (currentIndex <= loadingMessage.length) {
        setLoadingText(loadingMessage.substring(0, currentIndex));
        currentIndex++;
      } else {
        clearInterval(typingInterval);
        // Mark typing as completed - this will trigger the next useEffect
        setTypingCompleted(true);
      }
    }, 20);

    return () => {
      clearInterval(typingInterval);
    };
  }, [isVisible, animationStarted, typingCompleted]);

  // Efek terpisah untuk menampilkan konten about setelah animasi pengetikan selesai
  useEffect(() => {
    if (typingCompleted) {
      // Tunggu sebentar setelah animasi pengetikan selesai
      const scriptTimer = setTimeout(() => {
        setScriptExecuted(true);

        // Tunggu lagi sebelum menampilkan konten about
        const aboutTimer = setTimeout(() => {
          setShowAbout(true);
        }, 800); // Delay untuk menampilkan about section

        return () => clearTimeout(aboutTimer);
      }, 500); // Delay untuk menampilkan pesan sukses

      return () => clearTimeout(scriptTimer);
    }
  }, [typingCompleted]);

  const experiences = [
    {
      company: "Oxy Creative Inc.",
      position: "Software Engineer",
      period: "2021 - Present",
      description:
        "Leading frontend development team for modern web applications using React and TypeScript.",
      stack: ["React", "TypeScript", "Next.js"],
    },
    {
      company: "PT. Djelas Tandatangan Bersama",
      position: "Senior System Engineer",
      period: "2022 - 2024",
      description:
        "Developed full-stack web applications for various clients using modern technologies.",
      stack: ["Node.js", "React", "MongoDB"],
    },
    {
      company: "PT. Allbest Solusi System",
      position: "Frontend Engineer",
      period: "2020 - 2021",
      description:
        "Contributed to digital product development and learned various web development technologies.",
      stack: ["JavaScript", "Vue.js", "PHP"],
    },
  ];

  return (
    <section ref={sectionRef} id="about" className="py-20 bg-black text-white">
      <div className="max-w-4xl mx-auto px-6 lg:px-8">
        <div className="mb-16">
          {!scriptExecuted && (
            <div className="bg-gray-900 rounded-lg border border-gray-700 p-4 mb-6 overflow-hidden">
              <div className="font-mono text-sm">
                <span className="text-gray-500 block"># About Me Script</span>
                <div className="flex items-center">
                  <div className="relative ml-1 overflow-hidden leading-none">
                    <span
                      className="text-yellow-400 inline-block whitespace-nowrap overflow-hidden"
                      style={{ width: loadingText ? "auto" : "0" }}
                    >
                      {loadingText}
                    </span>
                    <span
                      className={`text-yellow-400 inline-block w-2 h-4 bg-yellow-400 ml-0.5 animate-cursor-blink`}
                    ></span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {scriptExecuted && (
            <div
              className={`transition-all duration-500 ${showAbout ? "opacity-100 transform translate-y-0" : "opacity-0 transform translate-y-4"}`}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4 font-mono">
                <span className="text-gray-500">{"<"}</span>
                <span className="text-green-400">About</span>
                <span className="text-gray-500">{">"}</span>
              </h2>
              <p className="text-gray-400 text-lg font-mono">
                <span className="text-gray-500">/* </span>
                Code alchemist brewing React & TypeScript solutions, 5+ years
                transforming caffeine into elegant problem-solving code
                <span className="text-gray-500"> */</span>
              </p>
            </div>
          )}
        </div>

        {scriptExecuted && (
          <div
            className={`grid lg:grid-cols-3 gap-12 transition-all duration-500 ${showAbout ? "opacity-100 transform translate-y-0" : "opacity-0 transform translate-y-8"}`}
            style={{ transitionDelay: "0.2s" }}
          >
            {/* Profile Info */}
            <div className="lg:col-span-1 space-y-8">
              <Card className="bg-gray-900 border-gray-800">
                <CardContent className="p-6">
                  <div className="space-y-4 mb-6 font-mono text-sm">
                    <div className="flex items-center text-gray-300">
                      <MapPin size={18} className="mr-3 text-green-400" />
                      <span className="text-yellow-400">
                        "Jakarta, Indonesia"
                      </span>
                    </div>
                    <div className="flex items-center text-gray-300">
                      <Mail size={18} className="mr-3 text-green-400" />
                      <span className="text-yellow-400">
                        "budi@oxycreative.com"
                      </span>
                    </div>
                  </div>

                  <p className="text-gray-300 text-sm leading-relaxed mb-6 font-mono">
                    <span className="text-gray-500">/* </span>
                    I'm a developer obsessed with clean code and user
                    experience. With 5+ years of experience, I've built
                    everything from company websites to complex web apps with
                    modern architecture.
                    <span className="text-gray-500"> */</span>
                  </p>

                  <div className="flex flex-col gap-3">
                    <Button className="bg-green-500 text-black hover:bg-green-400 font-mono">
                      <Download size={16} className="mr-2" />
                      ./download-cv.sh
                    </Button>
                    <Button
                      variant="outline"
                      className="border-gray-600 text-white hover:bg-gray-900 hover:border-green-500 font-mono"
                    >
                      <ExternalLink size={16} className="mr-2" />
                      open linkedin
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Experience */}
            <div className="lg:col-span-2">
              <div className="flex items-center mb-6">
                <Terminal className="mr-2 text-green-400" size={20} />
                <h3 className="text-xl font-semibold font-mono">
                  work_experience.log
                </h3>
              </div>
              <div className="space-y-6">
                {experiences.map((exp, index) => (
                  <Card
                    key={index}
                    className="bg-gray-900 border-gray-800 hover:border-green-500/50 transition-colors"
                  >
                    <CardContent className="p-6">
                      <div className="mb-3 font-mono text-xs text-green-400">
                        [LOG] {exp.period}
                      </div>
                      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-3">
                        <div>
                          <h4 className="text-lg font-semibold text-white font-mono">
                            {exp.position}
                          </h4>
                          <p className="text-gray-400 font-medium">
                            @ {exp.company}
                          </p>
                        </div>
                      </div>
                      <p className="text-gray-300 text-sm mb-3">
                        {exp.description}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {exp.stack.map((tech, techIndex) => (
                          <span
                            key={techIndex}
                            className="bg-gray-800 text-green-400 px-2 py-1 rounded text-xs font-mono"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default AboutSection;
