import type {Metadata} from "next"
import "./globals.css"
import {Roboto} from "next/font/google"
import SideNavbar from "@/components/SideNavbar"

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["100", "300", "400", "500", "700", "900"],
})

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className="bg-gray-100">
        <SideNavbar />
        <div
          className={`max-container pl-[270px] pr-[30px] ${roboto.className}`}
        >
          {children}
        </div>
      </body>
    </html>
  )
}
