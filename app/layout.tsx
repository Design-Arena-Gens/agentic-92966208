import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'AI Business Decision Support Tool',
  description: 'Generate comprehensive business analysis for any company',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
