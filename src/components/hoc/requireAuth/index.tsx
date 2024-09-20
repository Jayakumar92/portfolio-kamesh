"use client"

import { ComponentType, useEffect } from "react"
import { redirect } from "next/navigation"

interface AuthProps {
  [key: string]: unknown
}

export function requireAuth<T extends AuthProps>(Component: ComponentType<T>) {
  return function RequireAuth(props: T) {
    const isAuthenticated = true

    useEffect(() => {
      if (!isAuthenticated) {
        return redirect("/login")
      }
    }, [isAuthenticated])

    if (!isAuthenticated) {
      return null
    }

    return <Component {...props} />
  }
}
