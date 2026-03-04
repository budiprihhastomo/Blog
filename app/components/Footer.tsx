import {
  Mail,
  MapPin,
  Github,
  Linkedin,
  Twitter,
  Terminal,
  Code,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const Footer = () => {
  return (
    <footer
      id="contact"
      className="bg-black text-white py-16 border-t border-gray-800"
    >
      <div className="max-w-4xl mx-auto px-6 lg:px-8">
        <div className="mb-12">
          <div className="bg-gray-900 rounded-lg border border-gray-700 p-4 mb-6">
            <div className="font-mono text-sm">
              <span className="text-green-400">// Contact Information</span>
              <br />
              <span className="text-blue-400">const</span>{" "}
              <span className="text-white">contact</span> = {"{"}
              <br />
              <span className="ml-4 text-red-400">status</span>:{" "}
              <span className="text-yellow-400">
                "Available for some projects"
              </span>
              ,
              <br />
              <span className="ml-4 text-red-400">response_time</span>:{" "}
              <span className="text-yellow-400">"&lt; 24h"</span>
              <br />
              {"}"}
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-12 mb-12">
          <div>
            <div className="flex items-center mb-6">
              <Terminal className="mr-2 text-green-400" size={18} />
              <h3 className="text-xl font-semibold font-mono">
                get_in_touch()
              </h3>
            </div>
            <div className="space-y-4 mb-6 font-mono">
              <div className="flex items-center text-gray-300">
                <Mail size={18} className="mr-3 text-green-400" />
                <span className="text-sm">budi@oxycreative.com</span>
              </div>
              <div className="flex items-center text-gray-300">
                <MapPin size={18} className="mr-3 text-green-400" />
                <span className="text-sm">Jakarta, Indonesia</span>
              </div>
            </div>

            <p className="text-gray-400 text-sm leading-relaxed font-mono">
              <span className="text-gray-500">/* </span>
              Feel free to reach out for collaborations, discussions about
              technology, web development, or any interesting projects!
              <span className="text-gray-500"> */</span>
            </p>
          </div>

          <div>
            <div className="flex items-center mb-6">
              <Code className="mr-2 text-green-400" size={18} />
              <h3 className="text-xl font-semibold font-mono">
                social_links[]
              </h3>
            </div>
            <div className="flex space-x-4 mb-6">
              <Button
                size="icon"
                variant="outline"
                className="border-gray-600 hover:bg-gray-900 hover:border-green-500 transition-colors"
              >
                <Github size={18} className="text-white" />
              </Button>
              <Button
                size="icon"
                variant="outline"
                className="border-gray-600 hover:bg-gray-900 hover:border-green-500 transition-colors"
              >
                <Linkedin size={18} className="text-white" />
              </Button>
              <Button
                size="icon"
                variant="outline"
                className="border-gray-600 hover:bg-gray-900 hover:border-green-500 transition-colors"
              >
                <Twitter size={18} className="text-white" />
              </Button>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8">
          <div className="bg-gray-900 rounded-lg border border-gray-700 p-4">
            <div className="font-mono text-sm text-center">
              <span className="text-gray-500">// Built with</span>{" "}
              <span className="text-blue-400">React</span>{" "}
              <span className="text-gray-500">+</span>{" "}
              <span className="text-blue-400">Tailwind CSS</span>{" "}
              <span className="text-gray-500">+</span>{" "}
              <span className="text-red-400">❤️</span>
              <br />
              <span className="text-gray-500">
                © {new Date().getFullYear()} Budi Prih Hastomo. Handcrafted by
                developer.
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
