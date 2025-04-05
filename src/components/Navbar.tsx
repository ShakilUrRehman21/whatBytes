const Navbar = () => {
  return (
    <nav className="w-full px-6 py-4 bg-white shadow flex items-center justify-between border-b border-gray-200">
      <div className="text-2xl font-bold text-black">
        <img src="/logo.png" alt="Logo" className="w-45 h-10" />
      </div>
      <div className="flex items-center gap-2 border border-gray-500 rounded-md px-3 py-1">
        <img src="/image.png" alt="Profile" className="w-8 h-8 rounded-full" />
        <span className="text-gray-700 font-medium">Rahil Siddique</span>
      </div>
    </nav>
  );
};

export default Navbar;
