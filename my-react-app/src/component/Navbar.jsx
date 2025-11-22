import { useState } from "react";
import { Menu, X } from "lucide-react";

function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="flex items-center justify-between py-5 px-4 md:px-0">
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

      {/* DESKTOP MENU */}
      <ul className="hidden md:flex gap-10 text-lg">
        <li className="hover:text-blue-400 cursor-pointer">Home</li>
        <li className="hover:text-blue-400 cursor-pointer">Service</li>
        <li className="hover:text-blue-400 cursor-pointer">About</li>
        <li className="hover:text-blue-400 cursor-pointer">Contact</li>
      </ul>

      {/* DESKTOP BUTTON */}
      <button className="hidden md:block px-6 py-2 border border-white hover:bg-white hover:text-[#000D51] transition">
        Get in touch
      </button>

      {/* MOBILE MENU ICON */}
      <button className="md:hidden text-white" onClick={() => setOpen(!open)}>
        {open ? <X size={28} /> : <Menu size={28} />}
      </button>

      {/* MOBILE DROPDOWN */}
      {open && (
        <div className="absolute top-16 left-0 w-full bg-[#000D51] text-white py-5 shadow-lg md:hidden">
          <ul className="flex flex-col items-center gap-6 text-lg">
            <li className="hover:text-blue-400 cursor-pointer">Home</li>
            <li className="hover:text-blue-400 cursor-pointer">Service</li>
            <li className="hover:text-blue-400 cursor-pointer">About</li>
            <li className="hover:text-blue-400 cursor-pointer">Contact</li>
          </ul>

          <button className="mt-6 mx-auto block px-6 py-2 border border-white hover:bg-white hover:text-[#000D51] transition">
            Get in touch
          </button>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
