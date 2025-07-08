import type { Task } from '../models/Task';

export function getNextCicleType(currentCycle: number): Task['type'] {
  if (currentCycle % 8 === 0) return 'longBreakTime';
  if (currentCycle % 2 === 0) return 'shortBreakTime';
  return 'workTime';
}
