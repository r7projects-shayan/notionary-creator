import React, { useState } from 'react';
import { FileText, Calendar, CheckSquare, Trello, Upload, Image, Video, Music, ChevronDown, ChevronRight, Plus } from 'lucide-react';

const initialPages = [
  { id: 1, name: 'Getting Started', category: 'Docs' },
  { id: 2, name: 'Project Ideas', category: 'Docs' },
  { id: 3, name: 'Weekly Schedule', category: 'Calendar' },
  { id: 4, name: 'Shopping List', category: 'To-Do List' },
  { id: 5, name: 'Project Roadmap', category: 'Kanban Board' },
];

export const Sidebar = () => {
  const [pages, setPages] = useState(initialPages);
  const [expandedCategories, setExpandedCategories] = useState<string[]>(['Docs', 'Calendar', 'To-Do List', 'Kanban Board']);

  const toggleCategory = (category: string) => {
    setExpandedCategories(prev =>
      prev.includes(category) ? prev.filter(c => c !== category) : [...prev, category]
    );
  };

  const addNewPage = (category: string) => {
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
        <a href="#" className="text-gray-700 hover:text-gray-900">{page.name}</a>
      </li>
    ));
  };

  const categoryIcons: { [key: string]: React.ElementType } = {
    Docs: FileText,
    Calendar: Calendar,
    'To-Do List': CheckSquare,
    'Kanban Board': Trello,
  };

  return (
    <div className="w-64 bg-gray-100 h-full shadow-md overflow-y-auto">
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-4">Notion Clone</h1>
        <nav>
          <ul className="space-y-2">
            {Object.keys(categoryIcons).map(category => (
              <li key={category}>
                <div className="flex items-center justify-between text-gray-700 hover:bg-gray-200 p-2 rounded cursor-pointer" onClick={() => toggleCategory(category)}>
                  <div className="flex items-center">
                    {React.createElement(categoryIcons[category], { size: 18, className: 'mr-2' })}
                    <span>{category}</span>
                  </div>
                  {expandedCategories.includes(category) ? <ChevronDown size={18} /> : <ChevronRight size={18} />}
                </div>
                {expandedCategories.includes(category) && (
                  <ul>
                    {renderPages(category)}
                    <li className="ml-6 py-1">
                      <button onClick={() => addNewPage(category)} className="text-blue-500 hover:text-blue-700 flex items-center">
                        <Plus size={14} className="mr-1" /> Add new page
                      </button>
                    </li>
                  </ul>
                )}
              </li>
            ))}
            <li><a href="#" className="flex items-center space-x-2 text-gray-700 hover:bg-gray-200 p-2 rounded"><Upload size={18} /><span>Upload Files</span></a></li>
            <li><a href="#" className="flex items-center space-x-2 text-gray-700 hover:bg-gray-200 p-2 rounded"><Image size={18} /><span>Images</span></a></li>
            <li><a href="#" className="flex items-center space-x-2 text-gray-700 hover:bg-gray-200 p-2 rounded"><Video size={18} /><span>Videos</span></a></li>
            <li><a href="#" className="flex items-center space-x-2 text-gray-700 hover:bg-gray-200 p-2 rounded"><Music size={18} /><span>Audio</span></a></li>
          </ul>
        </nav>
      </div>
    </div>
  );
};