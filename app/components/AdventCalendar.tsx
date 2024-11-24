'use client'

import { useState } from 'react'

interface CalendarDay {
  day: number
  height: string
  content: string
  isOpen: boolean
}

export default function AdventCalendar() {
  const [calendar, setCalendar] = useState<CalendarDay[]>(() => {
    // Generate 24 days with random heights
    return Array.from({ length: 24 }, (_, i) => ({
      day: i + 1,
      height: ['h-48', 'h-56', 'h-64', 'h-72'][Math.floor(Math.random() * 4)],
      content: `Surprise for day ${i + 1}!`,
      isOpen: false
    }))
  })

  const handleDayClick = (day: number) => {
    const today = new Date().getDate()
    const isDecember = new Date().getMonth() === 11

    if (!isDecember || day > today) {
      alert("You can't open this day yet!")
      return
    }

    setCalendar(prev => 
      prev.map(item => 
        item.day === day ? { ...item, isOpen: true } : item
      )
    )
  }

  // Split calendar into 4 columns
  const columns = [[], [], [], []] as CalendarDay[][]
  calendar.forEach((day, i) => {
    columns[i % 4].push(day)
  })

  return (
    <div className="w-full max-w-7xl mx-auto p-4 sm:p-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {columns.map((column, columnIndex) => (
          <div key={columnIndex} className="space-y-6">
            {column.map((day) => (
              <div
                key={day.day}
                onClick={() => handleDayClick(day.day)}
                className={`${day.height} relative rounded-lg shadow-2xl transition-all duration-500 cursor-pointer 
                  ${day.isOpen 
                    ? 'bg-gradient-to-br from-green-600 to-red-600 text-white transform hover:scale-105' 
                    : 'bg-white/90 backdrop-blur-sm hover:bg-white/95 border border-white/20'
                  }`}
              >
                <div className="absolute inset-0 flex flex-col items-center justify-center p-6">
                  {day.isOpen ? (
                    <>
                      <span className="text-5xl font-bold mb-4">{day.day}</span>
                      <p className="text-center text-lg">{day.content}</p>
                      <span className="text-6xl mt-4">🎄</span>
                    </>
                  ) : (
                    <>
                      <span className="text-7xl font-bold bg-gradient-to-br from-red-600 to-green-600 text-transparent bg-clip-text">
                        {day.day}
                      </span>
                      <div className="mt-6 flex space-x-2">
                        {Array.from({ length: 3 }).map((_, i) => (
                          <span 
                            key={i} 
                            className="w-3 h-3 rounded-full bg-gradient-to-r from-red-500 to-green-500 animate-bounce" 
                            style={{ animationDelay: `${i * 200}ms` }} 
                          />
                        ))}
                      </div>
                    </>
                  )}
                </div>
                {!day.isOpen && (
                  <div className="absolute inset-0 bg-white/50 backdrop-blur-sm 
                    flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300">
                    <div className="w-20 h-20 border-8 border-red-600 border-t-transparent 
                      rounded-full animate-spin" />
                  </div>
                )}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}