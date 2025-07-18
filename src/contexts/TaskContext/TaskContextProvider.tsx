import React, { use, useEffect, useReducer, useRef } from 'react';

import { initialTaskState } from './initialTaskState';
import { TaskContext } from './TaskContext';
import { taskReducer } from './taskReducer';
import { TimerWorkerManager } from '../../workers/timeWorkerManagers';
import { TaskActionTypes } from './taskActions';
import { formatSecondsToMinute } from '../../utils/formatSecondsToMinute';
import { loadBeep } from '../../utils/loadBeep';
import type { TaskState } from '../../models/TaskState';

type TaskContextProviderProps = {
  children: React.ReactNode;
};

export function TaskContextProvider({ children }: TaskContextProviderProps) {
  const [state, dispatch] = useReducer(taskReducer, initialTaskState, () => {
    const storageState = localStorage.getItem('state');
    if (storageState === null) return initialTaskState;
    const parsedStorageState = JSON.parse(storageState) as TaskState;
    return {
      ...parsedStorageState,
      activeTask: null,
      secondsRemaining: 0,
      formmatedSecondsRemaining: '00:00',
    };
  });
  let playBeepRef = useRef<() => void | null>(null);
  const worker = TimerWorkerManager.getInstance();
  worker.onmessage(event => {
    const countDownSeconds = event.data;

    if (countDownSeconds <= 0) {
      if (playBeepRef.current) {
        playBeepRef.current();
        playBeepRef.current = null; // Reset after playing
      }

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
    localStorage.setItem('state', JSON.stringify(state));
    if (!state.activeTask) {
      worker.terminate();
    }
    worker.postMessage(state);
    document.title = `${formatSecondsToMinute(
      state.secondsRemaining,
    )} - Chronos Pomodoro`;
  }, [worker, state]);

  useEffect(() => {
    if (state.activeTask && playBeepRef.current === null) {
      playBeepRef.current = loadBeep();
    } else {
      console.log('Zerando audio');
      playBeepRef.current = null;
    }
  }, [state.activeTask]);

  return (
    <TaskContext.Provider value={{ state, dispatch }}>
      {children}
    </TaskContext.Provider>
  );
}
