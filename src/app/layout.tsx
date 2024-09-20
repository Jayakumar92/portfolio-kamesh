import type { Metadata } from "next"
import { Inter } from "next/font/google"

import "@/styles/globals.css"

import { Toaster } from "@/components/ui/sonner"
import { Provider } from "@/app/provider"

const inter = Inter({ subsets: ["latin"] })

const title = "Kamesh | Mechanical Engineer From Chennai, India."
const description =
  "Im a mechanical engineer specializing in hydraulic cylinder design and manufacturing."

export const metadata: Metadata = {
  title,
  description,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${inter.className} bg-gray text-gray-600 antialiased`}
    >
      <body className={"m-0 box-border w-full p-0"}>
        <Provider>
          {children}
          <Toaster richColors closeButton />
        </Provider>
      </body>
    </html>
  )
}
