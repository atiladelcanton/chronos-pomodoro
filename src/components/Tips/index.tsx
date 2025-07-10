import { useTaskContext } from '../../contexts/TaskContext/useTaskContext';
import { getNextCycle } from '../../utils/getNextCicle';
import { getNextCicleType } from '../../utils/getNextCicleType';

export function Tips() {
  const { state } = useTaskContext();
  const nextCycle = getNextCycle(state.currentCycle);
  const nextCycleType = getNextCicleType(nextCycle);
  const tipsForWhenActiveTask = {
    workTime: <span>Foque por {state.config.workTime}min.</span>,
    shortBreakTime: <span>Descanse por {state.config.shortBreakTime}min</span>,
    longBreakTime: (
      <span>Descanse bem, aproveite para fazer algo que você gosta.</span>
    ),
  };
  const tipsForWhenNoActiveTask = {
    workTime: <span>Próximo ciclo é de {state.config.workTime}min</span>,
    shortBreakTime: (
      <span>Próximo descanso é de {state.config.shortBreakTime}min</span>
    ),
    longBreakTime: (
      <span>Próximo ciclo é de {state.config.longBreakTime}min</span>
    ),
  };
  return (
    <>
      {!!state.activeTask && tipsForWhenActiveTask[state.activeTask.type]}
      {!state.activeTask && tipsForWhenNoActiveTask[nextCycleType]}
    </>
  );
}
