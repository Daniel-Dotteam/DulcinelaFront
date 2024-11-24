'use client'

import { useEffect } from 'react'

export default function Snowfall() {
  useEffect(() => {
    const createSnowflake = () => {
      const snowflake = document.createElement('div')
      snowflake.classList.add('snowflake')
      snowflake.style.left = Math.random() * 100 + 'vw'
      snowflake.style.animationDuration = Math.random() * 3 + 2 + 's'
      snowflake.style.opacity = (Math.random() * 0.6 + 0.4).toString()
      snowflake.innerHTML = '❄'

      snowflake.addEventListener('animationend', () => {
        snowflake.remove()
      })

      return snowflake
    }

    const snowfall = document.getElementById('snowfall')
    const numberOfSnowflakes = 50
    let isActive = true

    for (let i = 0; i < numberOfSnowflakes; i++) {
      if (snowfall) {
        snowfall.appendChild(createSnowflake())
      }
    }

    const createNewSnowflake = () => {
      if (isActive && snowfall) {
        snowfall.appendChild(createSnowflake())
        setTimeout(createNewSnowflake, 200)
      }
    }

    createNewSnowflake()

    return () => {
      isActive = false
      if (snowfall) {
        snowfall.innerHTML = ''
      }
    }
  }, [])

  return (
    <>
      <style jsx global>{`
        .snowflake {
          position: fixed;
          top: -10px;
          font-size: 20px;
          color: white;
          text-shadow: 0 0 5px rgba(255, 255, 255, 0.3);
          animation: fall linear forwards;
          z-index: 1;
        }

        @keyframes fall {
          from {
            transform: translateY(-10px) rotate(0deg);
          }
          to {
            transform: translateY(105vh) rotate(360deg);
          }
        }
      `}</style>
      <div id="snowfall" className="fixed top-0 left-0 w-full h-full pointer-events-none" />
    </>
  )
} 