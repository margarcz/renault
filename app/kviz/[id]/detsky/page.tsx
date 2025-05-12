"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { PuzzleIcon as PuzzlePiece, CheckCircle, XCircle, ArrowLeft } from "lucide-react"
import { quizData } from "@/app/data/quiz-questions"
import { QuizForm } from "@/app/components/quiz-form"
import { Button } from "@/components/ui/button"
import { useTajenka } from "@/app/context/tajenka-context"

export default function DetskyKvizPage({ params }: { params: { id: string } }) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [score, setScore] = useState(0)
  const [completed, setCompleted] = useState(false)
  const { collectedLetters, isComplete, markLocationCompleted } = useTajenka()
  const tajenkaLetters = "PERMONÍK".split("")
  const collectedCount = tajenkaLetters.filter((letter) => collectedLetters[letter]).length

  const quizItem = quizData.find((item) => item.id === params.id)

  // Zjistíme, zda je toto poslední místo v seznamu
  const isLastLocation = params.id === "C"

  if (!quizItem) {
    return (
      <div className="min-h-screen flex flex-col bg-[#f8f5e4]">
        <header className="bg-[#1a3056] text-white p-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Image src="/images/logo-muzeum.png" alt="Logo muzea" width={32} height={32} />
            <span className="text-2xl font-serif text-[#d4a935]">Muzeum Jílové Quiz</span>
          </div>
        </header>
        <main className="flex-1 container mx-auto px-4 py-8 flex items-center justify-center">
          <div className="bg-white p-8 rounded-lg shadow-md">
            <h2 className="text-2xl font-serif text-[#8b4513] mb-4">Místo nenalezeno</h2>
            <p>Omlouváme se, ale hledané místo nebylo nalezeno.</p>
          </div>
        </main>
        <footer className="py-8 flex flex-col items-center">
          <Image src="/images/logo-muzeum.png" alt="Logo muzea" width={120} height={120} className="mb-4" />
          <p className="text-center text-gray-600 max-w-lg px-4">
            Otázky byly vytvořeny odborníky z Regionálního muzea v Jílovém u Prahy.
          </p>
        </footer>
      </div>
    )
  }

  const questions = quizItem.children
  const currentQuestion = questions[currentQuestionIndex]
  const isSuccess = score === questions.length

  const handleQuestionComplete = (correct: boolean) => {
    if (correct) {
      setScore(score + 1)
    }

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1)
    } else {
      setCompleted(true)
      // Označit lokaci jako dokončenou a určit, zda je úspěšná
      markLocationCompleted(params.id, score + (correct ? 1 : 0) === questions.length)
    }
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
          <Link href={`/kviz/${params.id}`}>
            <Button variant="outline" className="flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" />
              Zpět na výběr verze
            </Button>
          </Link>
        </div>

        <div className="mb-8">
          <h2 className="text-3xl font-serif text-[#8b4513] text-center">{quizItem.name}</h2>
          <p className="text-center text-gray-600">Dětská verze kvízu</p>
        </div>

        {questions.length === 0 ? (
          <div className="bg-white p-8 rounded-lg shadow-md max-w-3xl mx-auto text-center">
            <h3 className="text-xl font-serif text-[#8b4513] mb-4">Žádné otázky</h3>
            <p>Pro toto místo zatím nejsou k dispozici žádné otázky v dětské verzi.</p>
            <Link href={`/kviz/${params.id}`} className="mt-4 inline-block text-[#1a3056] hover:underline">
              Zpět na výběr verze
            </Link>
          </div>
        ) : completed ? (
          <div className="bg-white p-8 rounded-lg shadow-md max-w-3xl mx-auto text-center">
            <h3 className="text-2xl font-serif text-[#8b4513] mb-4">Kvíz dokončen!</h3>
            <div className="mb-6">
              {isSuccess ? (
                <CheckCircle className="h-16 w-16 text-green-600 mx-auto mb-4" />
              ) : (
                <XCircle className="h-16 w-16 text-red-600 mx-auto mb-4" />
              )}
              <p className="text-xl">
                Získali jste {score} z {questions.length} správných odpovědí
              </p>
              {score > 0 && (
                <p className="text-green-600 mt-2 font-bold">
                  Získali jste {score} {score === 1 ? "písmeno" : score < 5 ? "písmena" : "písmen"} tajenky!
                </p>
              )}
              <p className="text-gray-600 mt-2">
                {isSuccess
                  ? "Výborně! Získali jste plný počet bodů!"
                  : score > questions.length / 2
                    ? "Dobrá práce! Většinu otázek jste zodpověděli správně."
                    : "Zkuste to znovu a zlepšete své skóre!"}
              </p>
            </div>

            {/* Zobrazení permoníka a odkazu na tajenku na poslední lokaci */}
            {isLastLocation && (
              <div className="mt-8 p-6 bg-[#f8f5e4] border-2 border-[#d4a935] rounded-lg">
                <h4 className="text-xl font-serif text-[#8b4513] mb-4">Dokončili jste poslední místo!</h4>
                <div className="flex flex-col md:flex-row items-center justify-center gap-6">
                  <div className="w-48">
                    <Image
                      src="/images/permonik-kresba.png"
                      alt="Permoník"
                      width={200}
                      height={300}
                      className="mx-auto"
                    />
                  </div>
                  <div className="text-left">
                    <p className="mb-4">
                      Gratulujeme! Prošli jste všechna místa a nyní můžete vyřešit tajenku a odhalit, kdo je tajemný
                      obyvatel zdejších dolů.
                    </p>
                    <Link href="/tajenka">
                      <Button className="bg-[#d4a935] hover:bg-[#c09830] text-white">Vyřešit tajenku</Button>
                    </Link>
                  </div>
                </div>
              </div>
            )}

            <div className="flex justify-center mt-6">
              <Button
                onClick={() => {
                  setCurrentQuestionIndex(0)
                  setScore(0)
                  setCompleted(false)
                }}
                className="bg-[#1a3056] hover:bg-[#142440] mr-4"
              >
                Zkusit znovu
              </Button>
              <Link href="/mista">
                <Button className="bg-[#2a8d63] hover:bg-[#1f7a52]">Zpět na cestu</Button>
              </Link>
            </div>
          </div>
        ) : (
          <>
            <div className="mb-6 flex justify-between items-center max-w-3xl mx-auto">
              <span className="text-sm text-gray-600">
                Otázka {currentQuestionIndex + 1} z {questions.length}
              </span>
              <span className="text-sm text-gray-600">
                Správných odpovědí: {score}/{questions.length}
              </span>
            </div>
            <QuizForm question={currentQuestion} onComplete={handleQuestionComplete} />
          </>
        )}
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
