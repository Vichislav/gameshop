import EventTask1 from './(components)/eventtask1'
import {
  mockEventTask1,
  mockEventTask2,
  mockEventTask3,
} from './event-task-mocks'
import type { EventProps } from './event-task-types'
import prisma from '@/lib/prisma'
import { parseEventTaskLines } from '@/lib/event-task-lines'

export const dynamic = 'force-dynamic'

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
