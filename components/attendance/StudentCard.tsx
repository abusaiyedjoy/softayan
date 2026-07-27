import React from 'react';
import { Student } from '@/types/student';
import { StatusBadge } from './StatusBadge';
import { Edit2 } from 'lucide-react';

interface StudentCardProps {
  student: Student;
  onEdit: (student: Student) => void;
}

export const StudentCard: React.FC<StudentCardProps> = ({ student, onEdit }) => {
  return (
    <div className="bg-white border border-slate-100 p-5 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between group">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h4 className="text-base font-bold text-slate-800 group-hover:text-slate-900 transition-colors">
            {student.name}
          </h4>
          <span className="text-xs text-slate-400 font-medium">Roll #{student.roll}</span>
        </div>
        <StatusBadge status={student.status} />
      </div>

      <div className="grid grid-cols-2 gap-3 bg-slate-50/50 rounded-xl p-3 mb-4 text-center border border-slate-100/50">
        <div>
          <span className="block text-[10px] uppercase tracking-wider font-semibold text-slate-400 mb-0.5">
            Class
          </span>
          <span className="text-xs font-bold text-slate-700">{student.class}</span>
        </div>
        <div>
          <span className="block text-[10px] uppercase tracking-wider font-semibold text-slate-400 mb-0.5">
            Section
          </span>
          <span className="text-xs font-bold text-slate-700">Section {student.section}</span>
        </div>
      </div>

      <button
        onClick={() => onEdit(student)}
        className="w-full flex items-center justify-center gap-2 py-2 px-4 rounded-xl text-xs font-bold text-slate-600 bg-slate-50 hover:bg-slate-100 active:bg-slate-200 focus:ring-2 focus:ring-slate-300 transition-all duration-200 outline-none"
      >
        <Edit2 className="w-3.5 h-3.5" />
        Edit Attendance
      </button>
    </div>
  );
};
