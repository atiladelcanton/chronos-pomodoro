import { createContext } from 'react';
import type { TaskState } from '../../models/TaskState';
import { initialTaskState } from './initialTaskState';
import type { TaskActionModel } from './taskActions';

type TaskContextProps = {
  state: TaskState;
  dispatch: React.Dispatch<TaskActionModel>;
};
const initialContextValue = {
  state: initialTaskState,
  dispatch: () => {},
};
export const TaskContext = createContext<TaskContextProps>(initialContextValue);
