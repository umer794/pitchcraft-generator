import { Home, PlusCircle, Folder, Settings, LogOut } from "lucide-react";
import { useState } from "react";
import { signOut } from "firebase/auth";
import { auth } from "../services/firebase";
import { useNavigate } from "react-router-dom";

export default function Sidebar({ onClose }) { // ✅ NEW: onClose prop
  const [active, setActive] = useState("dashboard");
  const navigate = useNavigate();

  const links = [
    { id: "dashboard", name: "Dashboard", icon: <Home size={20} />, path: "/dashboard" },
    { id: "create", name: "Create Pitch", icon: <PlusCircle size={20} />, path: "/text" },
    { id: "saved", name: "My Pitches", icon: <Folder size={20} />, path: "/my-pitches" },
    { id: "settings", name: "Settings", icon: <Settings size={20} />, path: "/settings" },
  ];

  const handleNavigation = (link) => {
    setActive(link.id);
    
    // ✅ NEW: Mobile pe sidebar close karo
    if (onClose) {
      onClose();
    }
    
    if (link.id === "settings") {
      alert("Coming Soon");
    } else if (link.id === "saved") {
      alert("My Pitches - Coming Soon");
    } else {
      navigate(link.path);
    }
  };

  const handleLogout = async () => {
    try {
      // ✅ NEW: Logout se pehle sidebar close karo
      if (onClose) {
        onClose();
      }
      await signOut(auth);
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <aside className="bg-gray-900 text-gray-300 h-screen w-64 p-5 border-r border-gray-800 fixed left-0 top-0 pt-20 z-50">
      {/* ✅ NEW: Close button for mobile */}
      <button 
        onClick={onClose}
        className="md:hidden absolute top-4 right-4 text-gray-400 hover:text-white"
      >
        ✕
      </button>

      <div className="flex flex-col gap-3">
        {links.map((link) => (
          <button
            key={link.id}
            onClick={() => handleNavigation(link)}
            className={`flex items-center gap-3 px-4 py-2 rounded-xl transition-all duration-300 ${
              active === link.id
                ? "bg-indigo-600 text-white shadow-lg"
                : "hover:bg-gray-800 hover:text-white"
            }`}
          >
            {link.icon}
            <span className="text-sm font-medium">{link.name}</span>
          </button>
        ))}
      </div>

      <div className="absolute bottom-5 left-5 w-[80%]">
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 px-4 py-2 text-sm text-gray-400 hover:text-red-500 transition"
        >
          <LogOut size={18} /> Logout
        </button>
      </div>
    </aside>
  );
}