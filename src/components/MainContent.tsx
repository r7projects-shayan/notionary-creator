import React, { useState, useRef, useEffect } from 'react';
import { CommandPalette } from '@/components/CommandPalette';
import { Moon, Sun } from 'lucide-react';
import { TodoList } from '@/components/TodoList';
import { Calendar } from '@/components/Calendar';
import { KanbanBoard } from '@/components/KanbanBoard';
import { DrawingBoard } from '@/components/DrawingBoard';
import { Settings } from '@/components/Settings';

export const MainContent = ({ currentPage, isDarkMode, toggleDarkMode }) => {
  const [title, setTitle] = useState('Untitled');
  const [content, setContent] = useState('');
  const [showCommandPalette, setShowCommandPalette] = useState(false);
  const [cursorPosition, setCursorPosition] = useState({ top: 0, left: 0 });
  const contentRef = useRef<HTMLTextAreaElement>(null);

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
    if (e.target.value.endsWith('/')) {
      const rect = e.target.getBoundingClientRect();
      const lineHeight = parseInt(window.getComputedStyle(e.target).lineHeight);
      const lines = e.target.value.substr(0, e.target.selectionStart).split('\n');
      const currentLineNumber = lines.length - 1;
      setCursorPosition({
        top: rect.top + currentLineNumber * lineHeight - e.target.scrollTop,
        left: rect.left + e.target.selectionStart * 8 - e.target.scrollLeft, // Assuming monospace font
      });
      setShowCommandPalette(true);
    } else {
      setShowCommandPalette(false);
    }
  };

  const handleCommandSelect = (command: string) => {
    setShowCommandPalette(false);
    let newContent = content.slice(0, -1); // Remove the '/'
    switch (command) {
      case 'Calendar':
      case 'To-Do List':
      case 'Draw Board':
      case 'Notes':
        newContent += `[${command}]\n`;
        break;
      case 'Date':
        newContent += new Date().toLocaleDateString();
        break;
      case 'Time':
        newContent += new Date().toLocaleTimeString();
        break;
      case 'H1':
      case 'H2':
      case 'H3':
        newContent += `\n${command} `;
        break;
      case 'Paragraph':
        newContent += '\n';
        break;
      case 'List':
      case 'Numbered List':
      case 'Bulleted List':
      case 'Arrow List':
        newContent += `\n- `;
        break;
      case 'Code Snippet':
        newContent += '\n```\n\n```';
        break;
      default:
        newContent += command;
    }
    setContent(newContent);
  };

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle('dark');
  };

  useEffect(() => {
    if (contentRef.current) {
      contentRef.current.focus();
      contentRef.current.setSelectionRange(content.length, content.length);
    }
  }, [content]);

  const renderComponent = (componentName: string) => {
    switch (componentName) {
      case 'To-Do List':
        return <TodoList />;
      case 'Calendar':
        return <Calendar />;
      case 'Kanban Board':
        return <KanbanBoard />;
      case 'Draw Board':
        return <DrawingBoard />;
      default:
        return null;
    }
  };

  const renderPageContent = () => {
    if (currentPage.name === 'Settings') {
      return <Settings />;
    }

    return (
      <>
        <div className="relative">
          <textarea
            ref={contentRef}
            value={content}
            onChange={handleContentChange}
            className="w-full min-h-[calc(100vh-200px)] bg-transparent border-none outline-none resize-none"
            placeholder="Type '/' for commands"
          />
          {showCommandPalette && (
            <div style={{ position: 'absolute', top: cursorPosition.top, left: cursorPosition.left }}>
              <CommandPalette onSelect={handleCommandSelect} />
            </div>
          )}
        </div>
        {content.split('\n').map((line, index) => {
          const match = line.match(/\[(.*?)\]/);
          if (match) {
            const componentName = match[1];
            return (
              <div key={index} className="my-4">
                {renderComponent(componentName)}
              </div>
            );
          }
          return null;
        })}
      </>
    );
  };

  return (
    <div className={`flex-1 p-8 ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-white text-black'}`}>
      <div className="flex justify-between items-center mb-4">
        <input
          type="text"
          value={title}
          onChange={handleTitleChange}
          className={`text-4xl font-bold w-full bg-transparent border-none outline-none ${isDarkMode ? 'text-white' : 'text-black'}`}
          placeholder="Untitled"
        />
        <button onClick={toggleDarkMode} className={`p-2 rounded-full ${isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-200'}`}>
          {isDarkMode ? <Sun size={24} /> : <Moon size={24} />}
        </button>
      </div>
      <div className="text-sm text-gray-500 mb-4">
        {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
      </div>
      {renderPageContent()}
    </div>
  );
};
