import { useState } from "react";
import { Menu, X } from "lucide-react";

export default function Navbar({ onMenuToggle }) {
  const [open, setOpen] = useState(false);

  const handleMenuClick = () => {
    const newOpenState = !open;
    setOpen(newOpenState);
    // ✅ Hamburger menu click par parent component ko inform karega
    if (onMenuToggle) {
      onMenuToggle(newOpenState);
    }
  };

  return (
    <nav className="bg-gray-900 text-white border-b border-gray-700 fixed w-full top-0 z-50 shadow-lg">
      <div className="flex items-center justify-between px-6 py-3">
        {/* Logo + Hamburger for mobile */}
        <div className="flex items-center gap-4">
          {/* Hamburger Menu - Mobile only */}
          <button
            onClick={handleMenuClick}
            className="md:hidden text-gray-300 hover:text-white transition"
          >
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
          
          {/* Logo */}
          <h1 className="text-2xl font-extrabold tracking-wide text-indigo-400">
            Pitch<span className="text-white">Craft</span>
          </h1>
        </div>

        {/* Profile Avatar */}
        <div className="flex items-center gap-4">
          <img
            src="https://api.dicebear.com/9.x/identicon/svg?seed=PitchCraft"
            alt="avatar"
            className="w-9 h-9 rounded-full border border-gray-600"
          />
        </div>
      </div>
    </nav>
  );
}