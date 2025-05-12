"use client"

import Image from "next/image"
import Link from "next/link"
import { PuzzleIcon as PuzzlePiece } from "lucide-react"
import { useTajenka } from "./context/tajenka-context"

export default function HomePage() {
  const { collectedLetters, isComplete } = useTajenka()
  const tajenkaLetters = "PERMONÍK".split("")
  const collectedCount = tajenkaLetters.filter((letter) => collectedLetters[letter]).length

  return (
    <div className="min-h-screen flex flex-col bg-[#f8f5e4]">
      {/* Header */}
      <header className="bg-[#1a3056] text-white p-4 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Image src="/images/logo-muzeum.png" alt="Logo muzea" width={32} height={32} />
          <h1 className="text-2xl font-serif text-[#d4a935]">Muzeum Jílové Quiz</h1>
        </div>
        <div className="flex items-center gap-2">
          <PuzzlePiece className="h-5 w-5 text-[#d4a935]" />
          <span className="text-sm">
            Písmena tajenky: {collectedCount}/{tajenkaLetters.length}
          </span>
          {isComplete && (
            <Link href="/tajenka" className="ml-2 text-[#d4a935] hover:underline">
              Zobrazit tajenku
            </Link>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 container mx-auto px-4 py-8 flex flex-col items-center">
        <h2 className="text-4xl font-serif text-[#8b4513] text-center mb-8">Kvízová hra Jílové u Prahy</h2>

        {/* Logo */}
        <div className="mb-8">
          <Image src="/images/logo-muzeum.png" alt="Logo muzea" width={120} height={120} />
        </div>

        {/* Description */}
        <div className="text-center max-w-2xl mb-12">
          <p className="mb-4">Vítejte v interaktivním kvízu Regionálního muzea v Jílovém u Prahy!</p>
          <p className="mb-4">
            Prozkoumejte 8 zajímavých míst, otestujte své znalosti a objevte kouzlo zlatokopecké historie.
          </p>
        </div>

        {/* Tajenka */}
        <div className="bg-white rounded-lg shadow-md p-6 w-full max-w-xl mb-8">
          <h3 className="text-xl font-serif text-[#8b4513] mb-4 text-center">Tajenka</h3>
          <div className="flex justify-center gap-2 mb-4">
            {tajenkaLetters.map((letter, index) => (
              <div
                key={index}
                className={`w-10 h-10 flex items-center justify-center border-2 ${
                  collectedLetters[letter] ? "border-green-500 bg-green-50" : "border-gray-300"
                } rounded-md text-xl font-bold`}
              >
                {collectedLetters[letter] ? letter : "?"}
              </div>
            ))}
          </div>
          <p className="text-center text-sm text-gray-600">
            Sbírejte písmena tajenky odpovídáním na otázky v kvízu. Po získání všech písmen se vám odhalí tajenka.
          </p>
        </div>

        {/* Start Button */}
        <Link
          href="/mista"
          className="bg-white rounded-lg shadow-md p-6 w-full max-w-xl mb-8 text-center hover:shadow-lg transition-all"
        >
          <span className="text-[#8b4513] text-xl font-serif hover:text-[#d4a935] transition-colors">
            Začněte svou cestu
          </span>
        </Link>

        {/* Action Buttons */}
      </main>

      {/* Footer */}
      <footer className="py-8 flex flex-col items-center">
        <Image src="/images/logo-muzeum.png" alt="Logo muzea" width={120} height={120} className="mb-4" />
        <p className="text-center text-black font-medium max-w-lg px-4">
          Otázky byly vytvořeny odborníky z Regionálního muzea v Jílovém u Prahy</p>
      </footer>
    </div>
  )
}
