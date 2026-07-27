import React from 'react';

export const LoadingSkeleton: React.FC = () => {
  return (
    <div className="space-y-6 animate-pulse">
      {/* Search & Filter Skeleton */}
      <div className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-center justify-between">
        <div className="h-10 bg-slate-200 rounded-xl flex-1 max-w-md" />
        <div className="h-10 bg-slate-200 rounded-xl w-full sm:w-40" />
      </div>

      {/* Table Skeleton */}
      <div className="bg-white border border-slate-100 rounded-2xl shadow-sm overflow-hidden hidden md:block">
        <div className="border-b border-slate-100 bg-slate-50/50 p-4">
          <div className="grid grid-cols-6 gap-4">
            <div className="h-4 bg-slate-200 rounded w-24" />
            <div className="h-4 bg-slate-200 rounded w-16" />
            <div className="h-4 bg-slate-200 rounded w-16" />
            <div className="h-4 bg-slate-200 rounded w-16" />
            <div className="h-4 bg-slate-200 rounded w-20" />
            <div className="h-4 bg-slate-200 rounded w-16 justify-self-end" />
          </div>
        </div>
        <div className="divide-y divide-slate-100 p-4 space-y-4">
          {Array.from({ length: 5 }).map((_, idx) => (
            <div key={idx} className="grid grid-cols-6 gap-4 py-2">
              <div className="h-4 bg-slate-200 rounded w-32" />
              <div className="h-4 bg-slate-200 rounded w-12" />
              <div className="h-4 bg-slate-200 rounded w-8" />
              <div className="h-4 bg-slate-200 rounded w-10" />
              <div className="h-6 bg-slate-200 rounded-full w-20" />
              <div className="h-8 bg-slate-200 rounded-lg w-16 justify-self-end" />
            </div>
          ))}
        </div>
      </div>

      {/* Mobile Card Skeleton */}
      <div className="grid grid-cols-1 gap-4 md:hidden">
        {Array.from({ length: 3 }).map((_, idx) => (
          <div key={idx} className="bg-white border border-slate-100 p-5 rounded-2xl shadow-sm space-y-4">
            <div className="flex justify-between items-start">
              <div className="space-y-2">
                <div className="h-4.5 bg-slate-200 rounded w-28" />
                <div className="h-3.5 bg-slate-200 rounded w-16" />
              </div>
              <div className="h-6 bg-slate-200 rounded-full w-16" />
            </div>
            <div className="grid grid-cols-3 gap-2 border-t border-b border-slate-50 py-3">
              <div className="space-y-1">
                <div className="h-3 bg-slate-200 rounded w-10" />
                <div className="h-4 bg-slate-200 rounded w-14" />
              </div>
              <div className="space-y-1">
                <div className="h-3 bg-slate-200 rounded w-10" />
                <div className="h-4 bg-slate-200 rounded w-10" />
              </div>
              <div className="space-y-1">
                <div className="h-3 bg-slate-200 rounded w-10" />
                <div className="h-4 bg-slate-200 rounded w-8" />
              </div>
            </div>
            <div className="h-9 bg-slate-200 rounded-xl w-full" />
          </div>
        ))}
      </div>
    </div>
  );
};
