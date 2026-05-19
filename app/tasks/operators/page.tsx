import Task1 from './(components)/task1'
import prisma from '@/lib/prisma'

export const dynamic = 'force-dynamic'

export interface Task1Props {  
  id: number // id задания
  operands: string[] // [undefined, 42]
  operators: string[] // ['>', '||', '&&']
  taskKey: string // key задания
}



async function getOperTasks(): Promise<Task1Props[]> {
  const rows = await prisma.operTask.findMany({
    orderBy: { id: 'asc' },
    select: {
      id: true,
      operands: true,
      operators: true,
      taskKey: true,
    },
  })
  return rows
}

export default async function Operators() {
  const tasks = await getOperTasks()

  //className={`border-2 rounded p-2 border-gray-300 ${ isHighlighted ? 'animate-highlight' : ''}`}

  return (
    <section
      className="flex flex-col w-[100%] gap-[20px] justify-start items-center 
        min-h-screen min-w-[100%] bg-gradient-to-tr from-slate-300 to-slate-100 gree
        p-4"
    >
      {tasks.length === 0 ? (
        <p className="text-sm text-slate-700">Задач пока нет</p>
      ) : (
        tasks.map((task) => <Task1 key={task.id} {...task} />)
      )}
   
    </section>
  )
}
