'use client'

import { useState } from 'react'
import { colors } from '../utils/theme'

interface CalendarDay {
  day: number
  height: string
  content: string
  isOpen: boolean
  isFlipping: boolean
}

export default function AdventCalendar() {
  const [calendar, setCalendar] = useState<CalendarDay[]>(() => {
    return Array.from({ length: 28 }, (_, i) => ({
      day: i + 1,
      height: ['h-48', 'h-56', 'h-64', 'h-72'][Math.floor(Math.random() * 4)],
      content: `Cadou pentru ziua ${i + 1}!`,
      isOpen: false,
      isFlipping: false
    }))
  })

  const handleDayClick = (day: number): void => {
    // Remove date checking temporarily
    // const today = new Date().getDate()
    // const isDecember = new Date().getMonth() === 11

    // if (!isDecember || day > today) {
    //   alert("You can't open this day yet!")
    //   return
    // }

    // Start flip animation
    setCalendar(prev => 
      prev.map(item => 
        item.day === day ? { ...item, isFlipping: true } : item
      )
    )

    // After flip animation, mark as open
    setTimeout(() => {
      setCalendar(prev => 
        prev.map(item => 
          item.day === day ? { ...item, isOpen: true, isFlipping: false } : item
        )
      )
    }, 600)
  }

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
                onClick={() => !day.isOpen && !day.isFlipping && handleDayClick(day.day)}
                className={`${day.height} relative rounded-lg shadow-2xl cursor-pointer 
                  preserve-3d perspective-1000 transition-transform duration-600
                  ${day.isFlipping ? 'rotate-y-180' : ''} 
                  ${day.isOpen ? 'rotate-y-180' : ''}`}
                style={{
                  transformStyle: 'preserve-3d',
                }}
              >
                {/* Front of card */}
                <div 
                  className={`absolute inset-0 w-full h-full backface-hidden rounded-lg
                    bg-white/90 backdrop-blur-sm hover:bg-white/95 border border-white/20
                    ${day.isOpen || day.isFlipping ? 'pointer-events-none' : ''}`}
                  style={{ backfaceVisibility: 'hidden' }}
                >
                  <div className="absolute inset-0 flex flex-col items-center justify-center p-6">
                    <span 
                      className="text-7xl font-bold bg-clip-text text-transparent"
                      style={{ 
                        background: colors.gradients.primary,
                        WebkitBackgroundClip: 'text'
                      }}
                    >
                      {day.day}
                    </span>
                    <div className="mt-6 flex space-x-2">
                      {Array.from({ length: 3 }).map((_, i) => (
                        <span 
                          key={i} 
                          className="w-3 h-3 rounded-full animate-bounce" 
                          style={{ 
                            background: colors.gradients.primary,
                            animationDelay: `${i * 200}ms` 
                          }} 
                        />
                      ))}
                    </div>
                  </div>
                  {!day.isOpen && !day.isFlipping && (
                    <div className="absolute inset-0 bg-white/50 backdrop-blur-sm 
                      flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300">
                      <div 
                        className="w-20 h-20 border-8 border-t-transparent rounded-full animate-spin"
                        style={{ borderColor: `${colors.red.main} transparent ${colors.red.main} ${colors.red.main}` }}
                      />
                    </div>
                  )}
                </div>

                {/* Back of card */}
                <div 
                  className="absolute inset-0 w-full h-full backface-hidden rounded-lg rotate-y-180"
                  style={{ 
                    backfaceVisibility: 'hidden',
                    background: colors.gradients.primary,
                  }}
                >
                  <div className="absolute inset-0 flex flex-col items-center justify-center p-6">
                    <span className="text-5xl font-bold mb-4" style={{ color: colors.background.primary }}>
                      {day.day}
                    </span>
                    <p className="text-center text-lg" style={{ color: colors.background.primary }}>
                      {day.content}
                    </p>
                    {/* <span className="text-6xl mt-4">🎄</span> */}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}