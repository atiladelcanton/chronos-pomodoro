import type { TaskState } from './TaskState';

export type Task = {
  id: string;
  name: string;
  duration: number; // Duration in minutes
  startDate: number; // Timestamp in milliseconds
  completedDate: number | null; // Timestamp in milliseconds, null if not completed
  interruptDate: number | null; // Timestamp in milliseconds, null if not interrupted
  type: keyof TaskState['config']; // Type of task, e.g., 'workTime', 'shortBreakTime', 'longBreakTime'
};
