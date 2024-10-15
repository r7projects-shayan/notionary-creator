import React, { useState } from 'react';
import { Sidebar } from '@/components/Sidebar';
import { MainContent } from '@/components/MainContent';

const Index = () => {
  const [currentPage, setCurrentPage] = useState({ name: 'Home' });

  const handlePageSelect = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar onPageSelect={handlePageSelect} />
      <MainContent currentPage={currentPage} />
    </div>
  );
};

export default Index;