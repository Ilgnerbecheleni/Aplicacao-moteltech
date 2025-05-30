"use client"

import type React from "react"

import { usePathname } from "next/navigation"
import Sidebar from "@/components/sidebar"

interface ConditionalLayoutProps {
  children: React.ReactNode
}

export default function ConditionalLayout({ children }: ConditionalLayoutProps) {
  const pathname = usePathname()

  // Verifica se está na rota de detalhes da suite
  const isSuiteDetailsPage = pathname.startsWith("/suite/")

  if (isSuiteDetailsPage) {
    // Na página de detalhes da suite, não mostra sidebar
    return <main className="h-screen overflow-auto">{children}</main>
  }

  // Em outras páginas, mostra o layout normal com sidebar
  return (
    <div className="flex h-screen">
      <Sidebar />
      <main className="flex-1 overflow-auto">{children}</main>
    </div>
  )
}
