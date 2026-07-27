import React from 'react';
import { Student } from '@/types/student';
import { StatusBadge } from './StatusBadge';
import { Edit2 } from 'lucide-react';

interface StudentTableProps {
  students: Student[];
  onEdit: (student: Student) => void;
}

export const StudentTable: React.FC<StudentTableProps> = ({ students, onEdit }) => {
  return (
    <div className="bg-white border border-slate-100 rounded-2xl shadow-sm overflow-hidden transition-all duration-300">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-slate-100 bg-slate-50/50">
              <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">
                Roll
              </th>
              <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">
                Name
              </th>
              <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">
                Class
              </th>
              <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">
                Section
              </th>
              <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">
                Status
              </th>
              <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500 text-right">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {students.map((student) => (
              <tr
                key={student.id}
                className="group hover:bg-slate-50/40 transition-colors duration-200"
              >
                <td className="px-6 py-4.5 text-sm font-semibold text-slate-400">
                  {String(student.roll).padStart(2, '0')}
                </td>
                <td className="px-6 py-4.5 text-sm font-bold text-slate-800">
                  {student.name}
                </td>
                <td className="px-6 py-4.5 text-sm font-medium text-slate-600">
                  {student.class}
                </td>
                <td className="px-6 py-4.5 text-sm font-medium text-slate-600">
                  Section {student.section}
                </td>
                <td className="px-6 py-4.5">
                  <StatusBadge status={student.status} />
                </td>
                <td className="px-6 py-4.5 text-right">
                  <button
                    onClick={() => onEdit(student)}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold text-slate-600 bg-slate-50 hover:bg-slate-100 group-hover:bg-slate-100 active:bg-slate-200 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-slate-300"
                  >
                    <Edit2 className="w-3 h-3" />
                    Edit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
