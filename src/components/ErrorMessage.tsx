import type { ReactNode } from "react"

type ErrorMessageProps = {
    children: ReactNode
}

export const ErrorMessage = ({ children } : ErrorMessageProps) => {
  return (
    <p className="text-center uppercase mt-2 bg-red-50 text-red-600 p-2 rounded-lg text-sm font-bold">{children}</p>
  )
}
