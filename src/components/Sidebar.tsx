import React from 'react';
import { FileText, Calendar, CheckSquare, Trello, Upload, Image, Video, Music } from 'lucide-react';

export const Sidebar = () => {
  return (
    <div className="w-64 bg-white h-full shadow-md">
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-4">Notion Clone</h1>
        <nav>
          <ul className="space-y-2">
            <li><a href="#" className="flex items-center space-x-2 text-gray-700 hover:bg-gray-100 p-2 rounded"><FileText size={18} /><span>Docs</span></a></li>
            <li><a href="#" className="flex items-center space-x-2 text-gray-700 hover:bg-gray-100 p-2 rounded"><Calendar size={18} /><span>Calendar</span></a></li>
            <li><a href="#" className="flex items-center space-x-2 text-gray-700 hover:bg-gray-100 p-2 rounded"><CheckSquare size={18} /><span>To-Do List</span></a></li>
            <li><a href="#" className="flex items-center space-x-2 text-gray-700 hover:bg-gray-100 p-2 rounded"><Trello size={18} /><span>Kanban Board</span></a></li>
            <li><a href="#" className="flex items-center space-x-2 text-gray-700 hover:bg-gray-100 p-2 rounded"><Upload size={18} /><span>Upload Files</span></a></li>
            <li><a href="#" className="flex items-center space-x-2 text-gray-700 hover:bg-gray-100 p-2 rounded"><Image size={18} /><span>Images</span></a></li>
            <li><a href="#" className="flex items-center space-x-2 text-gray-700 hover:bg-gray-100 p-2 rounded"><Video size={18} /><span>Videos</span></a></li>
            <li><a href="#" className="flex items-center space-x-2 text-gray-700 hover:bg-gray-100 p-2 rounded"><Music size={18} /><span>Audio</span></a></li>
          </ul>
        </nav>
      </div>
    </div>
  );
};