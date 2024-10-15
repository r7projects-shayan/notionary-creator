import React, { useState } from 'react';
import { Calendar, CheckSquare, Edit3, Clock, FileText, Layout, List, Type, Code } from 'lucide-react';

const commands = [
  { name: 'Calendar', icon: Calendar },
  { name: 'To-Do List', icon: CheckSquare },
  { name: 'Draw Board', icon: Edit3 },
  { name: 'Date', icon: Calendar },
  { name: 'Time', icon: Clock },
  { name: 'Notes', icon: FileText },
  { name: 'H1', icon: Type },
  { name: 'H2', icon: Type },
  { name: 'H3', icon: Type },
  { name: 'Paragraph', icon: Type },
  { name: 'List', icon: List },
  { name: 'Numbered List', icon: List },
  { name: 'Bulleted List', icon: List },
  { name: 'Arrow List', icon: List },
  { name: 'Code Snippet', icon: Code },
];

export const CommandPalette = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState('');

  const filteredCommands = commands.filter((command) =>
    command.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="relative">
      <input
        type="text"
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
          setIsOpen(true);
        }}
        onFocus={() => setIsOpen(true)}
        onBlur={() => setTimeout(() => setIsOpen(false), 200)}
        className="w-full p-2 border border-gray-300 rounded"
        placeholder="Type '/' for commands"
      />
      {isOpen && (
        <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded shadow-lg">
          {filteredCommands.map((command) => (
            <div
              key={command.name}
              className="flex items-center p-2 hover:bg-gray-100 cursor-pointer"
              onClick={() => {
                console.log(`Selected: ${command.name}`);
                setIsOpen(false);
              }}
            >
              <command.icon size={18} className="mr-2" />
              <span>{command.name}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};