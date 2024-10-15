import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";
import { Sidebar } from "./components/Sidebar";
import { MainContent } from "./components/MainContent";

const queryClient = new QueryClient();

const App = () => {
  const [currentPage, setCurrentPage] = useState({ name: 'Home' });
  const [isDarkMode, setIsDarkMode] = useState(false);

  const handlePageSelect = (page) => {
    setCurrentPage(page);
  };

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <div className="flex h-screen">
          <Sidebar onPageSelect={handlePageSelect} isDarkMode={isDarkMode} />
          <MainContent currentPage={currentPage} isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />
        </div>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;