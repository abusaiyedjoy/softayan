'use client';

import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { Student, FilterClass, AttendanceStatus } from '@/types/student';
import { initialStudents } from '@/data/students';
import { studentService } from '@/services/studentService';
import { computeStats, formatDate } from '@/lib/utils';
import { AttendanceSummary } from '@/components/attendance/AttendanceSummary';
import { SearchBar } from '@/components/attendance/SearchBar';
import { ClassFilter } from '@/components/attendance/ClassFilter';
import { StudentTable } from '@/components/attendance/StudentTable';
import { StudentCard } from '@/components/attendance/StudentCard';
import { AttendanceModal } from '@/components/attendance/AttendanceModal';
import { EmptyState } from '@/components/attendance/EmptyState';
import { LoadingSkeleton } from '@/components/attendance/LoadingSkeleton';
import { AlertCircle, RefreshCw, Database } from 'lucide-react';

export default function AttendanceDashboard() {
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isOfflineMode, setIsOfflineMode] = useState<boolean>(false);

  // Search and filter states
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [classFilter, setClassFilter] = useState<FilterClass>('All');

  // Modal states
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const currentDate = useMemo(() => formatDate(new Date()), []);

  // Fetch student data
  const loadData = useCallback(async (forceLocal = false) => {
    setLoading(true);
    setError(null);

    // Simulate 1 second loading time
    await new Promise((resolve) => setTimeout(resolve, 1000));

    if (forceLocal) {
      setStudents(initialStudents);
      setIsOfflineMode(true);
      setLoading(false);
      return;
    }

    try {
      const data = await studentService.getAll();
      setStudents(data);
      setIsOfflineMode(false);
    } catch (err) {
      if (err instanceof Error) {
        console.warn('API error, JSON Server might not be running:', err.message);
      }
      setError(
        'Failed to connect to the attendance database server. Please ensure the API server is running.'
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      loadData();
    }, 0);
    return () => clearTimeout(timer);
  }, [loadData]);

  // Handle status update
  const handleSaveStatus = async (status: AttendanceStatus) => {
    if (!selectedStudent) return;

    const previousStudents = [...students];

    // Optimistic UI Update: update state immediately
    setStudents((prev) =>
      prev.map((s) => (s.id === selectedStudent.id ? { ...s, status } : s))
    );
    setIsModalOpen(false);

    if (isOfflineMode) {
      return; // Offline mode updates local state only
    }

    try {
      await studentService.updateStatus(selectedStudent.id, status);
    } catch (err) {
      console.error('Failed to update student status on server:', err);
      // Revert state on error
      setStudents(previousStudents);
      alert('Failed to save changes to the database server. Reverting status.');
    }
  };

  // Filtered list
  const filteredStudents = useMemo(() => {
    return students.filter((student) => {
      const matchesSearch = student.name
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      const matchesClass = classFilter === 'All' || student.class === classFilter;
      return matchesSearch && matchesClass;
    });
  }, [students, searchQuery, classFilter]);

  const stats = useMemo(() => computeStats(students), [students]);

  const handleResetFilters = () => {
    setSearchQuery('');
    setClassFilter('All');
  };

  return (
    <div className="flex-1 min-h-screen bg-slate-50/50 py-8 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Top Header */}
        <header className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-b border-slate-100 pb-6">
          <div>
            <h1 className="text-2xl lg:text-3xl font-extrabold text-slate-800 tracking-tight">
              Student Attendance
            </h1>
            <p className="text-sm font-medium text-slate-500 mt-1">
              Manage and track daily student presence records efficiently
            </p>
          </div>
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center px-3.5 py-1.5 rounded-xl bg-white border border-slate-200 text-xs font-bold text-slate-600 shadow-sm">
              {currentDate}
            </span>
            {isOfflineMode && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-50 border border-amber-200 text-xs font-bold text-amber-700">
                <Database className="w-3.5 h-3.5" />
                Demo Mode
              </span>
            )}
          </div>
        </header>

        {/* Dashboard summary stats card container */}
        {!loading && !error && <AttendanceSummary stats={stats} />}

        {/* Error Handling State */}
        {error && !loading && (
          <div className="p-6 bg-white border border-red-100 rounded-2xl shadow-sm space-y-4 max-w-2xl mx-auto text-center">
            <div className="p-3.5 bg-red-50 rounded-full text-red-500 w-fit mx-auto">
              <AlertCircle className="h-6 w-6" />
            </div>
            <div className="space-y-1">
              <h3 className="text-base font-bold text-slate-800">Database Connection Error</h3>
              <p className="text-sm text-slate-500 leading-relaxed">{error}</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
              <button
                onClick={() => loadData()}
                className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-slate-800 hover:bg-slate-700 active:bg-slate-900 transition-all shadow-sm cursor-pointer"
              >
                <RefreshCw className="h-3.5 w-3.5" />
                Retry Connection
              </button>
              <button
                onClick={() => loadData(true)}
                className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 active:bg-slate-300 transition-all cursor-pointer"
              >
                Load Local Demo Data
              </button>
            </div>
          </div>
        )}

        {/* Main Content Area */}
        {!error && (
          <div className="space-y-6">
            {loading ? (
              <LoadingSkeleton />
            ) : (
              <>
                {/* Search and Filters */}
                <div className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-center justify-between">
                  <SearchBar value={searchQuery} onChange={setSearchQuery} />
                  <ClassFilter value={classFilter} onChange={setClassFilter} />
                </div>

                {/* Empty State vs Student Records List */}
                {filteredStudents.length === 0 ? (
                  <EmptyState onReset={handleResetFilters} />
                ) : (
                  <>
                    {/* Desktop View Table */}
                    <div className="hidden md:block">
                      <StudentTable
                        students={filteredStudents}
                        onEdit={(student) => {
                          setSelectedStudent(student);
                          setIsModalOpen(true);
                        }}
                      />
                    </div>

                    {/* Mobile View Grid Cards */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:hidden">
                      {filteredStudents.map((student) => (
                        <StudentCard
                          key={student.id}
                          student={student}
                          onEdit={(s) => {
                            setSelectedStudent(s);
                            setIsModalOpen(true);
                          }}
                        />
                      ))}
                    </div>
                  </>
                )}
              </>
            )}
          </div>
        )}
      </div>

      {/* Attendance Modal */}
      {selectedStudent && (
        <AttendanceModal
          key={selectedStudent.id}
          student={selectedStudent}
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false);
            setSelectedStudent(null);
          }}
          onSave={handleSaveStatus}
        />
      )}
    </div>
  );
}
