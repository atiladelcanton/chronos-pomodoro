import React, { useEffect, useReducer } from 'react';

import { initialTaskState } from './initialTaskState';
import { TaskContext } from './TaskContext';
import { taskReducer } from './taskReducer';
import { TimerWorkerManager } from '../../workers/timeWorkerManagers';
import { TaskActionTypes } from './taskActions';
import { formatSecondsToMinute } from '../../utils/formatSecondsToMinute';

type TaskContextProviderProps = {
  children: React.ReactNode;
};

export function TaskContextProvider({ children }: TaskContextProviderProps) {
  const [state, dispatch] = useReducer(taskReducer, initialTaskState);
  const worker = TimerWorkerManager.getInstance();
  worker.onmessage(event => {
    const countDownSeconds = event.data;
    console.log(countDownSeconds);
    if (countDownSeconds <= 0) {
      console.log('Task completed');
      dispatch({
        type: TaskActionTypes.COMPLETE_TASK,
      });
      worker.terminate();
    } else {
      dispatch({
        type: TaskActionTypes.COUNT_DOWN,
        payload: { secondsRemaining: countDownSeconds },
      });
    }
  });
  useEffect(() => {
    if (!state.activeTask) {
      worker.terminate();
      console.log('Worker terminated due to no active task');
    }
    worker.postMessage(state);
    document.title = formatSecondsToMinute(state.secondsRemaining);
  }, [worker, state]);
  return (
    <TaskContext.Provider value={{ state, dispatch }}>
      {children}
    </TaskContext.Provider>
  );
}
