"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

type LocationStatus = {
  completed: boolean
  success: boolean // true pokud byla odpověď správná, false pokud špatná
}

type TajenkaContextType = {
  collectedLetters: { [key: string]: boolean }
  completedLocations: { [key: string]: LocationStatus }
  addLetter: (letter: string) => void
  markLocationCompleted: (locationId: string, success: boolean) => void
  isLocationCompleted: (locationId: string) => boolean
  isLocationSuccess: (locationId: string) => boolean
  resetLetters: () => void
  isComplete: boolean
}

const TajenkaContext = createContext<TajenkaContextType | undefined>(undefined)

export function TajenkaProvider({ children }: { children: ReactNode }) {
  const [collectedLetters, setCollectedLetters] = useState<{ [key: string]: boolean }>({})
  const [completedLocations, setCompletedLocations] = useState<{ [key: string]: LocationStatus }>({})

  // Načtení písmen a dokončených lokací z localStorage při inicializaci
  useEffect(() => {
    const savedLetters = localStorage.getItem("tajenkaLetters")
    if (savedLetters) {
      setCollectedLetters(JSON.parse(savedLetters))
    }

    const savedLocations = localStorage.getItem("completedLocations")
    if (savedLocations) {
      try {
        // Pokus o načtení nového formátu
        setCompletedLocations(JSON.parse(savedLocations))
      } catch (e) {
        // Pokud selže, předpokládáme starý formát a převedeme ho
        const oldLocations = JSON.parse(savedLocations) as { [key: string]: boolean }
        const newLocations: { [key: string]: LocationStatus } = {}
        Object.keys(oldLocations).forEach((key) => {
          newLocations[key] = { completed: true, success: true }
        })
        setCompletedLocations(newLocations)
      }
    }
  }, [])

  // Uložení písmen a dokončených lokací do localStorage při změně
  useEffect(() => {
    localStorage.setItem("tajenkaLetters", JSON.stringify(collectedLetters))
  }, [collectedLetters])

  useEffect(() => {
    localStorage.setItem("completedLocations", JSON.stringify(completedLocations))
  }, [completedLocations])

  const addLetter = (letter: string) => {
    setCollectedLetters((prev) => ({ ...prev, [letter]: true }))
  }

  const markLocationCompleted = (locationId: string, success: boolean) => {
    setCompletedLocations((prev) => ({
      ...prev,
      [locationId]: { completed: true, success },
    }))
  }

  const isLocationCompleted = (locationId: string) => {
    return completedLocations[locationId]?.completed || false
  }

  const isLocationSuccess = (locationId: string) => {
    return completedLocations[locationId]?.success || false
  }

  const resetLetters = () => {
    setCollectedLetters({})
    setCompletedLocations({})
  }

  // Kontrola, zda jsou všechna písmena tajenky "PERMONÍK" sebrána
  const isComplete = "PERMONÍK".split("").every((letter) => collectedLetters[letter])

  return (
    <TajenkaContext.Provider
      value={{
        collectedLetters,
        completedLocations,
        addLetter,
        markLocationCompleted,
        isLocationCompleted,
        isLocationSuccess,
        resetLetters,
        isComplete,
      }}
    >
      {children}
    </TajenkaContext.Provider>
  )
}

export function useTajenka() {
  const context = useContext(TajenkaContext)
  if (context === undefined) {
    throw new Error("useTajenka must be used within a TajenkaProvider")
  }
  return context
}
