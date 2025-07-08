import { useRef } from 'react';
import { PlayCircleIcon, StopCircleIcon } from 'lucide-react';
import { Button } from '../Button';
import { Cycles } from '../Cycles';
import { Input } from '../Input';
import type { Task } from '../../models/Task';
import { useTaskContext } from '../../contexts/TaskContext/useTaskContext';
import { getNextCycle } from '../../utils/getNextCicle';
import { getNextCicleType } from '../../utils/getNextCicleType';
import { formatSecondsToMinute } from '../../utils/formatSecondsToMinute';

export function FormTask() {
  const { state, setState } = useTaskContext();
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
    const secondsRemaining = newTask.duration * 60;
    setState(prev => ({
      ...prev,
      activeTask: newTask,
      currentCycle: nextCycle,
      secondsRemaining: secondsRemaining,
      formmatedSecondsRemaining: formatSecondsToMinute(secondsRemaining),
      tasks: [...prev.tasks, newTask],
    }));
  };
  const handleInterruptTask = () => {
    setState(prev => ({
      ...prev,
      activeTask: null,
      secondsRemaining: 0,
      formmatedSecondsRemaining: '00:00',
      tasks: prev.tasks.map(task => {
        if (prev.activeTask && task.id !== prev.activeTask.id) return task;
        return {
          ...task,
          interruptDate: Date.now(),
        };
      }),
    }));
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
        <p>Lorem ipsum dolor sit amet.</p>
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
