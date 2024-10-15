import React from 'react';
import { Sidebar } from '@/components/Sidebar';
import { MainContent } from '@/components/MainContent';

const Index = () => {
  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <MainContent />
    </div>
  );
};

export default Index;