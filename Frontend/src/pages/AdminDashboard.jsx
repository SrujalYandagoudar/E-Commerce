import { useState } from "react";
import { BarChart3, Home, Users, ShoppingCart, Settings } from "lucide-react";

export default function AdminDashboard() {
  const [active, setActive] = useState("Dashboard");

  const menuItems = [
    { name: "Dashboard", icon: <Home size={20} /> },
    { name: "Users", icon: <Users size={20} /> },
    { name: "Orders", icon: <ShoppingCart size={20} /> },
    { name: "Analytics", icon: <BarChart3 size={20} /> },
    { name: "Settings", icon: <Settings size={20} /> },
  ];

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-md p-5">
        <h2 className="text-2xl font-bold text-orange-600 mb-8">Admin</h2>
        <ul className="space-y-4">
          {menuItems.map((item) => (
            <li
              key={item.name}
              onClick={() => setActive(item.name)}
              className={`flex items-center gap-3 px-3 py-2 rounded-lg cursor-pointer transition ${
                active === item.name
                  ? "bg-orange-600 text-white"
                  : "text-gray-700 hover:bg-gray-200"
              }`}
            >
              {item.icon}
              {item.name}
            </li>
          ))}
        </ul>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6">
        {/* Topbar */}
        <header className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">{active}</h1>
          <button className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700">
            Log Out
          </button>
        </header>

        {/* Stats Cards */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div className="bg-white p-6 rounded-xl shadow-md">
            <h3 className="text-lg font-semibold">Total Users</h3>
            <p className="text-2xl font-bold text-orange-600 mt-2">1,245</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-md">
            <h3 className="text-lg font-semibold">Orders</h3>
            <p className="text-2xl font-bold text-orange-600 mt-2">326</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-md">
            <h3 className="text-lg font-semibold">Revenue</h3>
            <p className="text-2xl font-bold text-orange-600 mt-2">₹85,000</p>
          </div>
        </section>

        {/* Chart Placeholder */}
        <section className="bg-white p-6 rounded-xl shadow-md">
          <h3 className="text-lg font-semibold mb-4">Analytics</h3>
          <div className="h-64 flex items-center justify-center text-gray-500">
            📊 Chart will be here
          </div>
        </section>
      </main>
    </div>
  );
}
