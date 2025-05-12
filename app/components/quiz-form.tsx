"use client"

import type React from "react"

import { useState } from "react"
import type { Question } from "../data/quiz-questions"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { CheckCircle, XCircle } from "lucide-react"
import { useTajenka } from "../context/tajenka-context"

interface QuizFormProps {
  question: Question
  onComplete: (correct: boolean) => void
}

export function QuizForm({ question, onComplete }: QuizFormProps) {
  const [selectedOption, setSelectedOption] = useState<number | null>(null)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const isCorrect = selectedOption === question.correctAnswer
  const { addLetter } = useTajenka()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (selectedOption === null) return

    setIsSubmitted(true)

    // Pokud je odpověď správná a existuje písmeno tajenky, přidáme ho
    if (isCorrect && question.letterReveal) {
      addLetter(question.letterReveal)
    }
  }

  return (
    <Card className="w-full max-w-3xl mx-auto">
      <CardHeader>
        <CardTitle className="text-xl font-serif text-[#8b4513]">{question.question}</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit}>
          <RadioGroup
            value={selectedOption?.toString()}
            onValueChange={(value) => !isSubmitted && setSelectedOption(Number.parseInt(value))}
            className="space-y-4"
          >
            {question.options.map((option, index) => (
              <div
                key={index}
                className={`flex items-start space-x-2 p-3 rounded-md ${
                  isSubmitted && selectedOption === index && selectedOption !== question.correctAnswer
                    ? "bg-red-50 border border-red-200"
                    : isSubmitted && selectedOption === index
                      ? "bg-green-50 border border-green-200"
                      : "hover:bg-gray-50"
                }`}
              >
                <RadioGroupItem
                  value={index.toString()}
                  id={`option-${index}`}
                  disabled={isSubmitted}
                  className="mt-1"
                />
                <div className="flex-1">
                  <Label htmlFor={`option-${index}`} className="text-base font-medium">
                    {option}
                  </Label>
                </div>
                {isSubmitted && selectedOption === index && selectedOption === question.correctAnswer && (
                  <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0" />
                )}
                {isSubmitted && selectedOption === index && selectedOption !== question.correctAnswer && (
                  <XCircle className="h-5 w-5 text-red-600 flex-shrink-0" />
                )}
              </div>
            ))}
          </RadioGroup>

          {!isSubmitted ? (
            <Button
              type="submit"
              className="mt-6 w-full bg-[#1a3056] hover:bg-[#142440]"
              disabled={selectedOption === null}
            >
              Potvrdit odpověď
            </Button>
          ) : (
            <div className="mt-6">
              {isCorrect ? (
                <div className="p-4 bg-green-50 border border-green-200 rounded-md text-green-800">
                  <p className="font-medium">Správně!</p>
                  {question.letterReveal && (
                    <p className="mt-2 font-bold">Získali jste písmeno tajenky: {question.letterReveal}</p>
                  )}
                </div>
              ) : (
                <div className="p-4 bg-red-50 border border-red-200 rounded-md text-red-800">
                  <p className="font-medium">Bohužel, to není správná odpověď.</p>
                </div>
              )}
            </div>
          )}
        </form>
      </CardContent>
      <CardFooter className="flex justify-end">
        {isSubmitted && (
          <Button onClick={() => onComplete(isCorrect)} className="bg-[#d4a935] hover:bg-[#c09830]">
            Pokračovat
          </Button>
        )}
      </CardFooter>
    </Card>
  )
}
