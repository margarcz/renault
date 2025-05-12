"use client"

import { useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { PuzzleIcon as PuzzlePiece } from "lucide-react"
import { useTajenka } from "../context/tajenka-context"
import { Button } from "@/components/ui/button"

export default function TajenkaPage() {
  const { collectedLetters, isComplete } = useTajenka()
  const tajenkaLetters = "PERMONÍK".split("")
  const collectedCount = tajenkaLetters.filter((letter) => collectedLetters[letter]).length

  // Přesměrování, pokud uživatel nemá všechna písmena
  useEffect(() => {
    if (!isComplete) {
      // V reálné aplikaci bychom použili router.push('/mista')
      // Ale pro jednoduchost necháme stránku zobrazit zprávu
    }
  }, [isComplete])

  return (
    <div className="min-h-screen flex flex-col bg-[#f8f5e4]">
      {/* Header */}
      <header className="bg-[#1a3056] text-white p-4 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Link href="/mista" className="flex items-center gap-2">
            <Image src="/images/logo-muzeum.png" alt="Logo muzea" width={32} height={32} />
            <h1 className="text-2xl font-serif text-[#d4a935]">Muzeum Jílové Quiz</h1>
          </Link>
        </div>
        <div className="flex items-center gap-2">
          <PuzzlePiece className="h-5 w-5 text-[#d4a935]" />
          <span className="text-sm">
            Písmena tajenky: {collectedCount}/{tajenkaLetters.length}
          </span>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 container mx-auto px-4 py-8">
        {!isComplete ? (
          <div className="bg-white p-8 rounded-lg shadow-md max-w-3xl mx-auto text-center">
            <h2 className="text-2xl font-serif text-[#8b4513] mb-4">Tajenka není kompletní</h2>
            <p className="mb-6">
              Ještě jste nesebrali všechna písmena tajenky. Pokračujte v řešení kvízů, abyste odhalili celou tajenku.
            </p>
            <Link href="/mista">
              <Button className="bg-[#1a3056] hover:bg-[#142440]">Zpět na místa</Button>
            </Link>
          </div>
        ) : (
          <div className="bg-white p-8 rounded-lg shadow-md max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-serif text-[#8b4513] mb-6">Gratulujeme! Odhalili jste tajenku!</h2>

            <div className="flex justify-center gap-2 mb-8">
              {tajenkaLetters.map((letter, index) => (
                <div
                  key={index}
                  className="w-14 h-14 flex items-center justify-center border-2 border-green-500 bg-green-50 rounded-md text-2xl font-bold"
                >
                  {letter}
                </div>
              ))}
            </div>

            <div className="mb-8 flex justify-center">
              <div className="max-w-md">
                <Image
                  src="/images/permonik-kresba.png"
                  alt="Permoník"
                  width={250}
                  height={350}
                  className="mx-auto mb-4"
                />
                <p className="text-sm text-gray-500 italic">Permoník - bájný ochránce horníků</p>
              </div>
            </div>

            <div className="mb-8">
              <h3 className="text-xl font-serif text-[#8b4513] mb-4">Kdo je permoník?</h3>
              <p className="text-gray-700 mb-4">
                Permoník je bájná bytost z hornické mytologie. Jedná se o malého skřítka, který žije v dolech a pomáhá
                horníkům. Podle pověstí permoníci varovali horníky před nebezpečím, ukazovali jim bohatá naleziště nebo
                jim pomáhali v práci.
              </p>
              <p className="text-gray-700">
                V oblasti Jílovska, kde se po staletí těžilo zlato, jsou pověsti o permonících součástí místního
                folklóru a kulturního dědictví.
              </p>
            </div>

            <Link href="/mista">
              <Button className="bg-[#1a3056] hover:bg-[#142440]">Zpět na místa</Button>
            </Link>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="py-8 flex flex-col items-center">
        <Image src="/images/logo-muzeum.png" alt="Logo muzea" width={120} height={120} className="mb-4" />
        <p className="text-center text-gray-600 max-w-lg px-4">
          Otázky byly vytvořeny odborníky z Regionálního muzea v Jílovém u Prahy
        </p>
      </footer>
    </div>
  )
}
