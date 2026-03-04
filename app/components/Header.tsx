import { useState, useEffect, useMemo } from "react";
import {
  Menu,
  X,
  Terminal,
  Code,
  BriefcaseBusiness,
  type LucideIcon,
  Wrench,
  Book,
  Contact,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link, useNavigate, useLocation } from "react-router";

interface HeaderProps { }

interface MenuNav {
  name: string;
  href: string;
  icon: LucideIcon;
}

const Header: React.FC<HeaderProps> = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Effect to handle hash navigation when coming from another page
  useEffect(() => {
    // Check if there's a hash in the URL and we're on the home page
    if (
      location.hash &&
      (location.pathname === "/" || location.pathname === "/index.html")
    ) {
      // Get the element with the hash ID
      const targetElement = document.querySelector(location.hash);

      if (targetElement) {
        // Add a small delay to ensure the page is fully loaded
        setTimeout(() => {
          targetElement.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        }, 100);
      }
    }
  }, [location]);

  // Handle smooth scrolling when clicking on navigation links
  const handleSmoothScroll = (
    e: React.MouseEvent<HTMLAnchorElement>,
    targetId: string,
  ) => {
    e.preventDefault();

    // Close mobile menu if open
    if (isMenuOpen) setIsMenuOpen(false);

    // Check if we're on the home page by looking at the current path
    const isHomePage =
      location.pathname === "/" || location.pathname === "/index.html";

    if (!isHomePage) {
      // If we're not on the home page, navigate to the home page with the hash
      navigate("/" + targetId);
      return;
    }

    // If we're already on the home page, scroll to the target element
    const targetElement = document.querySelector(targetId);

    if (targetElement) {
      // Smooth scroll to target element
      targetElement.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });

      // Update URL without page reload
      navigate(targetId, { replace: true });
    }
  };

  const menuNav = useMemo<MenuNav[]>(
    () => [
      { name: "Welcome", href: "#welcome", icon: Terminal },
      { name: "About", href: "#about", icon: Code },
      { name: "Tools", href: "#tools", icon: Wrench },
      { name: "Blog", href: "#blog", icon: Book },
      { name: "Contact", href: "#contact", icon: Contact },
    ],
    [],
  );

  return (
    <>
      {/* Fixed Header */}
      <header className="fixed top-0 w-full bg-black/90 backdrop-blur-md border-b border-gray-800 z-50">
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-between items-center h-16 px-6 lg:px-8">
            <Link to="/" className="flex items-center space-x-2 group">
              <Terminal
                className="text-green-400 transition-colors duration-300"
                size={20}
              />
              <div className="text-xl font-semibold text-white font-mono">
                <span className="text-gray-500">{"<"}</span>
                <span className="text-green-400">budihastomo</span>
                <span className="text-white">.dev</span>
                <span className="text-gray-500">{"/"}</span>
                <span className="text-gray-500">{">"}</span>
              </div>
            </Link>

            <div className="flex items-center gap-4">
              {/* Available For Work Badge */}
              <div className="hidden md:flex items-center">
                <a
                  href="#contact"
                  onClick={(e) => handleSmoothScroll(e, "#contact")}
                  className="px-3 py-1 bg-green-500/20 text-green-400 text-xs font-medium rounded-full border border-green-500/30 hover:bg-green-500/30 hover:border-green-500/50 transition-all duration-300 cursor-pointer flex items-center gap-1.5 justify-center"
                >
                  <BriefcaseBusiness className="w-3 h-3 animate-pulse" />
                  <span>Available For Work</span>
                </a>
              </div>

              {/* Mobile menu button */}
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden text-white hover:bg-gray-800"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
              </Button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <nav className="md:hidden p-4 border-t border-gray-800 bg-gray-900/50 backdrop-blur-sm animate-fade-in">
              {/* Available For Work Badge - Mobile */}
              <div className="mb-3 flex justify-center">
                <a
                  href="#contact"
                  onClick={(e) => handleSmoothScroll(e, "#contact")}
                  className="px-3 py-1 bg-green-500/20 text-green-400 text-xs font-medium rounded-full border border-green-500/30 hover:bg-green-500/30 hover:border-green-500/50 transition-all duration-300 cursor-pointer flex items-center gap-1.5 justify-center"
                >
                  <BriefcaseBusiness className="w-3 h-3 animate-pulse" />
                  <span>Available For Work</span>
                </a>
              </div>
              <div className="flex flex-col space-y-3">
                {menuNav.map(({ name, href, icon: Icon }, index) => (
                  <a
                    href={href}
                    className="flex items-center text-gray-300 group hover:text-green-400 transition-colors duration-200 text-sm font-mono group"
                    onClick={(e) => handleSmoothScroll(e, href)}
                  >
                    <Icon
                      className="mr-2 transition-colors duration-200"
                      size={16}
                    />
                    <span className="text-gray-500">
                      {String(index + 1).padStart(2, "0")}.
                    </span>{" "}
                    {name}()
                  </a>
                ))}
              </div>
            </nav>
          )}
        </div>
      </header>

      {/* Floating Navigation - Desktop */}
      <nav
        className={`hidden md:block fixed bottom-6 left-1/2 transform -translate-x-1/2 z-40 transition-all duration-500 ${isScrolled ? "translate-y-0 opacity-100" : "translate-y-0 opacity-100"
          }`}
      >
        <div className="bg-gray-900/90 backdrop-blur-md border border-gray-700/50 rounded-full px-6 py-3 transition-all duration-300">
          <div className="flex items-center space-x-6">
            {menuNav.map(({ name, href, icon: Icon }, index) => (
              <a
                href={href}
                className="flex items-center text-gray-300 hover:text-green-400 transition-all duration-300 text-sm font-mono group"
                onClick={(e) => handleSmoothScroll(e, href)}
              >
                <Icon
                  className="mr-2 transition-colors duration-200"
                  size={16}
                />
                <span className="text-gray-500">
                  {String(index + 1).padStart(2, "0")}.
                </span>{" "}
                {name.toLowerCase()}()
              </a>
            ))}
          </div>
        </div>
      </nav>
    </>
  );
};

export default Header;
