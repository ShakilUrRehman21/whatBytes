export default function Sidebar() {
  return (
    <div className="w-64 bg-white shadow-lg border-r border-gray-200 h-screen pt-10 p-2">
      <ul className="space-y-2 text-black">
        
        {/* Dashboard */}
        <li className="flex items-center gap-3 font-semibold cursor-pointer px-3 py-2 hover:bg-gray-100 hover:text-blue-600 rounded-r-full transition-all duration-200">
          <img src="/i1.png" alt="Dashboard Icon" className="w-5 h-5" />
          <span>Dashboard</span>
        </li>

        {/* Skill Test */}
        <li className="flex items-center gap-3 font-semibold cursor-pointer px-3 py-2 bg-blue-50 text-blue-700 rounded-r-full border-l-4 border-blue-600 transition-all duration-200">
          <img src="/i2.png" alt="Skill Test Icon" className="w-5 h-7" />
          <span>Skill Test</span>
        </li>

        {/* Internship */}
        <li className="flex items-center gap-3 font-semibold cursor-pointer px-3 py-2 hover:bg-gray-100 hover:text-blue-600 rounded-r-full transition-all duration-200">
          <img src="/i3.png" alt="Internship Icon" className="w-5 h-5" />
          <span>Internship</span>
        </li>
      </ul>
    </div>
  );
}
