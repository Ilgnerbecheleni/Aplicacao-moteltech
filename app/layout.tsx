import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"

import ConditionalLayout from "@/components/conditional-layout"
import { ServiceIdProvider } from "@/contexts/ServiceIdContext"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "MotelTech",
  description: "Sistema de gerenciamento para motéis",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body className={`${inter.className} bg-[#121212] text-white`}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false} disableTransitionOnChange>
         <ServiceIdProvider>
          <ConditionalLayout>{children}</ConditionalLayout>
         </ServiceIdProvider>
            
         
        </ThemeProvider>
      </body>
    </html>
  )
}
