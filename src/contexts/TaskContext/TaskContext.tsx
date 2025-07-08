import { createContext } from 'react';
import type { TaskState } from '../../models/TaskState';
import { initialTaskState } from './initialTaskState';

type TaskContextProps = {
  state: TaskState;
  setState: React.Dispatch<React.SetStateAction<TaskState>>;
};
const initialContextValue = {
  state: initialTaskState,
  setState: () => {},
};
export const TaskContext = createContext<TaskContextProps>(initialContextValue);
