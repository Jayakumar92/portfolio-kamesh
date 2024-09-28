type FormHintProps = {
  children: React.ReactNode
}

function FormHint({ children }: FormHintProps) {
  return <span className="ml-1 text-[10px]">({children})</span>
}

export { FormHint }
