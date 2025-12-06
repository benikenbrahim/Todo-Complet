export default function Sidebar({ open, setOpen }) {
  return (
    <>
      {/* ⚙️ Bouton flottant toggle */}
      <button
        onClick={() => setOpen(!open)}
        aria-label="Toggle menu"
        className={`
          fixed top-4 left-4 z-50 
          bg-[#222633] text-white 
          w-10 h-10 rounded-full 
          flex items-center justify-center 
          shadow-md hover:bg-[#32384d] 
          transition-colors duration-200
        `}
      >
        {open ? "❮" : "❯"}
      </button>

      {/* 🧊 Sidebar */}
      <aside
        className={`
          fixed top-0 left-0 z-40
          h-full w-64 
          bg-[#020203] text-white
          border-r border-[#2b3245]
          flex flex-col
          transition-transform duration-300 ease-in-out
          ${open ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        {/* 🟣 Header avatar */}
        <div className="flex items-center justify-center py-8 border-b border-[#2b3245]">
          <a href="/Profile" className="flex flex-col items-center">
            <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-[#3b4052]">
              <img
                src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
                alt="Avatar"
                className="w-full h-full object-cover"
              />
            </div>
          </a>
        </div>

        {/* 📌 Navigation */}
        <nav className="flex-grow p-4">
          <ul className="space-y-3">
            <li>
              <a
                href="/Dashboard"
                className="flex items-center gap-3 p-3 rounded-md hover:bg-[#1e2230] transition"
              >
                <i className="bi bi-briefcase"></i>
                <span>Tasks</span>
              </a>
            </li>

            <li>
              <a
                href="/About"
                className="flex items-center gap-3 p-3 rounded-md hover:bg-[#1e2230] transition"
              >
                <i className="bi bi-person-lines-fill"></i>
                <span>About Me</span>
              </a>
            </li>

            <li>
              <a
                href="/help"
                className="flex items-center gap-3 p-3 rounded-md hover:bg-[#1e2230] transition"
              >
                <i className="bi bi-question-circle"></i>
                <span>Help</span>
              </a>
            </li>
          </ul>
        </nav>

        {/* 🧩 Footer optionnel */}
        <div className="p-4 border-t border-[#2b3245]">
          <button
            onClick={() => setOpen(false)}
            className="w-full py-2 bg-[#222633] rounded-md hover:bg-[#32384d]"
          >
            Fermer
          </button>
        </div>
      </aside>
    </>
  );
}
