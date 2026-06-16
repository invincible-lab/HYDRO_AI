"use client";

import { useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import {
  Bell,
  AlertTriangle,
  Info,
  CheckCircle,
  X,
  Filter,
  Search,
} from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function AlertsPage() {
  const [alerts, setAlerts] = useState([
    {
      id: 1,
      type: "critical",
      title: "Zone B: Sizish aniqlandi",
      message:
        "Zone B da quvur tizimida sizish aniqlandi. Bosim 2.8 bar dan 1.2 bar ga tushdi.",
      zone: "Zone B",
      timestamp: "2025-11-28T10:15:00",
      resolved: false,
      category: "system",
    },
    {
      id: 2,
      type: "warning",
      title: "Tuproq namligi past",
      message:
        "Zone A da tuproq namligi 30% ga tushdi. Sug'orish tavsiya etiladi.",
      zone: "Zone A",
      timestamp: "2025-11-28T09:30:00",
      resolved: false,
      category: "moisture",
    },
    {
      id: 3,
      type: "info",
      title: "Ob-havo ma'lumoti",
      message:
        "Ertaga yomg'ir kutilmoqda. Sug'orish jadvalini qayta ko'rib chiqing.",
      zone: "Barcha zonalar",
      timestamp: "2025-11-28T08:45:00",
      resolved: false,
      category: "weather",
    },
    {
      id: 4,
      type: "success",
      title: "Sug'orish muvaffaqiyatli yakunlandi",
      message:
        "Zone C da 2 soatlik sug'orish muvaffaqiyatli yakunlandi. 480L suv ishlatildi.",
      zone: "Zone C",
      timestamp: "2025-11-28T07:00:00",
      resolved: true,
      category: "irrigation",
    },
    {
      id: 5,
      type: "warning",
      title: "Sensor aloqasi buzilgan",
      message: "Zone D da tuproq namligi sensoridan ma'lumot kelmayapti.",
      zone: "Zone D",
      timestamp: "2025-11-27T22:30:00",
      resolved: false,
      category: "system",
    },
    {
      id: 6,
      type: "critical",
      title: "Yuqori harorat",
      message:
        "Zone A da harorat 35°C dan oshdi. Zudlik bilan sug'orish kerak.",
      zone: "Zone A",
      timestamp: "2025-11-27T14:20:00",
      resolved: true,
      category: "temperature",
    },
  ]);

  const [anomalyData] = useState([
    { time: "00:00", expected: 45, actual: 45 },
    { time: "04:00", expected: 47, actual: 46 },
    { time: "08:00", expected: 44, actual: 42 },
    { time: "12:00", expected: 42, actual: 30 }, // Anomaly
    { time: "16:00", expected: 40, actual: 28 }, // Anomaly
    { time: "20:00", expected: 43, actual: 45 },
    { time: "24:00", expected: 45, actual: 44 },
  ]);

  const [filter, setFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  const getAlertIcon = (type) => {
    switch (type) {
      case "critical":
        return <AlertTriangle className="text-red-600" size={20} />;
      case "warning":
        return <AlertTriangle className="text-yellow-600" size={20} />;
      case "info":
        return <Info className="text-blue-600" size={20} />;
      case "success":
        return <CheckCircle className="text-green-600" size={20} />;
      default:
        return <Bell className="text-gray-600" size={20} />;
    }
  };

  const getAlertColor = (type) => {
    switch (type) {
      case "critical":
        return "bg-red-50 border-red-200";
      case "warning":
        return "bg-yellow-50 border-yellow-200";
      case "info":
        return "bg-blue-50 border-blue-200";
      case "success":
        return "bg-green-50 border-green-200";
      default:
        return "bg-gray-50 border-gray-200";
    }
  };

  const resolveAlert = (alertId) => {
    setAlerts(
      alerts.map((alert) =>
        alert.id === alertId ? { ...alert, resolved: true } : alert,
      ),
    );
  };

  const dismissAlert = (alertId) => {
    setAlerts(alerts.filter((alert) => alert.id !== alertId));
  };

  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffMs = now - date;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMins / 60);
    const diffDays = Math.floor(diffHours / 24);

    if (diffDays > 0) return `${diffDays} kun oldin`;
    if (diffHours > 0) return `${diffHours} soat oldin`;
    if (diffMins > 0) return `${diffMins} daqiqa oldin`;
    return "Hozir";
  };

  const filteredAlerts = alerts.filter((alert) => {
    const matchesFilter =
      filter === "all" ||
      (filter === "unresolved" && !alert.resolved) ||
      (filter === "resolved" && alert.resolved) ||
      alert.type === filter;

    const matchesSearch =
      alert.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      alert.message.toLowerCase().includes(searchTerm.toLowerCase()) ||
      alert.zone.toLowerCase().includes(searchTerm.toLowerCase());

    return matchesFilter && matchesSearch;
  });

  const alertCounts = {
    total: alerts.length,
    critical: alerts.filter((a) => a.type === "critical" && !a.resolved).length,
    warning: alerts.filter((a) => a.type === "warning" && !a.resolved).length,
    unresolved: alerts.filter((a) => !a.resolved).length,
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
            Ogohlantirishlar va anomaliyalar
          </h1>
          <p className="text-gray-600 mt-1">
            Tizim ogohlantirishlari va anomaliya aniqlash
          </p>
        </div>

        {/* Alert Statistics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
            <div className="flex items-center gap-3 mb-2">
              <Bell className="text-gray-600" size={20} />
              <span className="text-sm text-gray-600">
                Jami ogohlantirishlar
              </span>
            </div>
            <div className="text-2xl font-bold text-gray-900">
              {alertCounts.total}
            </div>
          </div>

          <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
            <div className="flex items-center gap-3 mb-2">
              <AlertTriangle className="text-red-600" size={20} />
              <span className="text-sm text-gray-600">Kritik</span>
            </div>
            <div className="text-2xl font-bold text-gray-900">
              {alertCounts.critical}
            </div>
          </div>

          <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
            <div className="flex items-center gap-3 mb-2">
              <AlertTriangle className="text-yellow-600" size={20} />
              <span className="text-sm text-gray-600">Ogohlantirish</span>
            </div>
            <div className="text-2xl font-bold text-gray-900">
              {alertCounts.warning}
            </div>
          </div>

          <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
            <div className="flex items-center gap-3 mb-2">
              <X className="text-orange-600" size={20} />
              <span className="text-sm text-gray-600">Hal qilinmagan</span>
            </div>
            <div className="text-2xl font-bold text-gray-900">
              {alertCounts.unresolved}
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Alerts List */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
              {/* Filters */}
              <div className="p-4 border-b border-gray-200">
                <div className="flex flex-col sm:flex-row gap-4 justify-between">
                  <div className="flex gap-2 flex-wrap">
                    {[
                      { value: "all", label: "Barchasi" },
                      { value: "unresolved", label: "Hal qilinmagan" },
                      { value: "critical", label: "Kritik" },
                      { value: "warning", label: "Ogohlantirish" },
                      { value: "resolved", label: "Hal qilingan" },
                    ].map(({ value, label }) => (
                      <button
                        key={value}
                        onClick={() => setFilter(value)}
                        className={`px-3 py-1.5 text-sm rounded-lg transition-colors ${
                          filter === value
                            ? "bg-emerald-600 text-white"
                            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                        }`}
                      >
                        {label}
                      </button>
                    ))}
                  </div>

                  <div className="relative">
                    <Search
                      className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                      size={16}
                    />
                    <input
                      type="text"
                      placeholder="Qidirish..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-sm"
                    />
                  </div>
                </div>
              </div>

              {/* Alerts */}
              <div className="divide-y divide-gray-200 max-h-96 overflow-y-auto">
                {filteredAlerts.length === 0 ? (
                  <div className="p-8 text-center">
                    <Bell className="mx-auto text-gray-400 mb-3" size={48} />
                    <p className="text-gray-600">
                      Hech qanday ogohlantirish topilmadi
                    </p>
                  </div>
                ) : (
                  filteredAlerts.map((alert) => (
                    <div
                      key={alert.id}
                      className={`p-4 ${getAlertColor(alert.type)}`}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex items-start gap-3 flex-1">
                          {getAlertIcon(alert.type)}
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <h3 className="font-medium text-gray-900">
                                {alert.title}
                              </h3>
                              {alert.resolved && (
                                <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded">
                                  Hal qilindi
                                </span>
                              )}
                            </div>
                            <p className="text-sm text-gray-700 mb-2">
                              {alert.message}
                            </p>
                            <div className="flex items-center gap-4 text-xs text-gray-600">
                              <span>{alert.zone}</span>
                              <span>{formatTimestamp(alert.timestamp)}</span>
                            </div>
                          </div>
                        </div>

                        <div className="flex gap-2 ml-4">
                          {!alert.resolved && (
                            <button
                              onClick={() => resolveAlert(alert.id)}
                              className="text-xs bg-emerald-600 text-white px-3 py-1 rounded hover:bg-emerald-700"
                            >
                              Hal qilish
                            </button>
                          )}
                          <button
                            onClick={() => dismissAlert(alert.id)}
                            className="text-xs bg-gray-600 text-white px-3 py-1 rounded hover:bg-gray-700"
                          >
                            O'chirish
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>

          {/* Anomaly Detection */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">
                Anomaliya aniqlash
              </h3>
              <ResponsiveContainer width="100%" height={200}>
                <LineChart data={anomalyData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis
                    dataKey="time"
                    stroke="#6b7280"
                    style={{ fontSize: "11px" }}
                  />
                  <YAxis stroke="#6b7280" style={{ fontSize: "11px" }} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#fff",
                      border: "1px solid #e5e7eb",
                      borderRadius: "8px",
                    }}
                    labelStyle={{
                      color: "#374151",
                      fontWeight: "bold",
                      fontSize: "12px",
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="expected"
                    stroke="#10b981"
                    strokeWidth={2}
                    name="Kutilgan"
                    strokeDasharray="5 5"
                  />
                  <Line
                    type="monotone"
                    dataKey="actual"
                    stroke="#ef4444"
                    strokeWidth={2}
                    name="Haqiqiy"
                  />
                </LineChart>
              </ResponsiveContainer>
              <div className="mt-4 text-sm text-gray-600">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-3 h-0.5 bg-emerald-500 border-dashed border border-emerald-500"></div>
                  <span>Kutilgan qiymat</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-0.5 bg-red-500"></div>
                  <span>Haqiqiy qiymat</span>
                </div>
                <p className="mt-3 text-xs">
                  12:00-16:00 oralig'ida tuproq namligida anomaliya aniqlandi.
                </p>
              </div>
            </div>

            {/* Alert Configuration */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mt-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">
                Ogohlantirish sozlamalari
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Tuproq namligi chegarasi
                  </label>
                  <div className="flex items-center gap-2">
                    <input
                      type="number"
                      defaultValue={35}
                      className="w-20 px-3 py-1.5 border border-gray-200 rounded text-sm focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    />
                    <span className="text-sm text-gray-600">%</span>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Maksimal harorat
                  </label>
                  <div className="flex items-center gap-2">
                    <input
                      type="number"
                      defaultValue={32}
                      className="w-20 px-3 py-1.5 border border-gray-200 rounded text-sm focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    />
                    <span className="text-sm text-gray-600">°C</span>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Minimal bosim
                  </label>
                  <div className="flex items-center gap-2">
                    <input
                      type="number"
                      step="0.1"
                      defaultValue={2.0}
                      className="w-20 px-3 py-1.5 border border-gray-200 rounded text-sm focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    />
                    <span className="text-sm text-gray-600">bar</span>
                  </div>
                </div>

                <button className="w-full bg-emerald-600 text-white py-2 rounded-lg hover:bg-emerald-700 text-sm">
                  Sozlamalarni saqlash
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
