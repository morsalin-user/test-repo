export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">Law Bookstore</h3>
            <p className="text-gray-300">Your trusted source for new and used legal books with fast delivery.</p>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <a href="/products" className="text-gray-300 hover:text-white">
                  Products
                </a>
              </li>
              <li>
                <a href="/blogs" className="text-gray-300 hover:text-white">
                  Blogs
                </a>
              </li>
              <li>
                <a href="/about" className="text-gray-300 hover:text-white">
                  About
                </a>
              </li>
              <li>
                <a href="/contact" className="text-gray-300 hover:text-white">
                  Contact
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Categories</h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-300 hover:text-white">
                  Constitutional Law
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white">
                  Criminal Law
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white">
                  Civil Law
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white">
                  Corporate Law
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact Info</h4>
            <ul className="space-y-2 text-gray-300">
              <li>Email: info@lawbookstore.com</li>
              <li>Phone: (555) 123-4567</li>
              <li>Address: 123 Legal St, Law City</li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-700 mt-8 pt-8 text-center">
          <p className="text-gray-300">&copy; 2024 Law Bookstore. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
