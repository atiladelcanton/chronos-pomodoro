import type { TaskState } from '../models/TaskState';

let instance: TimerWorkerManager | null = null;
export class TimerWorkerManager {
  private worker: Worker;
  private constructor() {
    this.worker = new Worker(new URL('./timerWorker.js', import.meta.url));
  }
  static getInstance(): TimerWorkerManager {
    if (!instance) {
      instance = new TimerWorkerManager();
    }
    return instance;
  }

  postMessage(message: TaskState): void {
    this.worker.postMessage(message);
  }
  onmessage(cb: (e: MessageEvent) => void) {
    this.worker.onmessage = cb;
  }
  terminate(): void {
    if (this.worker) {
      this.worker.terminate();
      instance = null; // Reset instance to allow recreation
    }
  }
}
