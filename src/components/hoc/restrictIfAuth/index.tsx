"use client"

import { ComponentType, useEffect } from "react"
import { redirect } from "next/navigation"

interface AuthProps {
  [key: string]: unknown
}

export function restrictIfAuth<T extends AuthProps>(
  Component: ComponentType<T>
) {
  return function RequireAuth(props: T) {
    const isAuthenticated = false

    useEffect(() => {
      if (isAuthenticated) {
        return redirect("/blog")
      }
    }, [isAuthenticated])

    if (isAuthenticated) {
      return null
    }

    return <Component {...props} />
  }
}
