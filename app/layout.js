import { Inter } from "next/font/google"
import "./globals.css"
import { AuthProvider } from "@/components/auth-provider"
import { Toast } from "@/components/toast"
import Script from "next/script"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "AuraVerse - Free Content Sharing Platform",
  description: "Share and download Minecraft content, plugins, and more - completely free",
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="dark">
      <head>
        {/* Google AdSense */}
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-YOUR_PUBLISHER_ID"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
      </head>
      <body className={`${inter.className} bg-black text-white min-h-screen`}>
        <AuthProvider>
          {children}
          <Toast />
        </AuthProvider>
      </body>
    </html>
  )
}
