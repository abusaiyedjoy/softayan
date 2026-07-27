import React from 'react';
import { AttendanceStatus } from '@/types/student';
import { STATUS_CONFIG } from '@/lib/utils';

interface StatusBadgeProps {
  status: AttendanceStatus;
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
  const config = STATUS_CONFIG[status];

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold tracking-wide border transition-all duration-300 ${config.bgClass} ${config.textClass} border-current/10`}
    >
      <span className={`w-1.5 h-1.5 rounded-full ${config.dotClass}`} />
      {config.label}
    </span>
  );
};
