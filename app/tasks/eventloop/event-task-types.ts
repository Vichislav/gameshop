import type { EventTaskLines } from '@/lib/event-task-lines'

export interface EventProps {
  id: number
  tasksLines: EventTaskLines
  taskKey: string
}
