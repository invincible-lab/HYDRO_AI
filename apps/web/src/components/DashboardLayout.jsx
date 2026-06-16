"use client";

import { useState } from "react";
import {
  LayoutDashboard,
  TrendingUp,
  Sprout,
  Droplets,
  Bell,
  Settings,
  Menu,
  X,
  ChevronRight,
  User,
  Brain,
} from "lucide-react";

export default function DashboardLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const currentPath = window?.location?.pathname || "/dashboard";

  const navigation = [
    { name: "Boshqaruv paneli", href: "/dashboard", icon: LayoutDashboard },
    { name: "Bashorat", href: "/dashboard/forecasting", icon: TrendingUp },
    { name: "Ekinlar", href: "/dashboard/crops", icon: Sprout },
    {
      name: "Sug'orish boshqaruvi",
      href: "/dashboard/irrigation",
      icon: Droplets,
    },
    { name: "Ogohlantirishlar", href: "/dashboard/alerts", icon: Bell },
    { name: "AI Yordamchi", href: "/dashboard/ai-assistant", icon: Brain },
    { name: "Sozlamalar", href: "/dashboard/settings", icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile sidebar backdrop */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-gray-900 bg-opacity-50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 z-50 h-full w-64 bg-white border-r border-gray-200 transform transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <a href="/" className="flex items-center gap-2">
              <Droplets className="text-emerald-600" size={28} />
              <span className="text-xl font-bold text-gray-900">
                HydroIntel AI
              </span>
            </a>
            <button
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden p-2 hover:bg-gray-100 rounded-lg"
            >
              <X size={20} />
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
            {navigation.map((item) => {
              const isActive = currentPath === item.href;
              const Icon = item.icon;

              return (
                <a
                  key={item.name}
                  href={item.href}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                    isActive
                      ? "bg-emerald-50 text-emerald-600 font-medium"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                  onClick={() => setSidebarOpen(false)}
                >
                  <Icon size={20} />
                  <span>{item.name}</span>
                  {isActive && <ChevronRight size={16} className="ml-auto" />}
                </a>
              );
            })}
          </nav>

          {/* User section */}
          <div className="p-4 border-t border-gray-200">
            <div className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-100 cursor-pointer">
              <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center">
                <User className="text-emerald-600" size={20} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">
                  Fermer
                </p>
                <p className="text-xs text-gray-600 truncate">
                  fermer@hydrointel.uz
                </p>
              </div>
            </div>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <div className="lg:pl-64">
        {/* Top navbar */}
        <header className="sticky top-0 z-30 bg-white border-b border-gray-200">
          <div className="flex items-center justify-between px-4 py-4">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-2 hover:bg-gray-100 rounded-lg"
            >
              <Menu size={24} />
            </button>

            <div className="flex items-center gap-4 ml-auto">
              <button className="relative p-2 hover:bg-gray-100 rounded-lg">
                <Bell size={20} className="text-gray-700" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="p-4 md:p-6 lg:p-8">{children}</main>
      </div>
    </div>
  );
}
