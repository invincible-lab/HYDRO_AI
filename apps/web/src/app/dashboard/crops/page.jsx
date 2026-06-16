"use client";

import { useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import {
  Sprout,
  Calendar,
  Thermometer,
  Droplets,
  TrendingUp,
  AlertCircle,
} from "lucide-react";

export default function CropsPage() {
  const [crops, setCrops] = useState([
    {
      id: 1,
      name: "Pomidor",
      variety: "Rio Grande",
      zone: "Zone A",
      plantedDate: "2025-03-15",
      stage: "Vegetasiya",
      progress: 65,
      waterRequirement: "450-600 L/hafta",
      temperatureRange: "20-28°C",
      expectedHarvest: "2025-06-20",
      health: "excellent",
      notes: "Yaxshi o'sish, muntazam sug'orish kerak",
    },
    {
      id: 2,
      name: "Bodring",
      variety: "Tashkent-1",
      zone: "Zone B",
      plantedDate: "2025-04-01",
      stage: "Gullash",
      progress: 45,
      waterRequirement: "300-400 L/hafta",
      temperatureRange: "18-25°C",
      expectedHarvest: "2025-05-30",
      health: "good",
      notes: "Gullash boshlandi, suv talabi oshdi",
    },
    {
      id: 3,
      name: "Karam",
      variety: "Aggressor",
      zone: "Zone C",
      plantedDate: "2025-02-20",
      stage: "Rivojlanish",
      progress: 80,
      waterRequirement: "600-800 L/hafta",
      temperatureRange: "15-22°C",
      expectedHarvest: "2025-05-15",
      health: "excellent",
      notes: "Yetilishga yaqin, kuzatuv ostida",
    },
    {
      id: 4,
      name: "Sabzi",
      variety: "Kuroda",
      zone: "Zone D",
      plantedDate: "2025-03-10",
      stage: "Kok rivojlanish",
      progress: 55,
      waterRequirement: "200-300 L/hafta",
      temperatureRange: "16-24°C",
      expectedHarvest: "2025-06-10",
      health: "warning",
      notes: "Ba'zi barglar sarg'ayib ketmoqda, tekshirish kerak",
    },
  ]);

  const [selectedCrop, setSelectedCrop] = useState(crops[0]);

  const getStageColor = (stage) => {
    switch (stage) {
      case "Ekish":
        return "bg-gray-100 text-gray-700";
      case "Vegetasiya":
        return "bg-green-100 text-green-700";
      case "Gullash":
        return "bg-yellow-100 text-yellow-700";
      case "Rivojlanish":
        return "bg-blue-100 text-blue-700";
      case "Kok rivojlanish":
        return "bg-purple-100 text-purple-700";
      case "Yetilish":
        return "bg-orange-100 text-orange-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const getHealthColor = (health) => {
    switch (health) {
      case "excellent":
        return "text-green-600";
      case "good":
        return "text-blue-600";
      case "warning":
        return "text-yellow-600";
      case "poor":
        return "text-red-600";
      default:
        return "text-gray-600";
    }
  };

  const getHealthText = (health) => {
    switch (health) {
      case "excellent":
        return "A'lo";
      case "good":
        return "Yaxshi";
      case "warning":
        return "Diqqat";
      case "poor":
        return "Yomon";
      default:
        return "Noma'lum";
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("uz-UZ", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const getDaysUntilHarvest = (harvestDate) => {
    const today = new Date();
    const harvest = new Date(harvestDate);
    const diffTime = harvest - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
            Ekin boshqaruvi
          </h1>
          <p className="text-gray-600 mt-1">
            O'simlik lifecycle tracking va sog'liq monitoring
          </p>
        </div>

        {/* Overview Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
            <div className="flex items-center gap-3 mb-2">
              <Sprout className="text-emerald-600" size={20} />
              <span className="text-sm text-gray-600">Jami ekinlar</span>
            </div>
            <div className="text-2xl font-bold text-gray-900">
              {crops.length}
            </div>
          </div>

          <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
            <div className="flex items-center gap-3 mb-2">
              <Calendar className="text-blue-600" size={20} />
              <span className="text-sm text-gray-600">Yaqin yig'im</span>
            </div>
            <div className="text-2xl font-bold text-gray-900">
              {Math.min(
                ...crops.map((crop) =>
                  getDaysUntilHarvest(crop.expectedHarvest),
                ),
              )}{" "}
              kun
            </div>
          </div>

          <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
            <div className="flex items-center gap-3 mb-2">
              <TrendingUp className="text-green-600" size={20} />
              <span className="text-sm text-gray-600">Sog'lom ekinlar</span>
            </div>
            <div className="text-2xl font-bold text-gray-900">
              {
                crops.filter(
                  (crop) =>
                    crop.health === "excellent" || crop.health === "good",
                ).length
              }
            </div>
          </div>

          <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
            <div className="flex items-center gap-3 mb-2">
              <AlertCircle className="text-yellow-600" size={20} />
              <span className="text-sm text-gray-600">Diqqat talab</span>
            </div>
            <div className="text-2xl font-bold text-gray-900">
              {
                crops.filter(
                  (crop) => crop.health === "warning" || crop.health === "poor",
                ).length
              }
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Crops List */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
              <div className="p-4 border-b border-gray-200">
                <h3 className="text-lg font-bold text-gray-900">
                  Ekinlar ro'yxati
                </h3>
              </div>
              <div className="divide-y divide-gray-200">
                {crops.map((crop) => (
                  <button
                    key={crop.id}
                    onClick={() => setSelectedCrop(crop)}
                    className={`w-full text-left p-4 hover:bg-gray-50 transition-colors ${
                      selectedCrop.id === crop.id
                        ? "bg-emerald-50 border-r-2 border-emerald-500"
                        : ""
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium text-gray-900">{crop.name}</h4>
                      <span
                        className={`text-xs px-2 py-1 rounded ${getStageColor(crop.stage)}`}
                      >
                        {crop.stage}
                      </span>
                    </div>
                    <div className="text-sm text-gray-600 mb-2">
                      {crop.variety} • {crop.zone}
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1">
                        <div className="w-3 h-3 rounded-full bg-gray-200">
                          <div
                            className="h-full rounded-full bg-emerald-500"
                            style={{ width: `${crop.progress}%` }}
                          />
                        </div>
                        <span className="text-xs text-gray-600">
                          {crop.progress}%
                        </span>
                      </div>
                      <span
                        className={`text-xs font-medium ${getHealthColor(crop.health)}`}
                      >
                        {getHealthText(crop.health)}
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Selected Crop Details */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">
                    {selectedCrop.name}
                  </h2>
                  <p className="text-gray-600">
                    {selectedCrop.variety} • {selectedCrop.zone}
                  </p>
                </div>
                <span
                  className={`px-3 py-1 rounded-full text-sm font-medium ${getStageColor(selectedCrop.stage)}`}
                >
                  {selectedCrop.stage}
                </span>
              </div>

              {/* Progress Bar */}
              <div className="mb-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700">
                    O'sish jarayoni
                  </span>
                  <span className="text-sm font-medium text-gray-900">
                    {selectedCrop.progress}%
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div
                    className="bg-emerald-500 h-3 rounded-full transition-all duration-300"
                    style={{ width: `${selectedCrop.progress}%` }}
                  />
                </div>
              </div>

              {/* Details Grid */}
              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Calendar className="text-blue-600" size={20} />
                    <div>
                      <div className="text-sm text-gray-600">Ekish sanasi</div>
                      <div className="font-medium text-gray-900">
                        {formatDate(selectedCrop.plantedDate)}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <Calendar className="text-green-600" size={20} />
                    <div>
                      <div className="text-sm text-gray-600">
                        Kutilayotgan yig'im
                      </div>
                      <div className="font-medium text-gray-900">
                        {formatDate(selectedCrop.expectedHarvest)}
                        <span className="text-sm text-gray-600 ml-2">
                          ({getDaysUntilHarvest(selectedCrop.expectedHarvest)}{" "}
                          kun qoldi)
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <Droplets className="text-blue-600" size={20} />
                    <div>
                      <div className="text-sm text-gray-600">Suv talabi</div>
                      <div className="font-medium text-gray-900">
                        {selectedCrop.waterRequirement}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Thermometer className="text-red-600" size={20} />
                    <div>
                      <div className="text-sm text-gray-600">
                        Harorat diapazoni
                      </div>
                      <div className="font-medium text-gray-900">
                        {selectedCrop.temperatureRange}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <TrendingUp
                      className={getHealthColor(selectedCrop.health)}
                      size={20}
                    />
                    <div>
                      <div className="text-sm text-gray-600">
                        Sog'liq holati
                      </div>
                      <div
                        className={`font-medium ${getHealthColor(selectedCrop.health)}`}
                      >
                        {getHealthText(selectedCrop.health)}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <AlertCircle className="text-gray-600 mt-1" size={20} />
                    <div>
                      <div className="text-sm text-gray-600">Izohlar</div>
                      <div className="font-medium text-gray-900 text-sm">
                        {selectedCrop.notes}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Growth Stages Timeline */}
              <div className="border-t pt-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">
                  O'sish bosqichlari
                </h3>
                <div className="flex items-center justify-between relative">
                  <div className="absolute top-4 left-0 right-0 h-0.5 bg-gray-200 z-0"></div>
                  <div
                    className="absolute top-4 left-0 h-0.5 bg-emerald-500 z-10 transition-all duration-300"
                    style={{ width: `${selectedCrop.progress}%` }}
                  ></div>

                  {[
                    "Ekish",
                    "Vegetasiya",
                    "Gullash",
                    "Rivojlanish",
                    "Yetilish",
                  ].map((stage, index) => (
                    <div
                      key={stage}
                      className="flex flex-col items-center relative z-20"
                    >
                      <div
                        className={`w-8 h-8 rounded-full border-2 flex items-center justify-center ${
                          index <= (selectedCrop.progress / 20)
                            ? "bg-emerald-500 border-emerald-500"
                            : "bg-white border-gray-300"
                        }`}
                      >
                        <div
                          className={`w-2 h-2 rounded-full ${
                            index <= (selectedCrop.progress / 20)
                              ? "bg-white"
                              : "bg-gray-300"
                          }`}
                        ></div>
                      </div>
                      <div className="text-xs text-gray-600 mt-2 text-center">
                        {stage}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
          <h3 className="text-lg font-bold text-gray-900 mb-4">
            Tezkor amallar
          </h3>
          <div className="grid md:grid-cols-4 gap-4">
            <button className="flex items-center gap-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50">
              <Sprout className="text-emerald-600" size={20} />
              <div className="text-left">
                <div className="font-medium text-gray-900">
                  Yangi ekin qo'shish
                </div>
                <div className="text-sm text-gray-600">
                  Yangi o'simlik ro'yxatga olish
                </div>
              </div>
            </button>

            <button className="flex items-center gap-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50">
              <Calendar className="text-blue-600" size={20} />
              <div className="text-left">
                <div className="font-medium text-gray-900">Yig'im jadvali</div>
                <div className="text-sm text-gray-600">
                  Yig'im sanalarini rejalashtirish
                </div>
              </div>
            </button>

            <button className="flex items-center gap-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50">
              <Droplets className="text-cyan-600" size={20} />
              <div className="text-left">
                <div className="font-medium text-gray-900">Suv rejimi</div>
                <div className="text-sm text-gray-600">
                  Sug'orish jadvalini sozlash
                </div>
              </div>
            </button>

            <button className="flex items-center gap-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50">
              <AlertCircle className="text-red-600" size={20} />
              <div className="text-left">
                <div className="font-medium text-gray-900">
                  Muammo bildirish
                </div>
                <div className="text-sm text-gray-600">
                  Kasallik yoki zararkunanda
                </div>
              </div>
            </button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
