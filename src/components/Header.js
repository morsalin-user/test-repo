"use client"

import Link from "next/link"
import { useAuth } from "@/contexts/AuthContext"
import { Button } from "@/components/ui/button"
import { BookOpen, Home, Users, PenTool, DollarSign, User, Newspaper } from "lucide-react"

export default function Header() {
  const { user, logout } = useAuth()

  return (
    <header className="bg-white shadow-md border-b border-purple-200">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <BookOpen className="h-8 w-8 text-purple-600" />
            <span className="text-2xl font-bold text-purple-900">Law Bookstore</span>
          </Link>

          <nav className="hidden md:flex items-center space-x-6">
            <Link href="/" className="flex items-center space-x-1 text-gray-600 hover:text-purple-600">
              <Home className="h-4 w-4" />
              <span>Home</span>
            </Link>
            <Link href="/book-selection" className="text-gray-600 hover:text-purple-600">
              Books
            </Link>
            <Link href="/blogs" className="flex items-center space-x-1 text-gray-600 hover:text-purple-600">
              <PenTool className="h-4 w-4" />
              <span>Insights</span>
            </Link>
            <Link href="/news" className="flex items-center space-x-1 text-gray-600 hover:text-purple-600">
              <Newspaper className="h-4 w-4" />
              <span>News</span>
            </Link>
            <Link href="/sell-books" className="flex items-center space-x-1 text-gray-600 hover:text-purple-600">
              <DollarSign className="h-4 w-4" />
              <span>Sell Books</span>
            </Link>
            {user?.isAdmin && (
              <Link href="/admin" className="flex items-center space-x-1 text-gray-600 hover:text-purple-600">
                <Users className="h-4 w-4" />
                <span>Admin</span>
              </Link>
            )}
          </nav>

          <div className="flex items-center space-x-4">
            {user ? (
              <div className="flex items-center space-x-4">
                <Link href="/profile" className="flex items-center space-x-1 text-gray-600 hover:text-purple-600">
                  <User className="h-4 w-4" />
                  <span className="hidden md:inline">{user.name}</span>
                </Link>
                <Button
                  onClick={logout}
                  variant="outline"
                  className="border-purple-600 text-purple-600 hover:bg-purple-600 hover:text-white bg-transparent"
                >
                  Logout
                </Button>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Link href="/login">
                  <Button
                    variant="outline"
                    className="border-purple-600 text-purple-600 hover:bg-purple-600 hover:text-white bg-transparent"
                  >
                    Login
                  </Button>
                </Link>
                <Link href="/register">
                  <Button className="bg-purple-600 hover:bg-purple-700 text-white">Register</Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}
