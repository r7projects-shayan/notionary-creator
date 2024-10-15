import React, { useState } from 'react';
import { CommandPalette } from '@/components/CommandPalette';

export const MainContent = () => {
  const [title, setTitle] = useState('Untitled');
  const [content, setContent] = useState('');

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
  };

  return (
    <div className="flex-1 p-8">
      <input
        type="text"
        value={title}
        onChange={handleTitleChange}
        className="text-4xl font-bold mb-4 w-full bg-transparent border-none outline-none"
        placeholder="Untitled"
      />
      <div className="text-sm text-gray-500 mb-4">
        {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
      </div>
      <CommandPalette />
      <textarea
        value={content}
        onChange={handleContentChange}
        className="w-full h-[calc(100vh-200px)] bg-transparent border-none outline-none resize-none"
        placeholder="Type '/' for commands"
      />
    </div>
  );
};