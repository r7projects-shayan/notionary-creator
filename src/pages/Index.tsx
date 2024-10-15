import React, { useState } from 'react';
import { Sidebar } from '@/components/Sidebar';
import { MainContent } from '@/components/MainContent';

const Index = () => {
  const [currentPage, setCurrentPage] = useState({ name: 'Home' });
  const [isDarkMode, setIsDarkMode] = useState(false);

  const handlePageSelect = (page) => {
    setCurrentPage(page);
  };

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar onPageSelect={handlePageSelect} isDarkMode={isDarkMode} />
      <MainContent currentPage={currentPage} isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />
    </div>
  );
};

export default Index;