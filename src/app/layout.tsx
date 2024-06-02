import { Inter } from "next/font/google"
import { Metadata } from "next"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

const title = "Kamesh | Mechanical Engineer From Chennai, India."
const description =
  "Im a mechanical engineer specializing in hydraulic cylinder design and manufacturing."

export const metadata: Metadata = {
  title,
  description,
  keywords: [
    "Frontend Developer",
    "Full Stack Developer",
    "React Developer",
    "Next.js Developer",
  ],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="!scroll-smooth" suppressHydrationWarning>
      <body className={`${inter.className} bg-gray text-gray-600 antialiased`}>
        {children}
      </body>
    </html>
  )
}
