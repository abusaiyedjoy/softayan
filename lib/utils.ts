import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { AttendanceStatus, AttendanceStats, Student } from '@/types/student';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: Date): string {
  return date.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export function computeStats(students: Student[]): AttendanceStats {
  return students.reduce(
    (acc, student) => {
      acc.total += 1;
      if (student.status === 'Present') acc.present += 1;
      else if (student.status === 'Absent') acc.absent += 1;
      else if (student.status === 'Leave') acc.leave += 1;
      return acc;
    },
    { present: 0, absent: 0, leave: 0, total: 0 } as AttendanceStats
  );
}

export const STATUS_CONFIG: Record<
  AttendanceStatus,
  { label: string; bgClass: string; textClass: string; dotClass: string }
> = {
  Present: {
    label: 'Present',
    bgClass: 'bg-emerald-50',
    textClass: 'text-emerald-700',
    dotClass: 'bg-emerald-500',
  },
  Absent: {
    label: 'Absent',
    bgClass: 'bg-red-50',
    textClass: 'text-red-700',
    dotClass: 'bg-red-500',
  },
  Leave: {
    label: 'Leave',
    bgClass: 'bg-amber-50',
    textClass: 'text-amber-700',
    dotClass: 'bg-amber-500',
  },
};
