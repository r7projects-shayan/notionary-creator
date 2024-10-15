import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";
import { Sidebar } from "./components/Sidebar";
import { MainContent } from "./components/MainContent";

const queryClient = new QueryClient();

const App = () => {
  const [currentPage, setCurrentPage] = useState({ name: 'Home' });

  const handlePageSelect = (page) => {
    setCurrentPage(page);
  };

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <div className="flex h-screen">
          <Sidebar onPageSelect={handlePageSelect} />
          <MainContent currentPage={currentPage} />
        </div>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;