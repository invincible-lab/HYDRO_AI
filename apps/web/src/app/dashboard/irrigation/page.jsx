"use client";

import { useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import {
  Droplets,
  Play,
  Square,
  Pause,
  Gauge,
  Activity,
  Clock,
  Brain,
  Sparkles,
  MessageSquare,
} from "lucide-react";
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function IrrigationPage() {
  const [zones, setZones] = useState([
    {
      id: 1,
      name: "Zone A - Pomidor",
      status: "active",
      moisture: 45,
      flow: 125,
      pressure: 2.8,
      duration: "2:15",
      remaining: "0:45",
    },
    {
      id: 2,
      name: "Zone B - Bodring",
      status: "idle",
      moisture: 38,
      flow: 0,
      pressure: 2.5,
      duration: "0:00",
      remaining: "0:00",
    },
    {
      id: 3,
      name: "Zone C - Karam",
      status: "idle",
      moisture: 52,
      flow: 0,
      pressure: 2.7,
      duration: "0:00",
      remaining: "0:00",
    },
    {
      id: 4,
      name: "Zone D - Sabzi",
      status: "scheduled",
      moisture: 41,
      flow: 0,
      pressure: 2.6,
      duration: "0:00",
      remaining: "1:30",
    },
    {
      id: 5,
      name: "Zone E - Piyoz",
      status: "idle",
      moisture: 49,
      flow: 0,
      pressure: 2.4,
      duration: "0:00",
      remaining: "0:00",
    },
    {
      id: 6,
      name: "Zone F - Kartoshka",
      status: "idle",
      moisture: 43,
      flow: 0,
      pressure: 2.9,
      duration: "0:00",
      remaining: "0:00",
    },
    {
      id: 7,
      name: "Zone G - Qovun",
      status: "maintenance",
      moisture: 0,
      flow: 0,
      pressure: 0,
      duration: "0:00",
      remaining: "0:00",
    },
    {
      id: 8,
      name: "Zone H - Tarvuz",
      status: "idle",
      moisture: 47,
      flow: 0,
      pressure: 2.8,
      duration: "0:00",
      remaining: "0:00",
    },
  ]);

  const [flowHistory] = useState([
    { time: "00:00", flow: 0 },
    { time: "02:00", flow: 0 },
    { time: "04:00", flow: 0 },
    { time: "06:00", flow: 85 },
    { time: "08:00", flow: 120 },
    { time: "10:00", flow: 125 },
    { time: "12:00", flow: 125 },
    { time: "14:00", flow: 110 },
    { time: "16:00", flow: 0 },
    { time: "18:00", flow: 95 },
    { time: "20:00", flow: 80 },
    { time: "22:00", flow: 0 },
    { time: "24:00", flow: 0 },
  ]);

  const [scheduledTasks] = useState([
    {
      zone: "Zone B",
      time: "16:30",
      duration: "3 soat",
      type: "Avtomatik",
      priority: "Yuqori",
    },
    {
      zone: "Zone D",
      time: "18:00",
      duration: "2.5 soat",
      type: "Rejalashtirilgan",
      priority: "O'rta",
    },
    {
      zone: "Zone F",
      time: "20:00",
      duration: "1.5 soat",
      type: "Avtomatik",
      priority: "Past",
    },
    {
      zone: "Zone H",
      time: "06:00",
      duration: "2 soat",
      type: "Rejalashtirilgan",
      priority: "O'rta",
    },
  ]);

  const toggleZone = (zoneId, action) => {
    setZones(
      zones.map((zone) => {
        if (zone.id === zoneId) {
          if (action === "start" && zone.status === "idle") {
            return { ...zone, status: "active", flow: 120, duration: "0:01" };
          } else if (action === "stop" && zone.status === "active") {
            return { ...zone, status: "idle", flow: 0, duration: "0:00" };
          } else if (action === "pause" && zone.status === "active") {
            return { ...zone, status: "paused" };
          }
        }
        return zone;
      }),
    );
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "active":
        return "bg-emerald-50 border-emerald-500 text-emerald-700";
      case "paused":
        return "bg-yellow-50 border-yellow-500 text-yellow-700";
      case "scheduled":
        return "bg-blue-50 border-blue-500 text-blue-700";
      case "maintenance":
        return "bg-red-50 border-red-500 text-red-700";
      default:
        return "bg-gray-50 border-gray-300 text-gray-700";
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case "active":
        return "Faol";
      case "paused":
        return "To'xtatilgan";
      case "scheduled":
        return "Rejalashtirilgan";
      case "maintenance":
        return "Ta'mirlash";
      default:
        return "Nofaol";
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
            Sug'orish boshqaruvi
          </h1>
          <p className="text-gray-600 mt-1">
            8 ta zona real vaqtda boshqaruvi va monitoring
          </p>
        </div>

        {/* System Overview */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
            <div className="flex items-center gap-3 mb-2">
              <Activity className="text-emerald-600" size={20} />
              <span className="text-sm text-gray-600">Faol zonalar</span>
            </div>
            <div className="text-2xl font-bold text-gray-900">
              {zones.filter((z) => z.status === "active").length}/8
            </div>
          </div>

          <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
            <div className="flex items-center gap-3 mb-2">
              <Droplets className="text-blue-600" size={20} />
              <span className="text-sm text-gray-600">Umumiy oqim</span>
            </div>
            <div className="text-2xl font-bold text-gray-900">
              {zones.reduce((sum, zone) => sum + zone.flow, 0)} L/min
            </div>
          </div>

          <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
            <div className="flex items-center gap-3 mb-2">
              <Gauge className="text-purple-600" size={20} />
              <span className="text-sm text-gray-600">O'rtacha bosim</span>
            </div>
            <div className="text-2xl font-bold text-gray-900">
              {(
                zones.reduce((sum, zone) => sum + zone.pressure, 0) /
                zones.length
              ).toFixed(1)}{" "}
              bar
            </div>
          </div>

          <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
            <div className="flex items-center gap-3 mb-2">
              <Clock className="text-orange-600" size={20} />
              <span className="text-sm text-gray-600">Rejalashtirilgan</span>
            </div>
            <div className="text-2xl font-bold text-gray-900">
              {zones.filter((z) => z.status === "scheduled").length}
            </div>
          </div>
        </div>

        {/* Zone Control Grid */}
        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
          <h3 className="text-lg font-bold text-gray-900 mb-6">
            Zona boshqaruvi
          </h3>
          <div className="grid md:grid-cols-2 gap-4">
            {zones.map((zone) => (
              <div
                key={zone.id}
                className={`border-2 rounded-lg p-4 ${getStatusColor(zone.status)}`}
              >
                <div className="flex items-center justify-between mb-4">
                  <h4 className="font-bold text-gray-900">{zone.name}</h4>
                  <span className="text-xs px-2 py-1 rounded-full bg-white border">
                    {getStatusText(zone.status)}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                  <div>
                    <span className="text-gray-600">Tuproq namligi:</span>
                    <span className="font-medium text-gray-900 ml-1">
                      {zone.moisture}%
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-600">Oqim:</span>
                    <span className="font-medium text-gray-900 ml-1">
                      {zone.flow} L/min
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-600">Bosim:</span>
                    <span className="font-medium text-gray-900 ml-1">
                      {zone.pressure} bar
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-600">Davomiyligi:</span>
                    <span className="font-medium text-gray-900 ml-1">
                      {zone.duration}
                    </span>
                  </div>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => toggleZone(zone.id, "start")}
                    disabled={
                      zone.status === "active" || zone.status === "maintenance"
                    }
                    className="flex items-center gap-1 bg-emerald-600 text-white px-3 py-1.5 rounded text-sm hover:bg-emerald-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
                  >
                    <Play size={14} /> Start
                  </button>
                  <button
                    onClick={() => toggleZone(zone.id, "pause")}
                    disabled={zone.status !== "active"}
                    className="flex items-center gap-1 bg-yellow-600 text-white px-3 py-1.5 rounded text-sm hover:bg-yellow-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
                  >
                    <Pause size={14} /> Pause
                  </button>
                  <button
                    onClick={() => toggleZone(zone.id, "stop")}
                    disabled={
                      zone.status === "idle" || zone.status === "maintenance"
                    }
                    className="flex items-center gap-1 bg-red-600 text-white px-3 py-1.5 rounded text-sm hover:bg-red-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
                  >
                    <Square size={14} /> Stop
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Flow History */}
          <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
            <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
              <Activity className="text-blue-600" size={20} />
              24 soatlik oqim tarixi
            </h3>
            <ResponsiveContainer width="100%" height={250}>
              <AreaChart data={flowHistory}>
                <defs>
                  <linearGradient id="colorFlow" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis
                  dataKey="time"
                  stroke="#6b7280"
                  style={{ fontSize: "12px" }}
                />
                <YAxis stroke="#6b7280" style={{ fontSize: "12px" }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#fff",
                    border: "1px solid #e5e7eb",
                    borderRadius: "8px",
                  }}
                  labelStyle={{ color: "#374151", fontWeight: "bold" }}
                />
                <Area
                  type="monotone"
                  dataKey="flow"
                  stroke="#3b82f6"
                  fillOpacity={1}
                  fill="url(#colorFlow)"
                  name="Oqim (L/min)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* Scheduled Tasks */}
          <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
            <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
              <Clock className="text-orange-600" size={20} />
              Rejalashtirilgan vazifalar
            </h3>
            <div className="space-y-3">
              {scheduledTasks.map((task, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                >
                  <div className="flex-1">
                    <div className="font-medium text-gray-900">{task.zone}</div>
                    <div className="text-sm text-gray-600">
                      {task.time} • {task.duration} • {task.type}
                    </div>
                  </div>
                  <div
                    className={`px-2 py-1 rounded text-xs font-medium ${
                      task.priority === "Yuqori"
                        ? "bg-red-100 text-red-700"
                        : task.priority === "O'rta"
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-green-100 text-green-700"
                    }`}
                  >
                    {task.priority}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* AI Irrigation Recommendations */}
        <div className="bg-gradient-to-r from-emerald-50 to-blue-50 rounded-lg p-6 border border-emerald-200">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-bold text-gray-900 flex items-center gap-3">
                <Brain className="text-emerald-600" size={24} />
                AI Sug'orish Tavsiyalari
              </h2>
              <p className="text-gray-600 mt-1">
                Aqlli tavsiyalar real vaqtda ma'lumotlarga asoslanadi
              </p>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-500 flex items-center gap-1">
                <Sparkles size={14} className="text-emerald-500" />
                95.3% aniqlik
              </span>
              <a
                href="/dashboard/ai-assistant"
                className="bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 transition-colors text-sm flex items-center gap-2"
              >
                <MessageSquare size={16} />
                AI Chatbot
              </a>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <div className="bg-white rounded-lg p-4 border border-emerald-200">
              <div className="flex items-center gap-3 mb-3">
                <div className="bg-emerald-100 p-2 rounded-lg">
                  <Droplets className="text-emerald-600" size={20} />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 text-sm">Zone B</h4>
                  <p className="text-xs text-gray-600">Kritik holat</p>
                </div>
              </div>
              <div className="space-y-2">
                <div className="text-sm">
                  <span className="font-medium text-red-600">Tavsiya:</span>
                  <span className="text-gray-700 ml-1">Darhol sug'oring</span>
                </div>
                <div className="text-sm">
                  <span className="font-medium text-gray-600">
                    Davomiyligi:
                  </span>
                  <span className="text-gray-700 ml-1">3 soat</span>
                </div>
                <div className="text-sm">
                  <span className="font-medium text-gray-600">Sabab:</span>
                  <span className="text-gray-700 ml-1">Namlik 38%</span>
                </div>
              </div>
              <div className="mt-3 text-xs text-red-600 bg-red-50 px-2 py-1 rounded">
                🚨 Yuqori ustuvorlik
              </div>
            </div>

            <div className="bg-white rounded-lg p-4 border border-blue-200">
              <div className="flex items-center gap-3 mb-3">
                <div className="bg-blue-100 p-2 rounded-lg">
                  <Clock className="text-blue-600" size={20} />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 text-sm">Zone D</h4>
                  <p className="text-xs text-gray-600">Rejalashtirilgan</p>
                </div>
              </div>
              <div className="space-y-2">
                <div className="text-sm">
                  <span className="font-medium text-blue-600">Tavsiya:</span>
                  <span className="text-gray-700 ml-1">18:00 da boshlang</span>
                </div>
                <div className="text-sm">
                  <span className="font-medium text-gray-600">
                    Davomiyligi:
                  </span>
                  <span className="text-gray-700 ml-1">2.5 soat</span>
                </div>
                <div className="text-sm">
                  <span className="font-medium text-gray-600">Sabab:</span>
                  <span className="text-gray-700 ml-1">Optimal vaqt</span>
                </div>
              </div>
              <div className="mt-3 text-xs text-blue-600 bg-blue-50 px-2 py-1 rounded">
                ⏰ O'rta ustuvorlik
              </div>
            </div>

            <div className="bg-white rounded-lg p-4 border border-green-200">
              <div className="flex items-center gap-3 mb-3">
                <div className="bg-green-100 p-2 rounded-lg">
                  <Activity className="text-green-600" size={20} />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 text-sm">Zone C</h4>
                  <p className="text-xs text-gray-600">Yaxshi holat</p>
                </div>
              </div>
              <div className="space-y-2">
                <div className="text-sm">
                  <span className="font-medium text-green-600">Tavsiya:</span>
                  <span className="text-gray-700 ml-1">
                    Hozircha kerak emas
                  </span>
                </div>
                <div className="text-sm">
                  <span className="font-medium text-gray-600">Keyingi:</span>
                  <span className="text-gray-700 ml-1">Ertaga 10:00</span>
                </div>
                <div className="text-sm">
                  <span className="font-medium text-gray-600">Namlik:</span>
                  <span className="text-gray-700 ml-1">52% (yaxshi)</span>
                </div>
              </div>
              <div className="mt-3 text-xs text-green-600 bg-green-50 px-2 py-1 rounded">
                ✅ Past ustuvorlik
              </div>
            </div>

            <div className="bg-white rounded-lg p-4 border border-purple-200">
              <div className="flex items-center gap-3 mb-3">
                <div className="bg-purple-100 p-2 rounded-lg">
                  <Brain className="text-purple-600" size={20} />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 text-sm">Umumiy</h4>
                  <p className="text-xs text-gray-600">AI tahlil</p>
                </div>
              </div>
              <div className="space-y-2">
                <div className="text-sm">
                  <span className="font-medium text-purple-600">Bugun:</span>
                  <span className="text-gray-700 ml-1">35% suv tejash</span>
                </div>
                <div className="text-sm">
                  <span className="font-medium text-gray-600">Prognoz:</span>
                  <span className="text-gray-700 ml-1">Yomg'ir ertaga</span>
                </div>
                <div className="text-sm">
                  <span className="font-medium text-gray-600">
                    Samaradorlik:
                  </span>
                  <span className="text-gray-700 ml-1">92% (a'lo)</span>
                </div>
              </div>
              <div className="mt-3 text-xs text-purple-600 bg-purple-50 px-2 py-1 rounded">
                🧠 AI optimallashtirish
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg p-4 border border-emerald-200">
            <h4 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
              <Sparkles className="text-emerald-500" size={16} />
              Bugungi AI strategiya
            </h4>
            <div className="grid md:grid-cols-3 gap-4 text-sm">
              <div>
                <span className="font-medium text-gray-700">
                  Ob-havo hisoboti:
                </span>
                <p className="text-gray-600 mt-1">
                  Bugun quruq, ertaga 60% yomg'ir ehtimoli. Zone B va D ni bugun
                  tugating, qolganini kechiktiring.
                </p>
              </div>
              <div>
                <span className="font-medium text-gray-700">Suv tejash:</span>
                <p className="text-gray-600 mt-1">
                  Evapotranspiration past bo'lgani uchun sug'orish vaqtini 20%
                  qisqartiring. Kechqurun sug'orish samaraliroq.
                </p>
              </div>
              <div>
                <span className="font-medium text-gray-700">
                  Keyingi 24 soat:
                </span>
                <p className="text-gray-600 mt-1">
                  Zone G ta'mirlash tugagach, avtomatik rejimga o'ting. Hamma
                  zonalar uchun optimal jadval tayyorlandi.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
          <h3 className="text-lg font-bold text-gray-900 mb-4">
            Tezkor amallar
          </h3>
          <div className="grid md:grid-cols-4 gap-4">
            <button className="flex items-center gap-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50">
              <Play className="text-emerald-600" size={20} />
              <div className="text-left">
                <div className="font-medium text-gray-900">
                  Hamma zonani ishga tushir
                </div>
                <div className="text-sm text-gray-600">
                  Barcha zonalarni faollashtirish
                </div>
              </div>
            </button>

            <button className="flex items-center gap-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50">
              <Square className="text-red-600" size={20} />
              <div className="text-left">
                <div className="font-medium text-gray-900">
                  Favqulodda to'xtatish
                </div>
                <div className="text-sm text-gray-600">
                  Barcha faoliyatni to'xtatish
                </div>
              </div>
            </button>

            <button className="flex items-center gap-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50">
              <Clock className="text-blue-600" size={20} />
              <div className="text-left">
                <div className="font-medium text-gray-900">Avtomatik rejim</div>
                <div className="text-sm text-gray-600">
                  AI tomonidan boshqaruv
                </div>
              </div>
            </button>

            <button className="flex items-center gap-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50">
              <Activity className="text-purple-600" size={20} />
              <div className="text-left">
                <div className="font-medium text-gray-900">Test rejimi</div>
                <div className="text-sm text-gray-600">Tizim diagnostikasi</div>
              </div>
            </button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
