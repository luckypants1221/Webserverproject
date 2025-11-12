export function Sidebar({ currentScreen, onNavigate }: any) {
  const menus = [
    { id: "home", label: "홈" },
    { id: "quiz", label: "퀴즈" },
    { id: "wrongnote", label: "오답노트" }, // ✅ 추가됨
    { id: "shop", label: "상점" },
  ];

  return (
    <div className="w-60 bg-white border-r border-gray-200 p-4">
      <h1 className="text-xl font-bold text-purple-700 mb-6">
        Quit!
      </h1>
      <ul className="space-y-2">
        {menus.map((m) => (
          <li key={m.id}>
            <button
              onClick={() => onNavigate(m.id)}
              className={`w-full text-left px-4 py-2 rounded-lg ${
                currentScreen === m.id
                  ? "bg-purple-100 text-purple-700 font-semibold"
                  : "hover:bg-gray-50 text-gray-700"
              }`}
            >
              {m.label}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}