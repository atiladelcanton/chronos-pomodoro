import type { Task } from './Task';

export type TaskState = {
  tasks: Task[];
  secondsRemaining: number; // Seconds remaining for the current task
  formmatedSecondsRemaining: string; // Formatted seconds remaining for the current task
  activeTask: Task | null; // The currently active task, or null if no task is active
  currentCycle: number; // The current cycle number (1 for work, 2 for short break, 3 for long break)
  config: {
    workTime: number; // Duration of work time in minutes
    shortBreakTime: number; // Duration of short break time in minutes
    longBreakTime: number; // Duration of long break time in minutes
  };
};
