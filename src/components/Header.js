"use client"

import Link from "next/link"
import { useAuth } from "@/contexts/AuthContext"
import { Button } from "@/components/ui/button"
import { BookOpen, Home, Users } from "lucide-react"

export default function Header() {
  const { user, logout } = useAuth()

  return (
    <header className="bg-white shadow-md border-b">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <BookOpen className="h-8 w-8 text-blue-600" />
            <span className="text-2xl font-bold text-gray-800">Law Bookstore</span>
          </Link>

          <nav className="hidden md:flex items-center space-x-6">
            <Link href="/" className="flex items-center space-x-1 text-gray-600 hover:text-blue-600">
              <Home className="h-4 w-4" />
              <span>Home</span>
            </Link>
            <Link href="/products" className="text-gray-600 hover:text-blue-600">
              Products
            </Link>
            <Link href="/blogs" className="text-gray-600 hover:text-blue-600">
              Blogs
            </Link>
            {user?.isAdmin && (
              <Link href="/admin" className="flex items-center space-x-1 text-gray-600 hover:text-blue-600">
                <Users className="h-4 w-4" />
                <span>Admin</span>
              </Link>
            )}
          </nav>

          <div className="flex items-center space-x-4">
            {user ? (
              <div className="flex items-center space-x-4">
                {/* <span className="text-gray-600">Welcome, {user.name}</span> */}
                <Button onClick={logout} variant="outline">
                  Logout
                </Button>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Link href="/login">
                  <Button variant="outline">Login</Button>
                </Link>
                <Link href="/register">
                  <Button>Register</Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}
