"use client";

import { useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import {
  Settings,
  Bell,
  Mail,
  Smartphone,
  Volume2,
  Sun,
  Moon,
  Globe,
  Thermometer,
  Droplets,
  Clock,
} from "lucide-react";

export default function SettingsPage() {
  const [settings, setSettings] = useState({
    notifications: {
      email: true,
      sms: false,
      push: true,
      sound: true,
    },
    alerts: {
      temperature: { min: 15, max: 35, enabled: true },
      humidity: { min: 30, max: 70, enabled: true },
      irrigation: { enabled: true, beforeStart: 30 },
    },
    display: {
      darkMode: false,
      language: "uz",
      units: "metric",
    },
    system: {
      updateInterval: 5,
      autoBackup: true,
      dataRetention: 365,
    },
  });

  const handleSettingChange = (category, key, value) => {
    setSettings((prev) => ({
      ...prev,
      [category]: {
        ...prev[category],
        [key]: value,
      },
    }));
  };

  const handleNestedSettingChange = (category, subKey, key, value) => {
    setSettings((prev) => ({
      ...prev,
      [category]: {
        ...prev[category],
        [subKey]: {
          ...prev[category][subKey],
          [key]: value,
        },
      },
    }));
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
            Sozlamalar
          </h1>
          <p className="text-gray-600 mt-1">
            Tizim sozlamalari va shaxsiy parametrlar
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Notification Settings */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center gap-3 mb-6">
              <Bell className="text-blue-600" size={24} />
              <h2 className="text-xl font-bold text-gray-900">
                Bildirishnoma sozlamalari
              </h2>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Mail className="text-gray-600" size={20} />
                  <div>
                    <div className="font-medium text-gray-900">
                      Email bildirishnomalar
                    </div>
                    <div className="text-sm text-gray-600">
                      Muhim ogohlantirishlar uchun
                    </div>
                  </div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={settings.notifications.email}
                    onChange={(e) =>
                      handleSettingChange(
                        "notifications",
                        "email",
                        e.target.checked,
                      )
                    }
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-emerald-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-600"></div>
                </label>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Smartphone className="text-gray-600" size={20} />
                  <div>
                    <div className="font-medium text-gray-900">
                      SMS bildirishnomalar
                    </div>
                    <div className="text-sm text-gray-600">
                      Favqulodda holatlar uchun
                    </div>
                  </div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={settings.notifications.sms}
                    onChange={(e) =>
                      handleSettingChange(
                        "notifications",
                        "sms",
                        e.target.checked,
                      )
                    }
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-emerald-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-600"></div>
                </label>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Bell className="text-gray-600" size={20} />
                  <div>
                    <div className="font-medium text-gray-900">
                      Push bildirishnomalar
                    </div>
                    <div className="text-sm text-gray-600">
                      Brauzer va mobil ilovada
                    </div>
                  </div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={settings.notifications.push}
                    onChange={(e) =>
                      handleSettingChange(
                        "notifications",
                        "push",
                        e.target.checked,
                      )
                    }
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-emerald-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-600"></div>
                </label>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Volume2 className="text-gray-600" size={20} />
                  <div>
                    <div className="font-medium text-gray-900">
                      Ovozli bildirishnomalar
                    </div>
                    <div className="text-sm text-gray-600">
                      Ovozli signal va ogohlantirish
                    </div>
                  </div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={settings.notifications.sound}
                    onChange={(e) =>
                      handleSettingChange(
                        "notifications",
                        "sound",
                        e.target.checked,
                      )
                    }
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-emerald-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-600"></div>
                </label>
              </div>
            </div>
          </div>

          {/* Alert Configuration */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center gap-3 mb-6">
              <Settings className="text-orange-600" size={24} />
              <h2 className="text-xl font-bold text-gray-900">
                Ogohlantirish konfiguratsiyasi
              </h2>
            </div>

            <div className="space-y-6">
              {/* Temperature Alerts */}
              <div>
                <div className="flex items-center gap-3 mb-3">
                  <Thermometer className="text-red-600" size={20} />
                  <span className="font-medium text-gray-900">
                    Harorat ogohlantirishlari
                  </span>
                  <label className="relative inline-flex items-center cursor-pointer ml-auto">
                    <input
                      type="checkbox"
                      checked={settings.alerts.temperature.enabled}
                      onChange={(e) =>
                        handleNestedSettingChange(
                          "alerts",
                          "temperature",
                          "enabled",
                          e.target.checked,
                        )
                      }
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-emerald-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-600"></div>
                  </label>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-gray-600 mb-1">
                      Minimal harorat
                    </label>
                    <div className="flex items-center gap-2">
                      <input
                        type="number"
                        value={settings.alerts.temperature.min}
                        onChange={(e) =>
                          handleNestedSettingChange(
                            "alerts",
                            "temperature",
                            "min",
                            parseInt(e.target.value),
                          )
                        }
                        className="w-full px-3 py-2 border border-gray-200 rounded focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                      />
                      <span className="text-sm text-gray-600">°C</span>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm text-gray-600 mb-1">
                      Maksimal harorat
                    </label>
                    <div className="flex items-center gap-2">
                      <input
                        type="number"
                        value={settings.alerts.temperature.max}
                        onChange={(e) =>
                          handleNestedSettingChange(
                            "alerts",
                            "temperature",
                            "max",
                            parseInt(e.target.value),
                          )
                        }
                        className="w-full px-3 py-2 border border-gray-200 rounded focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                      />
                      <span className="text-sm text-gray-600">°C</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Humidity Alerts */}
              <div>
                <div className="flex items-center gap-3 mb-3">
                  <Droplets className="text-blue-600" size={20} />
                  <span className="font-medium text-gray-900">
                    Namlik ogohlantirishlari
                  </span>
                  <label className="relative inline-flex items-center cursor-pointer ml-auto">
                    <input
                      type="checkbox"
                      checked={settings.alerts.humidity.enabled}
                      onChange={(e) =>
                        handleNestedSettingChange(
                          "alerts",
                          "humidity",
                          "enabled",
                          e.target.checked,
                        )
                      }
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-emerald-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-600"></div>
                  </label>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-gray-600 mb-1">
                      Minimal namlik
                    </label>
                    <div className="flex items-center gap-2">
                      <input
                        type="number"
                        value={settings.alerts.humidity.min}
                        onChange={(e) =>
                          handleNestedSettingChange(
                            "alerts",
                            "humidity",
                            "min",
                            parseInt(e.target.value),
                          )
                        }
                        className="w-full px-3 py-2 border border-gray-200 rounded focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                      />
                      <span className="text-sm text-gray-600">%</span>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm text-gray-600 mb-1">
                      Maksimal namlik
                    </label>
                    <div className="flex items-center gap-2">
                      <input
                        type="number"
                        value={settings.alerts.humidity.max}
                        onChange={(e) =>
                          handleNestedSettingChange(
                            "alerts",
                            "humidity",
                            "max",
                            parseInt(e.target.value),
                          )
                        }
                        className="w-full px-3 py-2 border border-gray-200 rounded focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                      />
                      <span className="text-sm text-gray-600">%</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Irrigation Alerts */}
              <div>
                <div className="flex items-center gap-3 mb-3">
                  <Droplets className="text-emerald-600" size={20} />
                  <span className="font-medium text-gray-900">
                    Sug'orish ogohlantirishlari
                  </span>
                  <label className="relative inline-flex items-center cursor-pointer ml-auto">
                    <input
                      type="checkbox"
                      checked={settings.alerts.irrigation.enabled}
                      onChange={(e) =>
                        handleNestedSettingChange(
                          "alerts",
                          "irrigation",
                          "enabled",
                          e.target.checked,
                        )
                      }
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-emerald-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-600"></div>
                  </label>
                </div>
                <div>
                  <label className="block text-sm text-gray-600 mb-1">
                    Boshlanishdan oldin ogohlantirish
                  </label>
                  <div className="flex items-center gap-2">
                    <input
                      type="number"
                      value={settings.alerts.irrigation.beforeStart}
                      onChange={(e) =>
                        handleNestedSettingChange(
                          "alerts",
                          "irrigation",
                          "beforeStart",
                          parseInt(e.target.value),
                        )
                      }
                      className="w-full px-3 py-2 border border-gray-200 rounded focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    />
                    <span className="text-sm text-gray-600">daqiqa</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Display Settings */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center gap-3 mb-6">
              <Sun className="text-yellow-600" size={24} />
              <h2 className="text-xl font-bold text-gray-900">
                Displey sozlamalari
              </h2>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {settings.display.darkMode ? (
                    <Moon className="text-gray-600" size={20} />
                  ) : (
                    <Sun className="text-gray-600" size={20} />
                  )}
                  <div>
                    <div className="font-medium text-gray-900">Tungi rejim</div>
                    <div className="text-sm text-gray-600">
                      Ko'zni himoya qilish uchun qorong'u tema
                    </div>
                  </div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={settings.display.darkMode}
                    onChange={(e) =>
                      handleSettingChange(
                        "display",
                        "darkMode",
                        e.target.checked,
                      )
                    }
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-emerald-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-600"></div>
                </label>
              </div>

              <div>
                <div className="flex items-center gap-3 mb-2">
                  <Globe className="text-gray-600" size={20} />
                  <span className="font-medium text-gray-900">Til</span>
                </div>
                <select
                  value={settings.display.language}
                  onChange={(e) =>
                    handleSettingChange("display", "language", e.target.value)
                  }
                  className="w-full px-3 py-2 border border-gray-200 rounded focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                >
                  <option value="uz">O'zbekcha</option>
                  <option value="ru">Русский</option>
                  <option value="en">English</option>
                </select>
              </div>

              <div>
                <div className="flex items-center gap-3 mb-2">
                  <Settings className="text-gray-600" size={20} />
                  <span className="font-medium text-gray-900">
                    O'lchov birliklari
                  </span>
                </div>
                <select
                  value={settings.display.units}
                  onChange={(e) =>
                    handleSettingChange("display", "units", e.target.value)
                  }
                  className="w-full px-3 py-2 border border-gray-200 rounded focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                >
                  <option value="metric">Metrik (°C, L, bar)</option>
                  <option value="imperial">Imperial (°F, gal, psi)</option>
                </select>
              </div>
            </div>
          </div>

          {/* System Settings */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center gap-3 mb-6">
              <Clock className="text-purple-600" size={24} />
              <h2 className="text-xl font-bold text-gray-900">
                Tizim sozlamalari
              </h2>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block font-medium text-gray-900 mb-2">
                  Ma'lumot yangilanish oralig'i
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    min="1"
                    max="60"
                    value={settings.system.updateInterval}
                    onChange={(e) =>
                      handleSettingChange(
                        "system",
                        "updateInterval",
                        parseInt(e.target.value),
                      )
                    }
                    className="w-20 px-3 py-2 border border-gray-200 rounded focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  />
                  <span className="text-sm text-gray-600">daqiqa</span>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium text-gray-900">
                    Avtomatik zaxira nusxa
                  </div>
                  <div className="text-sm text-gray-600">
                    Kunlik ma'lumotlarni avtomatik saqlash
                  </div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={settings.system.autoBackup}
                    onChange={(e) =>
                      handleSettingChange(
                        "system",
                        "autoBackup",
                        e.target.checked,
                      )
                    }
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-emerald-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-600"></div>
                </label>
              </div>

              <div>
                <label className="block font-medium text-gray-900 mb-2">
                  Ma'lumotlarni saqlash muddati
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    min="30"
                    max="1095"
                    value={settings.system.dataRetention}
                    onChange={(e) =>
                      handleSettingChange(
                        "system",
                        "dataRetention",
                        parseInt(e.target.value),
                      )
                    }
                    className="w-24 px-3 py-2 border border-gray-200 rounded focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  />
                  <span className="text-sm text-gray-600">kun</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Save Button */}
        <div className="flex justify-end">
          <button className="bg-emerald-600 text-white px-8 py-3 rounded-lg hover:bg-emerald-700 transition-colors font-medium">
            Sozlamalarni saqlash
          </button>
        </div>
      </div>
    </DashboardLayout>
  );
}
