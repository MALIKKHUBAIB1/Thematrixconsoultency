function Navbar() {
  return (
    <nav className="flex items-center justify-between py-5">
      {/* LEFT - LOGO */}
      <div className="flex items-center gap-3">
        <img
          src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
          alt="logo"
          className="w-10 h-10"
        />
        <div className="leading-tight">
          <h1 className="text-xl font-semibold">The Matrix</h1>
          <p className="text-sm text-gray-300">Consultancy</p>
        </div>
      </div>

      {/* CENTER - MENU */}
      <ul className="flex gap-10 text-lg">
        <li className="hover:border-b-2 border-b-blue-700 cursor-pointer transition">
          Home
        </li>
        <li className="hover:border-b-2 border-b-blue-700 cursor-pointer transition">
          Service
        </li>
        <li className="hover:border-b-2 border-b-blue-700 cursor-pointer transition">
          About
        </li>
        <li className="hover:border-b-2 border-b-blue-700 cursor-pointer transition">
          Contact
        </li>
      </ul>

      {/* RIGHT - BUTTON */}
      <button className="px-6 py-2 border border-white  hover:bg-white hover:text-[#000D51] transition">
        Get in touch
      </button>
    </nav>
  );
}

export default Navbar;
