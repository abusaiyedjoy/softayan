import axios from 'axios';
import { AttendanceStatus, Student } from '@/types/student';

const BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:4000';

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 8000,
});

export const studentService = {
  /**
   * Fetch all students from the JSON Server.
   */
  getAll: async (): Promise<Student[]> => {
    const { data } = await api.get<Student[]>('/students');
    return data;
  },

  /**
   * Update a student's attendance status via PATCH.
   */
  updateStatus: async (id: number, status: AttendanceStatus): Promise<Student> => {
    const { data } = await api.patch<Student>(`/students/${id}`, { status });
    return data;
  },
};
