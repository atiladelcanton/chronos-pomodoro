import { useTaskContext } from '../../contexts/TaskContext/useTaskContext';
import styles from './style.module.css';

export function CountDown() {
  const { state } = useTaskContext();
  return (
    <div className={styles.container}>{state.formmatedSecondsRemaining}</div>
  );
}
