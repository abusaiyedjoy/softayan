import React from 'react';
import { SearchX, RotateCcw } from 'lucide-react';

interface EmptyStateProps {
  onReset: () => void;
}

export const EmptyState: React.FC<EmptyStateProps> = ({ onReset }) => {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center bg-white border border-slate-100 rounded-2xl shadow-sm">
      <div className="p-4 bg-slate-50 rounded-full text-slate-400 mb-4">
        <SearchX className="h-10 w-10 stroke-[1.5]" />
      </div>
      <h3 className="text-lg font-bold text-slate-800 mb-1">No students found</h3>
      <p className="text-sm text-slate-500 max-w-sm mb-6">
        No students matched your current search query or class filter criteria. Try refining them or reset them below.
      </p>
      <button
        onClick={onReset}
        className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-white bg-slate-800 hover:bg-slate-700 active:bg-slate-900 rounded-xl transition-all duration-200 shadow-sm"
      >
        <RotateCcw className="h-3.5 w-3.5" />
        Reset Filters
      </button>
    </div>
  );
};
