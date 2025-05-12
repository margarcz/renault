"use client"

import Link from "next/link"
import Image from "next/image"
import { PuzzleIcon, CheckCircle, XCircle } from "lucide-react"
import { useTajenka } from "../context/tajenka-context"

// Data míst
const mista = [
  { id: "1", name: "Masarykovo náměstí v Jílovém u Prahy", coords: { lat: "49.887843", lng: "14.488000" } },
  { id: "2", name: "U sv. Anny", coords: { lat: "49.887843", lng: "14.488000" } },
  { id: "7", name: "Doly Šlojířského pásma", coords: { lat: "49.889445", lng: "14.481906" } },
  { id: "6", name: "Vyhlídka Pepř", coords: { lat: "49.887274", lng: "14.483373" } },
  { id: "5", name: "Důl Pepř s úpravnou", coords: { lat: "49.883245", lng: "14.480792" } },
  { id: "A", name: "Bejčkova strouha", coords: { lat: "49.881897", lng: "14.485861" }, special: true },
  { id: "B", name: "Žilníky klobáského pásma", coords: { lat: "49.877964", lng: "14.482590" }, special: true },
  {
    id: "C",
    name: "Štoly sv. Josefa a sv. Antonína Paduánského",
    coords: { lat: "49.874550", lng: "14.484323" },
    special: true,
  },
]

export default function MistaPage() {
  const { collectedLetters, isComplete, isLocationCompleted, isLocationSuccess } = useTajenka()
  const tajenkaLetters = "PERMONÍK".split("")
  const collectedCount = tajenkaLetters.filter((letter) => collectedLetters[letter]).length

  return (
    <div className="min-h-screen flex flex-col bg-[#f8f5e4]">
      {/* Header */}
      <header className="bg-[#1a3056] text-white p-4 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center gap-2">
            <Image src="/images/logo-muzeum.png" alt="Logo muzea" width={32} height={32} />
            <h1 className="text-2xl font-serif text-[#d4a935]">Muzeum Jílové Quiz</h1>
          </Link>
        </div>
        <div className="flex items-center gap-2">
          <PuzzleIcon className="h-5 w-5 text-[#d4a935]" />
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
      <main className="flex-1 container mx-auto px-4 py-8">
        <h2 className="text-4xl font-serif text-[#8b4513] text-center mb-8">Kvízová místa</h2>

        <p className="text-center mb-8">
          Zde jsou všechna kvízová místa. Klikněte na kartu pro přístup k otázkám dané lokace.
        </p>

        {/* Tajenka */}
        <div className="bg-white border border-[#d4a935] rounded-lg p-6 mb-8">
          <h3 className="text-xl font-serif text-[#8b4513] mb-4">Tajenka</h3>
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

        {/* Seznam míst */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mista.map((misto) => (
            <Link
              key={misto.id}
              href={`/kviz/${misto.id}`}
              className="border border-[#d4a935] rounded-lg overflow-hidden bg-white hover:shadow-lg transition-shadow p-4 text-center relative"
            >
              <div
                className={`w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-2 ${misto.special ? "bg-[#d45735]" : "bg-[#2a8d63]"}`}
              >
                <span className="text-white font-bold text-lg">{misto.id}</span>
              </div>
              <h3 className="font-serif text-lg mb-2">{misto.name}</h3>

              {/* Ikona pro dokončená místa - fajfka pro úspěch, křížek pro neúspěch */}
              {isLocationCompleted(misto.id) && (
                <div className="absolute top-2 right-2">
                  {isLocationSuccess(misto.id) ? (
                    <CheckCircle className="h-6 w-6 text-green-600" />
                  ) : (
                    <XCircle className="h-6 w-6 text-red-600" />
                  )}
                </div>
              )}
            </Link>
          ))}
        </div>
      </main>

      {/* Footer */}
      <footer className="py-8 flex flex-col items-center">
        <Image src="/images/logo-muzeum.png" alt="Logo muzea" width={120} height={120} className="mb-4" />
        <p className="text-center text-gray-600 max-w-lg px-4">
          Otázky byly vytvořeny odborníky z Regionálního muzea v Jílovém u Prahy.
        </p>
      </footer>
    </div>
  )
}
