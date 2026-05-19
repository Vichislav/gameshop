'use client'
import { useEffect, useState } from 'react'
import React from 'react'
import { Task1Props } from '../page'

export default function Task1({ operands, operators, taskKey, id }: Task1Props) {
  const slotsCount = Math.max(0, operands.length - 1)
  const [currentValue, setCurrentValue] = useState<string[]>(
    Array.from({ length: slotsCount }, () => '...'),
  )

  const [rightActive] = useState<boolean>(false) //подсветить ли основное выражение, куда вставлять значение
  const [solving, setSolving] = useState<boolean>(false) // верно ли решено задание

  useEffect(() => {
    const sumString = operands
      .map((el, i) =>
        el +
        (i < currentValue.length && i < operands.length - 1
          ? currentValue[i]
          : ''),
      )
      .join('')

    if (sumString === taskKey) {
      setSolving(true)
    } else {
      setSolving(false)
    }
  }, [currentValue, operands, taskKey])

  useEffect(() => {
    setCurrentValue(Array.from({ length: slotsCount }, () => '...'))
  }, [slotsCount])

  return (
    <div
      className="w-[100%] lg:w-[80%] flex flex-col items-center gap-[10px] border-2  border-black rounded-[8px] "
      style={{ backgroundColor: solving ? '#7efca0' : 'white' }}
    >
      <div className=" w-full text-center bg-[#dde4ec] rounded-t-[5px]">
        <p className="text-sm px-2 py-1">
          Подставьте оператор таким образом, чтобы оно возвращало{' '}
          <span className="text-green-500">true</span>
        </p>
      </div>

      <div className="w-[100%] flex flex-col lg:flex-row justify-center items-center gap-[10px] p-5">
        <div className="flex h-[43%] gap-[2px] relative">
          {operands.map((operand: string, index: number) => {
            return (
              <React.Fragment key={`opertask${id}_${index}`}>
                <div className="flex justify-center items-center w-fit px-1 h-[40px]  lg:h-[45px] rounded-lg bg-white">
                  <p>{operand}</p>
                </div>
                {index < operands.length - 1 && (
                  <select
                    id={`operator_${index}`}
                    name="operSelect"
                    className={`appearance-none bg-transparent px-0 text-center w-[40px]  lg:w-[45px] border-2 border-gray-500 z-10 rounded-lg 
                                cursor-pointer ${rightActive ? 'animate-highlight' : ''}`}
                    onChange={(e) =>
                      setCurrentValue((currentValue) => {
                        const newCurrentValue = [...currentValue]
                        newCurrentValue[index] = e.target.value
                        return newCurrentValue
                      })
                    }
                  >
                    <option value="...">...</option>
                    {operators.map((operator: string) => (
                      <option
                        key={`${id}_${index}_${operator}`}
                        value={operator}
                      >
                        {operator}
                      </option>
                    ))}
                  </select>
                )}
              </React.Fragment>
            )
          })}

          {solving && <div className=" p-2">true!</div>}
        </div>
      </div>
    </div>
  )
}
