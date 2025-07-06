"use client"

import { useState } from "react"
import Link from "next/link"
import { useAuth } from "@/contexts/AuthContext"
import { Button } from "@/components/ui/button"
import { BookOpen, Home, Users, PenTool, DollarSign, User, Newspaper, Menu, X } from "lucide-react"

export default function Header() {
  const { user, logout } = useAuth()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen)
  }

  const closeMobileMenu = () => {
    setMobileMenuOpen(false)
  }

  return (
    <header className="bg-white shadow-md border-b border-purple-200 relative">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2" onClick={closeMobileMenu}>
            <BookOpen className="h-8 w-8 text-purple-600" />
            <span className="text-2xl font-bold text-purple-900">Law Bookstore</span>
          </Link>

          {/* Desktop Navigation */}
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
              <span>Blogs</span>
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

          {/* Desktop Auth */}
          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              <div className="flex items-center space-x-4">
                <Link href="/profile" className="flex items-center space-x-1 text-gray-600 hover:text-purple-600">
                  <User className="h-4 w-4" />
                  <span>{user.name}</span>
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

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMobileMenu}
            className="md:hidden p-2 text-gray-600 hover:text-purple-600 focus:outline-none"
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-white border-b border-purple-200 shadow-lg z-50">
            <nav className="px-4 py-4 space-y-4">
              <Link
                href="/"
                className="flex items-center space-x-2 text-gray-600 hover:text-purple-600 py-2"
                onClick={closeMobileMenu}
              >
                <Home className="h-4 w-4" />
                <span>Home</span>
              </Link>
              <Link
                href="/book-selection"
                className="flex items-center space-x-2 text-gray-600 hover:text-purple-600 py-2"
                onClick={closeMobileMenu}
              >
                <BookOpen className="h-4 w-4" />
                <span>Books</span>
              </Link>
              <Link
                href="/blogs"
                className="flex items-center space-x-2 text-gray-600 hover:text-purple-600 py-2"
                onClick={closeMobileMenu}
              >
                <PenTool className="h-4 w-4" />
                <span>Blogs</span>
              </Link>
              <Link
                href="/news"
                className="flex items-center space-x-2 text-gray-600 hover:text-purple-600 py-2"
                onClick={closeMobileMenu}
              >
                <Newspaper className="h-4 w-4" />
                <span>News</span>
              </Link>
              <Link
                href="/sell-books"
                className="flex items-center space-x-2 text-gray-600 hover:text-purple-600 py-2"
                onClick={closeMobileMenu}
              >
                <DollarSign className="h-4 w-4" />
                <span>Sell Books</span>
              </Link>
              {user?.isAdmin && (
                <Link
                  href="/admin"
                  className="flex items-center space-x-2 text-gray-600 hover:text-purple-600 py-2"
                  onClick={closeMobileMenu}
                >
                  <Users className="h-4 w-4" />
                  <span>Admin</span>
                </Link>
              )}

              {/* Mobile Auth */}
              <div className="border-t border-gray-200 pt-4 mt-4">
                {user ? (
                  <div className="space-y-2">
                    <Link
                      href="/profile"
                      className="flex items-center space-x-2 text-gray-600 hover:text-purple-600 py-2"
                      onClick={closeMobileMenu}
                    >
                      <User className="h-4 w-4" />
                      <span>{user.name}</span>
                    </Link>
                    <Button
                      onClick={() => {
                        logout()
                        closeMobileMenu()
                      }}
                      variant="outline"
                      className="w-full border-purple-600 text-purple-600 hover:bg-purple-600 hover:text-white bg-transparent"
                    >
                      Logout
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <Link href="/login" onClick={closeMobileMenu}>
                      <Button
                        variant="outline"
                        className="w-full border-purple-600 text-purple-600 hover:bg-purple-600 hover:text-white bg-transparent"
                      >
                        Login
                      </Button>
                    </Link>
                    <Link href="/register" onClick={closeMobileMenu}>
                      <Button className="w-full bg-purple-600 hover:bg-purple-700 text-white">Register</Button>
                    </Link>
                  </div>
                )}
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}
