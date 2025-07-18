import { useTaskContext } from '../../contexts/TaskContext/useTaskContext';
import { getNextCycle } from '../../utils/getNextCicle';
import { getNextCicleType } from '../../utils/getNextCicleType';
import styles from './styles.module.css';
export function Cycles() {
  const { state } = useTaskContext();
  const cycleSteps = Array.from({ length: state.currentCycle });
  const cycleDescriptionMap = {
    workTime: 'Tempo de trabalho',
    shortBreakTime: 'Pausa curta',
    longBreakTime: 'Pausa longa',
  };
  return (
    <>
      <div className={styles.cycles}>
        <span>Ciclos:</span>
        <div className={styles.cycleDots}>
          {cycleSteps.map((_, index) => {
            const nextCycle = getNextCycle(index);
            const nextCycleType = getNextCicleType(nextCycle);
            return (
              <span
                key={`${nextCycleType}_${nextCycle}`}
                className={`${styles.cycleDot} ${styles[nextCycleType]}`}
                aria-label={`Indicador de ciclo de ${cycleDescriptionMap[nextCycleType]}`}
                title={`Indicador de ciclo de ${cycleDescriptionMap[nextCycleType]}`}
              ></span>
            );
          })}
        </div>
      </div>
    </>
  );
}
