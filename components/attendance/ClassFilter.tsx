import React from 'react';
import { FilterClass } from '@/types/student';
import { ChevronDown } from 'lucide-react';

interface ClassFilterProps {
  value: FilterClass;
  onChange: (value: FilterClass) => void;
}

export const ClassFilter: React.FC<ClassFilterProps> = ({ value, onChange }) => {
  return (
    <div className="relative min-w-[160px]">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value as FilterClass)}
        className="w-full appearance-none bg-white border border-slate-200 rounded-xl px-4 py-2.5 pr-10 text-sm font-medium text-slate-700 focus:outline-none focus:border-slate-400 focus:ring-1 focus:ring-slate-400 transition-all duration-200 cursor-pointer"
      >
        <option value="All">All Classes</option>
        <option value="Class 9">Class 9</option>
        <option value="Class 10">Class 10</option>
      </select>
      <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-slate-400">
        <ChevronDown className="h-4.5 w-4.5" />
      </div>
    </div>
  );
};
