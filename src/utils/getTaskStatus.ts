import type { Task } from '../models/Task';

export function getTaskStatus(task: Task, activeTask: Task | null) {
  if (task.completedDate) return 'Completa';
  if (task.interruptDate) return 'Interrompida';
  if (activeTask?.id === task.id) return 'Em Progresso';
  return 'Em progresso';
}
