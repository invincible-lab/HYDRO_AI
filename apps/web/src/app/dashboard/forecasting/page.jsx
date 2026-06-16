"use client";

import { useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import {
  TrendingUp,
  Droplets,
  Thermometer,
  Cloud,
  Activity,
} from "lucide-react";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

export default function ForecastingPage() {
  const [forecastData] = useState([
    { day: "Dush", water: 450, temp: 28, et: 4.2, rain: 0 },
    { day: "Sesh", water: 520, temp: 30, et: 4.8, rain: 0 },
    { day: "Chor", water: 380, temp: 26, et: 3.5, rain: 15 },
    { day: "Pay", water: 420, temp: 27, et: 3.9, rain: 5 },
    { day: "Jum", water: 480, temp: 29, et: 4.5, rain: 0 },
    { day: "Shan", water: 510, temp: 31, et: 5.1, rain: 0 },
    { day: "Yak", water: 440, temp: 28, et: 4.0, rain: 10 },
  ]);

  const [moistureYieldData] = useState([
    { moisture: 30, yield: 45 },
    { moisture: 35, yield: 58 },
    { moisture: 40, yield: 72 },
    { moisture: 45, yield: 85 },
    { moisture: 50, yield: 92 },
    { moisture: 55, yield: 95 },
    { moisture: 60, yield: 93 },
    { moisture: 65, yield: 88 },
  ]);

  const [mlMetrics] = useState({
    accuracy: 95.3,
    precision: 94.8,
    recall: 96.1,
    f1Score: 95.4,
  });

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
            Bashorat va tahlil
          </h1>
          <p className="text-gray-600 mt-1">
            7 kunlik suv berilish bashorati va ML model ko'rsatkichlari
          </p>
        </div>

        {/* ML Model Performance */}
        <div className="bg-gradient-to-r from-emerald-600 to-blue-600 rounded-lg p-6 text-white">
          <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
            <Activity size={20} />
            ML Model Performance
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <div className="text-3xl font-bold">{mlMetrics.accuracy}%</div>
              <div className="text-emerald-100 text-sm">Aniqlik (Accuracy)</div>
            </div>
            <div>
              <div className="text-3xl font-bold">{mlMetrics.precision}%</div>
              <div className="text-emerald-100 text-sm">Precision</div>
            </div>
            <div>
              <div className="text-3xl font-bold">{mlMetrics.recall}%</div>
              <div className="text-emerald-100 text-sm">Recall</div>
            </div>
            <div>
              <div className="text-3xl font-bold">{mlMetrics.f1Score}%</div>
              <div className="text-emerald-100 text-sm">F1 Score</div>
            </div>
          </div>
        </div>

        {/* 7-Day Water Forecast */}
        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
          <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
            <Droplets className="text-blue-600" size={20} />7 kunlik suv
            berilish bashorati
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={forecastData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis
                dataKey="day"
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
              <Bar
                dataKey="water"
                fill="#3b82f6"
                name="Suv (L)"
                radius={[8, 8, 0, 0]}
              />
              <Bar
                dataKey="rain"
                fill="#06b6d4"
                name="Yomg'ir (mm)"
                radius={[8, 8, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Temperature & ET Forecast */}
        <div className="grid lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
            <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
              <Thermometer className="text-red-600" size={20} />
              Harorat bashorati
            </h3>
            <ResponsiveContainer width="100%" height={250}>
              <AreaChart data={forecastData}>
                <defs>
                  <linearGradient id="colorTemp" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#ef4444" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#ef4444" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis
                  dataKey="day"
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
                  dataKey="temp"
                  stroke="#ef4444"
                  fillOpacity={1}
                  fill="url(#colorTemp)"
                  name="Harorat (°C)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
            <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
              <TrendingUp className="text-orange-600" size={20} />
              ET bashorati
            </h3>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={forecastData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis
                  dataKey="day"
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
                <Line
                  type="monotone"
                  dataKey="et"
                  stroke="#f97316"
                  strokeWidth={3}
                  name="ET (mm/kun)"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Moisture vs Yield Correlation */}
        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
          <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
            <Activity className="text-emerald-600" size={20} />
            Tuproq namligi va hosil korrelatsiyasi
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={moistureYieldData}>
              <defs>
                <linearGradient id="colorYield" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis
                dataKey="moisture"
                stroke="#6b7280"
                style={{ fontSize: "12px" }}
                label={{
                  value: "Tuproq namligi (%)",
                  position: "insideBottom",
                  offset: -5,
                }}
              />
              <YAxis
                stroke="#6b7280"
                style={{ fontSize: "12px" }}
                label={{
                  value: "Hosil (%)",
                  angle: -90,
                  position: "insideLeft",
                }}
              />
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
                dataKey="yield"
                stroke="#10b981"
                fillOpacity={1}
                fill="url(#colorYield)"
                name="Hosil (%)"
              />
            </AreaChart>
          </ResponsiveContainer>
          <div className="mt-4 p-4 bg-emerald-50 border border-emerald-200 rounded-lg">
            <p className="text-sm text-emerald-800">
              <strong>Tahlil:</strong> Optimal tuproq namligi 50-55% oralig'ida
              bo'lganda hosildorlik maksimal darajaga yetadi. Bu oraliqdan
              chiqish hosildorlikni pasaytiradi.
            </p>
          </div>
        </div>

        {/* Weekly Summary */}
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-blue-100 p-3 rounded-lg">
                <Droplets className="text-blue-600" size={24} />
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">3,200 L</div>
                <div className="text-sm text-gray-600">Haftalik suv sarfi</div>
              </div>
            </div>
            <div className="text-sm text-gray-600">
              O'tgan haftaga nisbatan{" "}
              <span className="text-emerald-600 font-medium">-12%</span>
            </div>
          </div>

          <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-orange-100 p-3 rounded-lg">
                <Thermometer className="text-orange-600" size={24} />
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">28.5°C</div>
                <div className="text-sm text-gray-600">O'rtacha harorat</div>
              </div>
            </div>
            <div className="text-sm text-gray-600">
              O'tgan haftaga nisbatan{" "}
              <span className="text-red-600 font-medium">+2.3°C</span>
            </div>
          </div>

          <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-cyan-100 p-3 rounded-lg">
                <Cloud className="text-cyan-600" size={24} />
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">30 mm</div>
                <div className="text-sm text-gray-600">
                  Kutilayotgan yomg'ir
                </div>
              </div>
            </div>
            <div className="text-sm text-gray-600">Keyingi 7 kun davomida</div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
