'use client'

import { useEffect, useState, type KeyboardEvent } from 'react'
import type { EventProps } from '../event-task-types'
import { buildEventLineHtml, prepareTaskLineHtml } from '@/lib/event-task-lines'

export default function EventTask1({ id, tasksLines, taskKey }: EventProps) {
  const countLines = tasksLines.length

  const [solving, setSolving] = useState<boolean>(false)
  const [data, setData] = useState<string[]>(
    Array.from({ length: countLines }, () => '...'),
  )
  const [activ, setActiv] = useState<boolean[]>(
    Array.from({ length: countLines }, () => true),
  )
  const [count, setCount] = useState<number>(0)

  const dataHandler = (ind: number) => {
    setData((data) => {
      const newData = [...data]
      newData[count] = `${ind + 1}`
      return newData
    })
    setCount((prev) => prev + 1)
    activHandler(ind)
  }

  const activHandler = (ind: number) => {
    setActiv((activ) => {
      const newArr = [...activ]
      newArr[ind] = false
      return newArr
    })
  }

  const onStart = () => {
    setData(Array.from({ length: countLines }, () => '...'))
    setActiv(Array.from({ length: countLines }, () => true))
    setCount(0)
  }

  useEffect(() => {
    const currentSolving = data.join('')
    setSolving(currentSolving === taskKey)
  }, [data, taskKey])

  useEffect(() => {
    setData(Array.from({ length: countLines }, () => '...'))
    setActiv(Array.from({ length: countLines }, () => true))
    setCount(0)
  }, [countLines])

  return (
    <div
      className="w-[100%] lg:w-[80%] flex flex-col items-center gap-[10px] border-2  border-black rounded-[8px] "
      style={{ backgroundColor: solving ? '#7efca0' : 'white' }}
    >
      <div className=" w-full text-center bg-[#dde4ec] rounded-t-[5px]">
        <p className="text-sm px-2 py-1">
          Определите последовательность выполнения кода, нажатием на
          соответсвующую строку
        </p>
      </div>

      <div className="flex w-full justify-around">
        <div className="flex flex-col text-[10px] leading-8 md:text-sm lg:text-base">
          {tasksLines.map((lineTokens, index) => (
            <div
              key={`eventTask_${id}_${index}`}
              role="button"
              tabIndex={0}
              className="cursor-pointer"
              style={{ backgroundColor: activ[index] ? 'white' : '#c0bfbf' }}
              onClick={() => dataHandler(index)}
              onKeyDown={(e: KeyboardEvent<HTMLDivElement>) => {
                if (e.key === 'Enter' || e.key === ' ') dataHandler(index)
              }}
              dangerouslySetInnerHTML={{
                __html: prepareTaskLineHtml(buildEventLineHtml(lineTokens)),
              }}
            />
          ))}
        </div>

        <div className="flex flex-col w-[20px] justify-center items-center pb-2">
          {data.map((item, index) => (
            <div key={`eventData${index}`}>{item}</div>
          ))}
          <div className="cursor-pointer" onClick={() => onStart()}>
            &#10060;
          </div>
        </div>
      </div>

      {solving && <div className=" p-2">true!</div>}
    </div>
  )
}
