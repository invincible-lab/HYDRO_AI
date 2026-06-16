"use client";

import { useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import {
  Droplets,
  Thermometer,
  Wind,
  AlertTriangle,
  TrendingUp,
  Activity,
  Brain,
  MessageSquare,
  Sparkles,
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
  Legend,
} from "recharts";

export default function DashboardPage() {
  // Simulated real-time data
  const [sensorData] = useState({
    soilMoisture: 45,
    temperature: 28,
    humidity: 62,
    evapotranspiration: 4.2,
    pressure: 2.8,
    flowRate: 125,
  });

  const [trendData] = useState([
    { time: "00:00", moisture: 52, temp: 22, et: 2.1 },
    { time: "04:00", moisture: 50, temp: 20, et: 1.8 },
    { time: "08:00", moisture: 48, temp: 24, et: 3.2 },
    { time: "12:00", moisture: 45, temp: 28, et: 4.5 },
    { time: "16:00", moisture: 43, temp: 30, et: 5.1 },
    { time: "20:00", moisture: 45, temp: 26, et: 3.8 },
    { time: "24:00", moisture: 45, temp: 23, et: 2.5 },
  ]);

  const [alerts] = useState([
    {
      id: 1,
      type: "warning",
      message: "Zone B: Tuproq namligi 40% dan past",
      time: "10 daqiqa oldin",
    },
    {
      id: 2,
      type: "info",
      message: "Ertaga yomg'ir kutilmoqda (60% ehtimol)",
      time: "1 soat oldin",
    },
    {
      id: 3,
      type: "success",
      message: "Zone A sug'orish muvaffaqiyatli yakunlandi",
      time: "2 soat oldin",
    },
  ]);

  const [aiRecommendations] = useState([
    {
      zone: "Zone A",
      action: "Sug'orish tavsiya etiladi",
      duration: "2.5 soat",
      waterAmount: "450 L",
      timing: "Bugun 18:00",
      confidence: 95,
    },
    {
      zone: "Zone B",
      action: "Zudlik bilan sug'orish kerak",
      duration: "3 soat",
      waterAmount: "520 L",
      timing: "Hozir",
      confidence: 98,
    },
    {
      zone: "Zone C",
      action: "Sug'orish shart emas",
      duration: "-",
      waterAmount: "-",
      timing: "Ertaga tekshirish",
      confidence: 92,
    },
  ]);

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
            Boshqaruv paneli
          </h1>
          <p className="text-gray-600 mt-1">
            Real vaqtda sensor ma'lumotlari va AI tavsiyalari
          </p>
        </div>

        {/* Key Metrics Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
          <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between mb-2">
              <Droplets className="text-blue-600" size={20} />
              <span className="text-xs text-gray-500">Real vaqt</span>
            </div>
            <div className="text-2xl font-bold text-gray-900">
              {sensorData.soilMoisture}%
            </div>
            <div className="text-xs text-gray-600">Tuproq namligi</div>
          </div>

          <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between mb-2">
              <Thermometer className="text-red-600" size={20} />
              <span className="text-xs text-gray-500">Real vaqt</span>
            </div>
            <div className="text-2xl font-bold text-gray-900">
              {sensorData.temperature}°C
            </div>
            <div className="text-xs text-gray-600">Harorat</div>
          </div>

          <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between mb-2">
              <Wind className="text-cyan-600" size={20} />
              <span className="text-xs text-gray-500">Real vaqt</span>
            </div>
            <div className="text-2xl font-bold text-gray-900">
              {sensorData.humidity}%
            </div>
            <div className="text-xs text-gray-600">Namlik</div>
          </div>

          <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between mb-2">
              <TrendingUp className="text-orange-600" size={20} />
              <span className="text-xs text-gray-500">Real vaqt</span>
            </div>
            <div className="text-2xl font-bold text-gray-900">
              {sensorData.evapotranspiration}
            </div>
            <div className="text-xs text-gray-600">ET (mm/kun)</div>
          </div>

          <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between mb-2">
              <Activity className="text-purple-600" size={20} />
              <span className="text-xs text-gray-500">Real vaqt</span>
            </div>
            <div className="text-2xl font-bold text-gray-900">
              {sensorData.pressure}
            </div>
            <div className="text-xs text-gray-600">Bosim (bar)</div>
          </div>

          <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between mb-2">
              <Droplets className="text-emerald-600" size={20} />
              <span className="text-xs text-gray-500">Real vaqt</span>
            </div>
            <div className="text-2xl font-bold text-gray-900">
              {sensorData.flowRate}
            </div>
            <div className="text-xs text-gray-600">Oqim (L/min)</div>
          </div>
        </div>

        {/* Charts Row */}
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Soil Moisture Trend */}
          <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
            <h3 className="text-lg font-bold text-gray-900 mb-4">
              24 soatlik tuproq namligi
            </h3>
            <ResponsiveContainer width="100%" height={250}>
              <AreaChart data={trendData}>
                <defs>
                  <linearGradient
                    id="colorMoisture"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
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
                  dataKey="moisture"
                  stroke="#3b82f6"
                  fillOpacity={1}
                  fill="url(#colorMoisture)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* Temperature & ET Trend */}
          <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
            <h3 className="text-lg font-bold text-gray-900 mb-4">
              Harorat va ET dinamikasi
            </h3>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={trendData}>
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
                <Legend wrapperStyle={{ fontSize: "12px" }} />
                <Line
                  type="monotone"
                  dataKey="temp"
                  stroke="#ef4444"
                  strokeWidth={2}
                  name="Harorat (°C)"
                />
                <Line
                  type="monotone"
                  dataKey="et"
                  stroke="#f97316"
                  strokeWidth={2}
                  name="ET (mm/kun)"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* AI Recommendations */}
        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
          <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
            <Activity className="text-emerald-600" size={20} />
            AI tavsiyalari
          </h3>
          <div className="grid md:grid-cols-3 gap-4">
            {aiRecommendations.map((rec, index) => (
              <div
                key={index}
                className={`border-2 rounded-lg p-4 ${
                  rec.confidence >= 95
                    ? "border-emerald-500 bg-emerald-50"
                    : rec.confidence >= 90
                      ? "border-blue-500 bg-blue-50"
                      : "border-gray-300 bg-gray-50"
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="font-bold text-gray-900">{rec.zone}</span>
                  <span className="text-xs bg-white px-2 py-1 rounded-full border border-gray-200">
                    {rec.confidence}% ishonch
                  </span>
                </div>
                <div className="space-y-2">
                  <div className="text-sm">
                    <span className="text-gray-600">Tavsiya:</span>
                    <span className="font-medium text-gray-900 ml-2">
                      {rec.action}
                    </span>
                  </div>
                  <div className="text-sm">
                    <span className="text-gray-600">Davomiyligi:</span>
                    <span className="font-medium text-gray-900 ml-2">
                      {rec.duration}
                    </span>
                  </div>
                  <div className="text-sm">
                    <span className="text-gray-600">Suv miqdori:</span>
                    <span className="font-medium text-gray-900 ml-2">
                      {rec.waterAmount}
                    </span>
                  </div>
                  <div className="text-sm">
                    <span className="text-gray-600">Vaqt:</span>
                    <span className="font-medium text-gray-900 ml-2">
                      {rec.timing}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* AI Quick Access */}
        <div className="bg-gradient-to-r from-emerald-50 to-blue-50 rounded-lg p-6 border border-emerald-200">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-bold text-gray-900 flex items-center gap-3">
                <Brain className="text-emerald-600" size={24} />
                AI Yordamchi
              </h2>
              <p className="text-gray-600 mt-1">
                Ferma boshqaruvi uchun aqlli yordam
              </p>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-500 flex items-center gap-1">
                <Sparkles size={14} className="text-emerald-500" />
                Bepul GPT-4
              </span>
              <a
                href="/dashboard/ai-assistant"
                className="bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 transition-colors text-sm flex items-center gap-2"
              >
                <MessageSquare size={16} />
                Chatbot ochish
              </a>
            </div>
          </div>

          <div className="grid md:grid-cols-4 gap-4">
            <div className="bg-white rounded-lg p-4 border border-emerald-200 hover:shadow-md transition-shadow">
              <div className="flex items-center gap-3 mb-3">
                <div className="bg-emerald-100 p-2 rounded-lg">
                  <Droplets className="text-emerald-600" size={20} />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 text-sm">
                    Sug'orish AI
                  </h4>
                  <p className="text-xs text-gray-600">Bugun uchun tavsiya</p>
                </div>
              </div>
              <div className="space-y-2">
                <div className="text-xs">
                  <span className="font-medium text-emerald-700">Zone A:</span>
                  <span className="text-gray-600 ml-1">2.5 soat (18:00)</span>
                </div>
                <div className="text-xs">
                  <span className="font-medium text-blue-700">Zone B:</span>
                  <span className="text-gray-600 ml-1">Skip (yomg'ir)</span>
                </div>
                <div className="text-xs">
                  <span className="font-medium text-purple-700">Zone C:</span>
                  <span className="text-gray-600 ml-1">1.8 soat (20:00)</span>
                </div>
              </div>
              <div className="mt-3 text-xs text-green-600 bg-green-50 px-2 py-1 rounded">
                ✓ 35% suv tejash
              </div>
            </div>

            <div className="bg-white rounded-lg p-4 border border-blue-200 hover:shadow-md transition-shadow">
              <div className="flex items-center gap-3 mb-3">
                <div className="bg-blue-100 p-2 rounded-lg">
                  <TrendingUp className="text-blue-600" size={20} />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 text-sm">Ekin AI</h4>
                  <p className="text-xs text-gray-600">O'simlik tahlili</p>
                </div>
              </div>
              <div className="space-y-2">
                <div className="text-xs">
                  <span className="font-medium text-green-600">Pomidor:</span>
                  <span className="text-gray-600 ml-1">95% sog'lom</span>
                </div>
                <div className="text-xs">
                  <span className="font-medium text-yellow-600">Sabzi:</span>
                  <span className="text-gray-600 ml-1">Tekshirish kerak</span>
                </div>
                <div className="text-xs">
                  <span className="font-medium text-green-600">Karam:</span>
                  <span className="text-gray-600 ml-1">Yig'im 5 kun</span>
                </div>
              </div>
              <div className="mt-3 text-xs text-blue-600 bg-blue-50 px-2 py-1 rounded">
                💡 Sabzi tekshiring
              </div>
            </div>

            <div className="bg-white rounded-lg p-4 border border-purple-200 hover:shadow-md transition-shadow">
              <div className="flex items-center gap-3 mb-3">
                <div className="bg-purple-100 p-2 rounded-lg">
                  <Wind className="text-purple-600" size={20} />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 text-sm">
                    Ob-havo AI
                  </h4>
                  <p className="text-xs text-gray-600">3 kunlik bashorat</p>
                </div>
              </div>
              <div className="space-y-2">
                <div className="text-xs">
                  <span className="font-medium text-gray-900">Bugun:</span>
                  <span className="text-gray-600 ml-1">28°C, quruq</span>
                </div>
                <div className="text-xs">
                  <span className="font-medium text-gray-900">Ertaga:</span>
                  <span className="text-gray-600 ml-1">25°C, yomg'ir 60%</span>
                </div>
                <div className="text-xs">
                  <span className="font-medium text-gray-900">Indinga:</span>
                  <span className="text-gray-600 ml-1">30°C, quyoshli</span>
                </div>
              </div>
              <div className="mt-3 text-xs text-purple-600 bg-purple-50 px-2 py-1 rounded">
                🌧️ Ertaga kechiktiring
              </div>
            </div>

            <div className="bg-white rounded-lg p-4 border border-orange-200 hover:shadow-md transition-shadow">
              <div className="flex items-center gap-3 mb-3">
                <div className="bg-orange-100 p-2 rounded-lg">
                  <Activity className="text-orange-600" size={20} />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 text-sm">
                    Anomaliya AI
                  </h4>
                  <p className="text-xs text-gray-600">Avtomatik aniqlash</p>
                </div>
              </div>
              <div className="space-y-2">
                <div className="text-xs">
                  <span className="font-medium text-green-600">Tizim:</span>
                  <span className="text-gray-600 ml-1">Normal</span>
                </div>
                <div className="text-xs">
                  <span className="font-medium text-yellow-600">Zone D:</span>
                  <span className="text-gray-600 ml-1">Bosim pasaygan</span>
                </div>
                <div className="text-xs">
                  <span className="font-medium text-green-600">Sensorlar:</span>
                  <span className="text-gray-600 ml-1">Ishlayapti</span>
                </div>
              </div>
              <div className="mt-3 text-xs text-orange-600 bg-orange-50 px-2 py-1 rounded">
                ⚠️ Zone D tekshiring
              </div>
            </div>
          </div>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600 mb-3">
              AI yordamchi bilan istalgan savol so'rang
            </p>
            <div className="flex flex-wrap justify-center gap-2">
              <span className="text-xs bg-white px-3 py-1 rounded-full border border-gray-200 text-gray-600">
                "Zone A uchun eng yaxshi vaqt?"
              </span>
              <span className="text-xs bg-white px-3 py-1 rounded-full border border-gray-200 text-gray-600">
                "Qanday qilib suv tejash mumkin?"
              </span>
              <span className="text-xs bg-white px-3 py-1 rounded-full border border-gray-200 text-gray-600">
                "O'simlik kasalligi aniqlash"
              </span>
            </div>
          </div>
        </div>

        {/* Alerts */}
        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
          <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
            <AlertTriangle className="text-orange-600" size={20} />
            Oxirgi ogohlantirishlar
          </h3>
          <div className="space-y-3">
            {alerts.map((alert) => (
              <div
                key={alert.id}
                className={`flex items-start gap-3 p-4 rounded-lg ${
                  alert.type === "warning"
                    ? "bg-orange-50 border border-orange-200"
                    : alert.type === "info"
                      ? "bg-blue-50 border border-blue-200"
                      : "bg-emerald-50 border border-emerald-200"
                }`}
              >
                <AlertTriangle
                  className={
                    alert.type === "warning"
                      ? "text-orange-600"
                      : alert.type === "info"
                        ? "text-blue-600"
                        : "text-emerald-600"
                  }
                  size={20}
                />
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">
                    {alert.message}
                  </p>
                  <p className="text-xs text-gray-600 mt-1">{alert.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
