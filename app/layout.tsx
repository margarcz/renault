import type React from "react"
import "./globals.css"
import { Inter } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import { TajenkaProvider } from "./context/tajenka-context"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "Muzeum Jílové Quiz",
  description: "Interaktivní kvíz Regionálního muzea Jílové u Prahy",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="cs">
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="light">
          <TajenkaProvider>{children}</TajenkaProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
