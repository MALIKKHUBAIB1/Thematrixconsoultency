function Footer() {
  return (
    <footer className="bg-[#001a4d] text-white py-10 relative">
      {/* BACKGROUND STRIPES */}
      <div className="absolute inset-0 opacity-20 pointer-events-none bg-[linear-gradient(90deg,#002766_4px,transparent_4px)] bg-[length:60px_60px]"></div>

      {/* MAIN CONTENT */}
      <div className="relative max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-4 gap-10">
        {/* Column 1 - Logo + Description */}
        <div>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-blue-500 rounded-lg flex justify-center items-center text-xl font-bold">
              🧩
            </div>
            <h2 className="font-semibold text-lg leading-tight">
              THE MATRIX <br /> CONSULTING SERVICE
            </h2>
          </div>

          <p className="text-sm text-gray-300 leading-relaxed mb-4">
            Velit facilis senectus velit elementum. Consequat vel arcu feugiat
            dui eu tempor pretium at porta. Dui pellentesque sagittis…
          </p>

          <p className="font-semibold mb-2">Subscribe Us</p>

          <div className="flex gap-3 text-lg">
            <span>📘</span>
            <span>🔵</span>
            <span>📸</span>
          </div>
        </div>

        {/* Column 2 */}
        <div>
          <h3 className="font-semibold mb-4">Services</h3>
          <ul className="space-y-2 text-sm text-gray-300">
            <li>Marketing Strategy</li>
            <li>Financial Management</li>
            <li>Business Strategy</li>
            <li>Sales and Marketing</li>
            <li>Human Resources</li>
          </ul>
        </div>

        {/* Column 3 */}
        <div>
          <h3 className="font-semibold mb-4">Useful links</h3>
          <ul className="space-y-2 text-sm text-gray-300">
            <li>Home</li>
            <li>About</li>
            <li>Blog</li>
            <li>Contact</li>
            <li>F.A.Q</li>
          </ul>
        </div>

        {/* Column 4 */}
        <div>
          <h3 className="font-semibold mb-2">Subscribe for our newsletter</h3>
          <p className="text-sm text-gray-300 mb-3">
            Consequat vel arcu feugiat dui eu tempor pretium
          </p>

          <div className="flex bg-white rounded-lg overflow-hidden mb-4">
            <input
              type="text"
              placeholder="Your email"
              className="flex-1 px-3 py-2 text-black outline-none text-sm"
            />
            <button className="px-4 bg-blue-600 text-white text-sm">
              Subscribe
            </button>
          </div>

          <p className="font-semibold mb-1">Address</p>
          <p className="text-sm text-gray-300 mb-3">
            8592 Fairground <br />
            St. Tallahassee, FL 32303
          </p>

          <p className="font-semibold mb-1">Email</p>
          <p className="text-sm text-gray-300 mb-3">teverett@optonline.net</p>

          <p className="font-semibold mb-1">Phone</p>
          <p className="text-sm text-gray-300">(863) 267-3634</p>
        </div>
      </div>

      {/* COPYRIGHT */}
      <p className="text-center text-gray-400 text-sm mt-6">
        © Copyright Business Consulting 2024. Design by Figma.guru
      </p>
    </footer>
  );
}

export default Footer;
