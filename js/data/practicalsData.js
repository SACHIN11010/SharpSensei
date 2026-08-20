import { practicalsPart1 } from './practicalsPart1.js';
import { practicalsPart2 } from './practicalsPart2.js';
import { practicalsPart3 } from './practicalsPart3.js';

export const allPracticals = [
  ...practicalsPart1,
  ...practicalsPart2,
  ...practicalsPart3
].sort((a, b) => a.id - b.id);

export const modulesList = [
  {
    name: 'Module 1: C# OOP & Basics',
    practicalRange: 'Practicals 1 - 10',
    description: 'Console I/O, OOP Classes, Overloading, Polymorphism, Strings, Exceptions, Delegates & Arrays.',
    color: '#3B82F6',
    count: 10
  },
  {
    name: 'Module 2: Windows Forms Controls',
    practicalRange: 'Practicals 11 - 21',
    description: 'Core Controls: TextBoxes, Buttons, ComboBox, Radio/Check, Calculators, ListBoxes & Tasks.',
    color: '#10B981',
    count: 11
  },
  {
    name: 'Module 3: Advanced Controls & GDI+',
    practicalRange: 'Practicals 22 - 32',
    description: 'DateTimePickers, GDI+ 2D Drawing, Dialogs, ImageList, Timers, TreeView, ContextMenu & MDI.',
    color: '#8B5CF6',
    count: 11
  },
  {
    name: 'Module 4: ADO.NET & Database',
    practicalRange: 'Practicals 33 - 38',
    description: 'SQL Server & MS Access CRUD, DataGridView Live Search, DB Auth & Crystal Reports.',
    color: '#F59E0B',
    count: 6
  }
];

export function getPracticalById(id) {
  return allPracticals.find(p => p.id === id);
}

export function searchPracticals(query, moduleFilter, diffFilter) {
  const q = (query || '').trim().toLowerCase();
  return allPracticals.filter(p => {
    const matchesQuery = 
      !q ||
      p.id.toString() === q ||
      p.title.toLowerCase().includes(q) ||
      p.aim.toLowerCase().includes(q) ||
      p.tags.some(t => t.toLowerCase().includes(q));

    const matchesModule = !moduleFilter || moduleFilter === 'All' || p.module === moduleFilter;
    const matchesDiff = !diffFilter || diffFilter === 'All' || p.difficulty === diffFilter;

    return matchesQuery && matchesModule && matchesDiff;
  });
}
