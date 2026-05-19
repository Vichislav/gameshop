import EventTask1 from './(components)/eventtask1'
import prisma from '@/lib/prisma'
import {
  type EventTaskLines,
  parseEventTaskLines,
} from '@/lib/event-task-lines'

export const dynamic = 'force-dynamic'

export interface EventProps {
  id: number
  tasksLines: EventTaskLines
  taskKey: string
}

/** Пример задачи 1 — токены по строкам (как eventtask2) */
export const mockEventTask1: EventProps = {
  id: 1,
  tasksLines: [
    ['console', '.', 'log', '&#40;', '&nbsp;1&nbsp;', '&#41;'],
    [
      'setTimeout',
      '&#40;',
      '&#40;purple',
      '&#41;purple',
      '&nbsp;=&gt;&nbsp;',
      'console',
      '.',
      'log',
      '&#40;',
      '&nbsp;2&nbsp;',
      '&#41;',
      ',&nbsp;1000',
      '&#41;',
    ],
    ['console', '.', 'log', '&#40;', '&nbsp;3&nbsp;', '&#41;'],
    [
      'setTimeout',
      '&#40;',
      '&#40;purple',
      '&#41;purple',
      '&nbsp;=&gt;&nbsp;',
      'console',
      '.',
      'log',
      '&#40;',
      '&nbsp;4&nbsp;',
      '&#41;',
    ],
    ['console', '.', 'log', '&#40;', '&nbsp;5&nbsp;', '&#41;'],
  ],
  taskKey: '13542',
}

/** Задача 2 — Promise / setTimeout (eventtask2), ответ: 1735264 */
export const mockEventTask2: EventProps = {
  id: 2,
  tasksLines: [
    ['console', '.', 'log', '&#40;purple', '&nbsp;1&nbsp;', '&#41;purple'],
    [
      'setTimeout',
      '&#40;',
      '&#40;purple',
      '&#41;purple',
      '&nbsp;=&gt;&nbsp;',
      'console',
      '.',
      'log',
      '&#40;purple',
      '&nbsp;2&nbsp;',
      '&#41;purple',
      '&#41;',
    ],
    [
      'Promise',
      '.',
      'resolve',
      '&#40;',
      '&#41;',
      '.',
      'then',
      '&#40;',
      '&#40;purple',
      '&#41;purple',
      '&nbsp;=&gt;&nbsp;',
      'console',
      '.',
      'log',
      '&#40;purple',
      '&nbsp;3&nbsp;',
      '&#41;purple',
      '&#41;',
    ],
    [
      [
        'Promise',
        '.',
        'resolve',
        '&#40;',
        '&#41;',
        '.',
        'then',
        '&#40;',
        '&#40;purple',
        '&#41;purple',
        '&nbsp;=&gt;&nbsp;',
        '&#123;',
      ],
      [
        'setTimeout',
        '&#40;',
        '&#40;purple',
        '&#41;purple',
        '&nbsp;=&gt;&nbsp;',
        'console',
        '.',
        'log',
        '&#40;purple',
        '&nbsp;4&nbsp;',
        '&#41;purple',
        '&#41;',
      ],
      ['&#125;', '&#41;'],
    ],
    [
      'Promise',
      '.',
      'resolve',
      '&#40;',
      '&#41;',
      '.',
      'then',
      '&#40;',
      '&#40;purple',
      '&#41;purple',
      '&nbsp;=&gt;&nbsp;',
      'console',
      '.',
      'log',
      '&#40;purple',
      '&nbsp;5&nbsp;',
      '&#41;purple',
      '&#41;',
    ],
    [
      'setTimeout',
      '&#40;',
      '&#40;purple',
      '&#41;purple',
      '&nbsp;=&gt;&nbsp;',
      'console',
      '.',
      'log',
      '&#40;purple',
      '&nbsp;6&nbsp;',
      '&#41;purple',
      '&#41;',
    ],
    ['console', '.', 'log', '&#40;purple', '&nbsp;7&nbsp;', '&#41;purple'],
  ],
  taskKey: '1735264',
}

/** Задача 3 — reject / new Promise (eventtask3), ответ: 1635274 */
export const mockEventTask3: EventProps = {
  id: 3,
  tasksLines: [
    ['console', '.', 'log', '&#40;purple', '&nbsp;1&nbsp;', '&#41;purple'],
    [
      'setTimeout',
      '&#40;',
      '&#40;purple',
      '&#41;purple',
      '&nbsp;=&gt;&nbsp;',
      'console',
      '.',
      'log',
      '&#40;purple',
      '&nbsp;2&nbsp;',
      '&#41;purple',
      '&#41;',
    ],
    [
      'Promise',
      '.',
      'reject',
      '&#40;',
      '3',
      '&#41;',
      '.',
      'catch',
      '&#40;',
      'console',
      '.',
      'log',
      '&#41;',
    ],
    [
      [
        'new &nbsp;',
        'Promise',
        '&#40;',
        'resolve',
        '&nbsp;=&gt;&nbsp;',
        'setTimeout',
        '&#40;purple',
        'resolve &nbsp;',
        ',',
        '&nbsp; 10',
        '&#41;purple',
        '&#41;',
      ],
      [
        '.',
        'then',
        '&#40;',
        '&#40;purple',
        '&#41;purple',
        '&nbsp;=&gt;&nbsp;',
        'console',
        '.',
        'log',
        '&#40;purple',
        '&nbsp;4&nbsp;',
        '&#41;purple',
        '&#41;',
      ],
    ],
    [
      'Promise',
      '.',
      'resolve',
      '&#40;',
      '5',
      '&#41;',
      '.',
      'then',
      '&#40;',
      'console',
      '.',
      'log',
      '&#41;',
    ],
    ['console', '.', 'log', '&#40;purple', '&nbsp;6&nbsp;', '&#41;purple'],
    [
      'setTimeout',
      '&#40;',
      '&#40;purple',
      '&#41;purple',
      '&nbsp;=&gt;&nbsp;',
      'console',
      '.',
      'log',
      '&#40;purple',
      '&nbsp;7&nbsp;',
      '&#41;purple',
      '&#41;',
    ],
  ],
  taskKey: '1635274',
}

async function getEventTasks(): Promise<EventProps[]> {
  const rows = await prisma.eventTask.findMany({
    orderBy: { id: 'asc' },
    select: {
      id: true,
      tasksLines: true,
      taskKey: true,
    },
  })

  return rows.map((row) => ({
    id: row.id,
    taskKey: row.taskKey,
    tasksLines: parseEventTaskLines(row.tasksLines),
  }))
}

export default async function EventLoopTask() {
  const tasks = await getEventTasks()

  return (
    <section
      className="flex flex-col w-[100%] gap-[20px] justify-start items-center 
        min-h-screen min-w-[100%] bg-gradient-to-tr from-slate-300 to-slate-100 gree
        p-4"
    >
      <h1 className=" text-center">Задачи по EventLoop</h1>
      {tasks.length === 0 ? (
        <>
          <EventTask1 {...mockEventTask1} />
          <EventTask1 {...mockEventTask2} />
          <EventTask1 {...mockEventTask3} />
        </>
      ) : (
        tasks.map((task) => <EventTask1 key={task.id} {...task} />)
      )}
    </section>
  )
}
