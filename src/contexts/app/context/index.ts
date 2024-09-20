"use client"

import { createContext, useContext } from "react"

export const AppContext = createContext({})

type Props = {
  show?: boolean
  setShowLoader?: React.Dispatch<React.SetStateAction<boolean>>
}

export const useApp = () => useContext<Props>(AppContext)
