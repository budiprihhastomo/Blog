import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { lazy, useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./components/ui/tooltip";
import { Toaster as Sonner, Toaster } from "@/components/ui/sonner";
import Header from "./components/Header";
import AIAgentModal from "./components/AIAgentModal";
import { Button } from "./components/ui/button";

const ThemeProvider = lazy(() => import("./components/ThemeProvider"));

const queryClient = new QueryClient();

export default function App() {
  const location = useLocation();
  const [isAIAgentOpen, setIsAIAgentOpen] = useState(false);

  // Scroll to top when location changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <ThemeProvider defaultTheme="dark" storageKey="theme">
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Toaster />
          <Sonner />

          <main className="min-h-screen">
            {/* Header */}
            <Header />

            <Outlet />

            {/* AI Agent Modal */}
            <AIAgentModal
              open={isAIAgentOpen}
              onOpenChange={setIsAIAgentOpen}
            />

            {/* AI Agent Floating Button */}
            <div className="fixed right-6 bottom-6 z-50 transition-opacity duration-300">
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    className="w-14 h-14 rounded-full bg-green-500 text-white flex items-center justify-center transition-all"
                    onClick={() => setIsAIAgentOpen(true)}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="w-6 h-6"
                    >
                      <path d="M12 8V4H8" />
                      <rect width="16" height="12" x="4" y="8" rx="2" />
                      <path d="m9 15 2 2 4-4" />
                    </svg>
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="left">Chat with AI Agent</TooltipContent>
              </Tooltip>
            </div>
          </main>
        </TooltipProvider>
      </QueryClientProvider>
    </ThemeProvider>
  );
}
