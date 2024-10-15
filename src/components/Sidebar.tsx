import React, { useState } from 'react';
import { FileText, Home, Settings, ChevronDown, ChevronRight, Plus } from 'lucide-react';

export const Sidebar = ({ onPageSelect, isDarkMode }) => {
  const [pages, setPages] = useState([
    { id: 1, name: 'Getting Started', category: 'Work' },
    { id: 2, name: 'Project Ideas', category: 'Personal' },
  ]);
  const [expandedCategories, setExpandedCategories] = useState<string[]>(['Work', 'Personal']);

  const toggleCategory = (category: string) => {
    setExpandedCategories(prev =>
      prev.includes(category) ? prev.filter(c => c !== category) : [...prev, category]
    );
  };

  const addNewPage = (category: string) => {
    if (pages.length >= 10) {
      alert("You've reached the maximum number of free pages. Please subscribe to our premium plan to create more pages.");
      return;
    }
    const newPage = {
      id: pages.length + 1,
      name: `New Page ${pages.length + 1}`,
      category,
    };
    setPages([...pages, newPage]);
  };

  const renderPages = (category: string) => {
    return pages.filter(page => page.category === category).map(page => (
      <li key={page.id} className="ml-6 py-1">
        <a href="#" className={`text-gray-700 hover:text-gray-900 ${isDarkMode ? 'dark:text-gray-300 dark:hover:text-gray-100' : ''}`} onClick={() => onPageSelect(page)}>{page.name}</a>
      </li>
    ));
  };

  const categories = Array.from(new Set(pages.map(page => page.category)));

  return (
    <div className={`w-64 h-full shadow-md overflow-y-auto ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-gray-100'}`}>
      <div className="p-4">
        <h1 className={`text-2xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-black'}`}>Notion Clone</h1>
        <nav>
          <ul className="space-y-2">
            <li><a href="#" className={`flex items-center space-x-2 ${isDarkMode ? 'text-gray-300 hover:text-gray-100' : 'text-gray-700 hover:text-gray-900'} p-2 rounded`} onClick={() => onPageSelect({ name: 'Home' })}><Home size={18} /><span>Home</span></a></li>
            {categories.map(category => (
              <li key={category}>
                <div className={`flex items-center justify-between ${isDarkMode ? 'text-gray-300 hover:text-gray-100' : 'text-gray-700 hover:bg-gray-200'} p-2 rounded cursor-pointer`} onClick={() => toggleCategory(category)}>
                  <div className="flex items-center">
                    <FileText size={18} className="mr-2" />
                    <span>{category}</span>
                  </div>
                  {expandedCategories.includes(category) ? <ChevronDown size={18} /> : <ChevronRight size={18} />}
                </div>
                {expandedCategories.includes(category) && (
                  <ul>
                    {renderPages(category)}
                    <li className="ml-6 py-1">
                      <button onClick={() => addNewPage(category)} className={`text-blue-500 hover:text-blue-700 flex items-center ${isDarkMode ? 'dark:text-blue-400 dark:hover:text-blue-300' : ''}`}>
                        <Plus size={14} className="mr-1" /> Add new page
                      </button>
                    </li>
                  </ul>
                )}
              </li>
            ))}
            <li><a href="#" className={`flex items-center space-x-2 ${isDarkMode ? 'text-gray-300 hover:text-gray-100' : 'text-gray-700 hover:text-gray-900'} p-2 rounded`} onClick={() => onPageSelect({ name: 'Settings' })}><Settings size={18} /><span>Settings</span></a></li>
          </ul>
        </nav>
      </div>
    </div>
  );
};