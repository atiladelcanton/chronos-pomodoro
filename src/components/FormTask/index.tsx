import { useRef } from 'react';
import { PlayCircleIcon, StopCircleIcon } from 'lucide-react';
import { Button } from '../Button';
import { Cycles } from '../Cycles';
import { Input } from '../Input';
import type { Task } from '../../models/Task';
import { useTaskContext } from '../../contexts/TaskContext/useTaskContext';
import { getNextCycle } from '../../utils/getNextCicle';
import { getNextCicleType } from '../../utils/getNextCicleType';
import { TaskActionTypes } from '../../contexts/TaskContext/taskActions';
import { Tips } from '../Tips';
import { TimerWorkerManager } from '../../workers/timeWorkerManagers';

export function FormTask() {
  const { state, dispatch } = useTaskContext();
  const taskNameInput = useRef<HTMLInputElement>(null);

  const nextCycle = getNextCycle(state.currentCycle);
  const nextCycleType = getNextCicleType(nextCycle);

  const handleCreateNewTask = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const input = taskNameInput.current;
    if (!input) return;

    const taskName = input.value.trim();
    if (!taskName) {
      alert('Por favor, insira uma tarefa válida.');
      input.focus();
      return;
    }

    const newTask: Task = {
      id: crypto.randomUUID(),
      name: taskName,
      startDate: Date.now(),
      completedDate: null,
      interruptDate: null,
      duration: state.config[nextCycleType],
      type: nextCycleType,
    };

    dispatch({ type: TaskActionTypes.START_TASK, payload: newTask });
  };
  const handleInterruptTask = () => {
    dispatch({ type: TaskActionTypes.INTERRUPT_TASK });
  };
  return (
    <form className='form' onSubmit={handleCreateNewTask}>
      <div className='formRow'>
        <Input
          type='text'
          id='meuInput'
          placeholder='Defina sua tarefa...'
          labelText='Tarefa'
          ref={taskNameInput}
          disabled={!!state.activeTask}
        />
      </div>
      <div className='formRow'>
        <Tips />
      </div>
      {state.currentCycle > 0 && (
        <div className='formRow'>
          <Cycles />
        </div>
      )}

      <div className='formRow'>
        {!state.activeTask && (
          <Button
            type='submit'
            aria-label='Iniciar nova Tarefa'
            title='Iniciar nova Tarefa'
            icon={<PlayCircleIcon />}
            color='green'
            key='submit_button'
          />
        )}
        {!!state.activeTask && (
          <Button
            type='button'
            aria-label='Interromper Tarefa Atual'
            title='Interromper Tarefa Atual'
            icon={<StopCircleIcon />}
            color='red'
            onClick={handleInterruptTask}
            key='interrupt_button'
          />
        )}
      </div>
    </form>
  );
}
