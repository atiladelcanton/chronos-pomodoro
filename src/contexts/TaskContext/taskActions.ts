import type { Task } from '../../models/Task';
import type { TaskState } from '../../models/TaskState';

export const TaskActionTypes = {
  START_TASK: 'START_TASK',
  INTERRUPT_TASK: 'INTERRUPT_TASK',
  COUNT_DOWN: 'COUNT_DOWN',
  COMPLETE_TASK: 'COMPLETE_TASK',
  RESET_STATE: 'RESET_STATE',
} as const;

export type TaskActionWithPayload =
  | {
      type: typeof TaskActionTypes.START_TASK;
      payload: Task;
    }
  | {
      type: typeof TaskActionTypes.COUNT_DOWN;
      payload: { secondsRemaining: number };
    };

export type TaskActionsWihoutPayload =
  | {
      type: typeof TaskActionTypes.INTERRUPT_TASK;
    }
  | {
      type: typeof TaskActionTypes.COMPLETE_TASK;
    }
  | {
      type: typeof TaskActionTypes.RESET_STATE;
    };

export type TaskActionModel = TaskActionWithPayload | TaskActionsWihoutPayload;
