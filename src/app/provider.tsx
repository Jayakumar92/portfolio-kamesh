"use client"

import { ThemeProvider } from "@/themes/provider"

import { AppProvider } from "@/contexts/app"

type ProviderProps = {
  children: React.ReactNode
}

function Provider({ children }: ProviderProps) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="light"
      enableSystem
      disableTransitionOnChange
    >
      <AppProvider>{children}</AppProvider>
    </ThemeProvider>
  )
}

export { Provider }
