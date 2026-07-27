export type AttendanceStatus = 'Present' | 'Absent' | 'Leave';

export type StudentClass = 'Class 9' | 'Class 10';

export type StudentSection = 'A' | 'B';

export interface Student {
  id: number;
  name: string;
  class: StudentClass;
  section: StudentSection;
  roll: number;
  status: AttendanceStatus;
}

export interface AttendanceStats {
  present: number;
  absent: number;
  leave: number;
  total: number;
}

export type FilterClass = 'All' | StudentClass;
