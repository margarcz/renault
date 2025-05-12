"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

type ScoreContextType = {
  score: number
  totalLocations: number
  addPoints: (points: number) => void
  resetScore: () => void
}

const ScoreContext = createContext<ScoreContextType | undefined>(undefined)

export function ScoreProvider({ children, totalLocations = 15 }: { children: ReactNode; totalLocations?: number }) {
  const [score, setScore] = useState(0)

  // Načtení skóre z localStorage při inicializaci
  useEffect(() => {
    const savedScore = localStorage.getItem("quizScore")
    if (savedScore) {
      setScore(Number.parseInt(savedScore))
    }
  }, [])

  // Uložení skóre do localStorage při změně
  useEffect(() => {
    localStorage.setItem("quizScore", score.toString())
  }, [score])

  const addPoints = (points: number) => {
    setScore((prevScore) => prevScore + points)
  }

  const resetScore = () => {
    setScore(0)
  }

  return (
    <ScoreContext.Provider value={{ score, totalLocations, addPoints, resetScore }}>{children}</ScoreContext.Provider>
  )
}

export function useScore() {
  const context = useContext(ScoreContext)
  if (context === undefined) {
    throw new Error("useScore must be used within a ScoreProvider")
  }
  return context
}
