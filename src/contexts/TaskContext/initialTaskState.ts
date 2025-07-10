import type { TaskState } from '../../models/TaskState';

export const initialTaskState: TaskState = {
  tasks: [],
  secondsRemaining: 0,
  formmatedSecondsRemaining: '00:00',
  activeTask: null,
  currentCycle: 0,
  config: {
    workTime: 1,
    shortBreakTime: 1,
    longBreakTime: 1,
  },
};
