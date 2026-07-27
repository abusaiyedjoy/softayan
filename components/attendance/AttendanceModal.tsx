import React, { useEffect, useRef, useState } from 'react';
import { AttendanceStatus, Student } from '@/types/student';
import { X } from 'lucide-react';

interface AttendanceModalProps {
  student: Student;
  isOpen: boolean;
  onClose: () => void;
  onSave: (status: AttendanceStatus) => void;
}

export const AttendanceModal: React.FC<AttendanceModalProps> = ({
  student,
  isOpen,
  onClose,
  onSave,
}) => {
  // Status is initialised from props at mount time.
  // The parent passes key={student.id} so the modal remounts
  // whenever a different student is selected — no sync effect needed.
  const [status, setStatus] = useState<AttendanceStatus>(student.status);
  const modalRef = useRef<HTMLDivElement>(null);
  const selectRef = useRef<HTMLSelectElement>(null);
  const saveBtnRef = useRef<HTMLButtonElement>(null);
  const closeBtnRef = useRef<HTMLButtonElement>(null);

  // Auto-focus the select when the modal opens.
  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        selectRef.current?.focus();
      }, 50);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  // Trap Focus and Escape Key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;

      if (e.key === 'Escape') {
        onClose();
        return;
      }

      if (e.key === 'Tab') {
        const focusableElements = [
          closeBtnRef.current,
          selectRef.current,
          saveBtnRef.current,
        ].filter(Boolean) as HTMLElement[];

        if (focusableElements.length === 0) return;

        const firstEl = focusableElements[0];
        const lastEl = focusableElements[focusableElements.length - 1];

        if (e.shiftKey) {
          // Back-tab
          if (document.activeElement === firstEl) {
            lastEl.focus();
            e.preventDefault();
          }
        } else {
          // Normal-tab
          if (document.activeElement === lastEl) {
            firstEl.focus();
            e.preventDefault();
          }
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(status);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm transition-opacity duration-300 animate-fade-in"
        onClick={onClose}
      />

      {/* Modal Dialog */}
      <div
        ref={modalRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        className="relative w-full max-w-md bg-white border border-slate-100 rounded-2xl shadow-xl overflow-hidden transition-all duration-300 animate-zoom-in z-10"
      >
        {/* Header */}
        <div className="flex justify-between items-center px-6 py-4.5 border-b border-slate-100">
          <h3 id="modal-title" className="text-base font-bold text-slate-800">
            Edit Attendance Status
          </h3>
          <button
            ref={closeBtnRef}
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-50 transition-all focus:outline-none focus:ring-2 focus:ring-slate-300"
            aria-label="Close modal"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div className="space-y-4">
            {/* Student Info Card */}
            <div className="p-4 bg-slate-50 border border-slate-100 rounded-xl space-y-2">
              <div className="flex justify-between items-baseline">
                <span className="text-sm font-bold text-slate-800">{student.name}</span>
                <span className="text-xs text-slate-400 font-semibold">Roll #{student.roll}</span>
              </div>
              <div className="flex gap-4 text-xs font-semibold text-slate-500">
                <span>Class: {student.class}</span>
                <span>Section: {student.section}</span>
              </div>
            </div>

            {/* Dropdown status selector */}
            <div className="space-y-1.5">
              <label htmlFor="status-select" className="text-xs font-bold text-slate-600">
                Attendance Status
              </label>
              <select
                id="status-select"
                ref={selectRef}
                value={status}
                onChange={(e) => setStatus(e.target.value as AttendanceStatus)}
                className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-sm font-medium text-slate-700 focus:outline-none focus:border-slate-400 focus:ring-1 focus:ring-slate-400 transition-all cursor-pointer"
              >
                <option value="Present">Present</option>
                <option value="Absent">Absent</option>
                <option value="Leave">Leave</option>
              </select>
            </div>
          </div>

          {/* Footer Actions */}
          <div className="flex gap-3 justify-end pt-4 border-t border-slate-100">
            <button
              type="button"
              onClick={onClose}
              className="px-4.5 py-2.5 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-50 active:bg-slate-100 transition-all focus:outline-none focus:ring-2 focus:ring-slate-200"
            >
              Cancel
            </button>
            <button
              ref={saveBtnRef}
              type="submit"
              className="px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-slate-800 hover:bg-slate-700 active:bg-slate-900 transition-all shadow-sm focus:outline-none focus:ring-2 focus:ring-slate-400"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
