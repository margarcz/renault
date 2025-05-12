"use client"

import Link from "next/link"
import Image from "next/image"
import { PuzzleIcon as PuzzlePiece, ArrowLeft } from "lucide-react"
import { useTajenka } from "@/app/context/tajenka-context"
import { Button } from "@/components/ui/button"

// Data míst - stejná jako na stránce s místy
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

export default function KvizPage({ params }: { params: { id: string } }) {
  const { collectedLetters, isComplete } = useTajenka()
  const tajenkaLetters = "PERMONÍK".split("")
  const collectedCount = tajenkaLetters.filter((letter) => collectedLetters[letter]).length

  const misto = mista.find((m) => m.id === params.id) || {
    id: params.id,
    name: "Neznámé místo",
    coords: { lat: "", lng: "" },
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#f8f5e4]">
      {/* Header */}
      <header className="bg-[#1a3056] text-white p-4 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Image src="/images/logo-muzeum.png" alt="Logo muzea" width={32} height={32} />
          <span className="text-2xl font-serif text-[#d4a935]">Muzeum Jílové Quiz</span>
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
      <main className="flex-1 container mx-auto px-4 py-8">
        {/* Tlačítko Zpět na cestu */}
        <div className="mb-6">
          <Link href="/mista">
            <Button variant="outline" className="flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" />
              Zpět na cestu
            </Button>
          </Link>
        </div>

        <div className="bg-white rounded-lg shadow-md p-8 max-w-3xl mx-auto">
          <div
            className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 ${misto.special ? "bg-[#d45735]" : "bg-[#2a8d63]"}`}
          >
            <span className="text-white font-bold text-2xl">{misto.id}</span>
          </div>

          <h2 className="text-3xl font-serif text-[#8b4513] text-center mb-6">{misto.name}</h2>

          <div className="text-center mb-8">
            <p className="text-sm text-gray-600">
              GPS: N {misto.coords.lat}, E {misto.coords.lng}
            </p>
          </div>

          <div className="space-y-6">
            <h3 className="text-xl font-serif text-[#8b4513] text-center">Vyberte verzi kvízu</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Link
                href={`/kviz/${params.id}/detsky`}
                className="bg-[#2a8d63] text-white py-4 px-6 rounded-lg text-center hover:bg-[#1f7a52] transition-colors"
              >
                Verze pro děti
              </Link>

              <Link
                href={`/kviz/${params.id}/dospely`}
                className="bg-[#1a3056] text-white py-4 px-6 rounded-lg text-center hover:bg-[#142440] transition-colors"
              >
                Verze pro dospělé
              </Link>
            </div>

            <p className="text-center text-sm text-gray-600 mt-4">Vyberte verzi kvízu podle věku a znalostí</p>
          </div>
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
