import type { TaskState } from '../../models/TaskState';
import { formatSecondsToMinute } from '../../utils/formatSecondsToMinute';
import { getNextCycle } from '../../utils/getNextCicle';
import { TaskActionTypes, type TaskActionModel } from './taskActions';

export function taskReducer(
  state: TaskState,
  action: TaskActionModel,
): TaskState {
  switch (action.type) {
    case TaskActionTypes.START_TASK: {
      const newTask = action.payload;
      const nextCycle = getNextCycle(state.currentCycle);
      const secondsRemaining = newTask.duration * 60;
      return {
        ...state,
        activeTask: newTask,
        currentCycle: nextCycle,
        secondsRemaining: secondsRemaining,
        formmatedSecondsRemaining: formatSecondsToMinute(secondsRemaining),
        tasks: [...state.tasks, newTask],
      };
    }
    case TaskActionTypes.INTERRUPT_TASK: {
      return {
        ...state,
        activeTask: null,
        secondsRemaining: 0,
        formmatedSecondsRemaining: '00:00',
        tasks: state.tasks.map(task => {
          if (state.activeTask && task.id !== state.activeTask.id) return task;
          return {
            ...task,
            interruptDate: Date.now(),
          };
        }),
      };
    }
    case TaskActionTypes.COUNT_DOWN: {
      const secondsRemaining = action.payload.secondsRemaining;
      return {
        ...state,
        secondsRemaining: secondsRemaining,
        formmatedSecondsRemaining: formatSecondsToMinute(secondsRemaining),
      };
    }
    case TaskActionTypes.COMPLETE_TASK: {
      return {
        ...state,
        activeTask: null,
        secondsRemaining: 0,
        formmatedSecondsRemaining: '00:00',
        tasks: state.tasks.map(task => {
          if (state.activeTask && task.id !== state.activeTask.id) return task;
          return {
            ...task,
            completedDate: Date.now(),
          };
        }),
      };
    }
  }
  return state;
}
