"use client"

import React, { useState } from "react"

import { AppContext } from "../context"

type AppProviderProps = {
  children?: React.ReactNode
}

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const [show, setShowLoader] = useState(false)
  return (
    <AppContext.Provider
      value={{
        show,
        setShowLoader,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}
