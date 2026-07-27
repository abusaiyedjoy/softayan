import React from 'react';
import { AttendanceStats } from '@/types/student';
import { UserCheck, UserX, UserMinus, Users } from 'lucide-react';

interface AttendanceSummaryProps {
  stats: AttendanceStats;
}

export const AttendanceSummary: React.FC<AttendanceSummaryProps> = ({ stats }) => {
  const cards = [
    {
      label: 'Total Students',
      count: stats.total,
      icon: Users,
      bg: 'bg-blue-50/60',
      text: 'text-blue-700',
      border: 'border-blue-100',
      iconBg: 'bg-blue-100/80',
    },
    {
      label: 'Present Today',
      count: stats.present,
      icon: UserCheck,
      bg: 'bg-emerald-50/60',
      text: 'text-emerald-700',
      border: 'border-emerald-100',
      iconBg: 'bg-emerald-100/80',
    },
    {
      label: 'Absent Today',
      count: stats.absent,
      icon: UserX,
      bg: 'bg-red-50/60',
      text: 'text-red-700',
      border: 'border-red-100',
      iconBg: 'bg-red-100/80',
    },
    {
      label: 'On Leave',
      count: stats.leave,
      icon: UserMinus,
      bg: 'bg-amber-50/60',
      text: 'text-amber-700',
      border: 'border-amber-100',
      iconBg: 'bg-amber-100/80',
    },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
      {cards.map((card, idx) => {
        const Icon = card.icon;
        return (
          <div
            key={idx}
            className={`flex items-center justify-between p-4 lg:p-6 rounded-2xl border ${card.bg} ${card.border} shadow-sm transition-all duration-300 hover:shadow-md hover:-translate-y-0.5`}
          >
            <div className="space-y-1">
              <span className="text-xs lg:text-sm font-medium text-slate-500">{card.label}</span>
              <p className={`text-2xl lg:text-3xl font-extrabold tracking-tight ${card.text}`}>
                {card.count}
              </p>
            </div>
            <div className={`p-2.5 lg:p-3 rounded-xl ${card.iconBg} ${card.text}`}>
              <Icon className="w-5 h-5 lg:w-6 lg:h-6" />
            </div>
          </div>
        );
      })}
    </div>
  );
};
