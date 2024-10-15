import React, { useState, useEffect } from 'react';
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

interface CommandPaletteProps {
  onSelect: (command: string) => void;
}

export const CommandPalette: React.FC<CommandPaletteProps> = ({ onSelect }) => {
  const [search, setSearch] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);

  const filteredCommands = commands.filter((command) =>
    command.name.toLowerCase().includes(search.toLowerCase())
  );

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowDown') {
        setSelectedIndex((prevIndex) => (prevIndex + 1) % filteredCommands.length);
      } else if (e.key === 'ArrowUp') {
        setSelectedIndex((prevIndex) => (prevIndex - 1 + filteredCommands.length) % filteredCommands.length);
      } else if (e.key === 'Enter') {
        onSelect(filteredCommands[selectedIndex].name);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [filteredCommands, selectedIndex, onSelect]);

  return (
    <div className="w-64 bg-white border border-gray-300 rounded shadow-lg">
      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full p-2 border-b border-gray-300"
        placeholder="Search commands..."
        autoFocus
      />
      <div className="max-h-64 overflow-y-auto">
        {filteredCommands.map((command, index) => (
          <div
            key={command.name}
            className={`flex items-center p-2 cursor-pointer ${
              index === selectedIndex ? 'bg-blue-100' : 'hover:bg-gray-100'
            }`}
            onClick={() => onSelect(command.name)}
          >
            <command.icon size={18} className="mr-2" />
            <span>{command.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};