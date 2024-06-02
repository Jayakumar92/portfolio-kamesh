"use client"

import React from "react"

type Props = {
  id: string
  label?: string
  value?: string
  onChange?: (e: any) => void
  placeholder: string
}

function Input({ id, label, ...rest }: Props) {
  return (
    <div className="flex flex-col gap-1">
      {label && (
        <label className="text-md font-medium text-gray-700" htmlFor="id">
          {label}
        </label>
      )}
      <input
        className="focus:border-primary w-full rounded-md border-2 border-gray-200 bg-white px-3 py-2 text-sm font-medium text-black focus:outline-none"
        type="number"
        id={id}
        name={id}
        {...rest}
        maxLength={6}
      />
    </div>
  )
}

export default Input
