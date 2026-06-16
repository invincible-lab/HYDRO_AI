"use client";

import { useState } from "react";
import {
  Droplets,
  Brain,
  TrendingDown,
  MapPin,
  ChevronRight,
  Menu,
  X,
} from "lucide-react";

export default function HomePage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-50 to-white">
      {/* Navigation */}
      <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-2">
              <Droplets className="text-emerald-600" size={32} />
              <span className="text-xl font-bold text-gray-900">
                HydroIntel AI
              </span>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center gap-8">
              <a
                href="#features"
                className="text-gray-700 hover:text-emerald-600 transition-colors"
              >
                Imkoniyatlar
              </a>
              <a
                href="#benefits"
                className="text-gray-700 hover:text-emerald-600 transition-colors"
              >
                Afzalliklar
              </a>
              <a
                href="#how-it-works"
                className="text-gray-700 hover:text-emerald-600 transition-colors"
              >
                Qanday ishlaydi
              </a>
              <a
                href="/dashboard"
                className="bg-emerald-600 text-white px-6 py-2 rounded-lg hover:bg-emerald-700 transition-colors"
              >
                Kirish
              </a>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="md:hidden py-4 border-t border-gray-200">
              <div className="flex flex-col gap-4">
                <a
                  href="#features"
                  className="text-gray-700 hover:text-emerald-600 transition-colors"
                >
                  Imkoniyatlar
                </a>
                <a
                  href="#benefits"
                  className="text-gray-700 hover:text-emerald-600 transition-colors"
                >
                  Afzalliklar
                </a>
                <a
                  href="#how-it-works"
                  className="text-gray-700 hover:text-emerald-600 transition-colors"
                >
                  Qanday ishlaydi
                </a>
                <a
                  href="/dashboard"
                  className="bg-emerald-600 text-white px-6 py-2 rounded-lg hover:bg-emerald-700 transition-colors text-center"
                >
                  Kirish
                </a>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-block bg-emerald-100 text-emerald-800 px-4 py-2 rounded-full text-sm font-medium mb-6">
              Sun'iy intellekt bilan suv boshqaruvi
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              Fermeringiz uchun aqlli suv boshqaruv tizimi
            </h1>
            <p className="text-lg md:text-xl text-gray-600 mb-8">
              Real vaqtda sensor ma'lumotlari, ob-havo bashorati va ML
              algoritmlari yordamida eng optimal sug'orish rejalari. Suv sarfini
              40% gacha kamaytiring, hosildorlikni oshiring.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="/dashboard"
                className="bg-emerald-600 text-white px-8 py-4 rounded-lg hover:bg-emerald-700 transition-colors text-center font-medium text-lg"
              >
                Boshlab ko'ring
                <ChevronRight className="inline ml-2" size={20} />
              </a>
              <a
                href="#how-it-works"
                className="border-2 border-emerald-600 text-emerald-600 px-8 py-4 rounded-lg hover:bg-emerald-50 transition-colors text-center font-medium text-lg"
              >
                Qanday ishlaydi
              </a>
            </div>
          </div>
          <div className="relative">
            <div className="bg-gradient-to-br from-emerald-400 to-blue-500 rounded-2xl p-8 shadow-2xl">
              <div className="bg-white rounded-xl p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Bugungi tavsiya</span>
                  <Brain className="text-emerald-600" size={24} />
                </div>
                <div className="text-3xl font-bold text-gray-900">2.5 soat</div>
                <div className="text-gray-600">Sug'orish vaqti (Zone A)</div>
                <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4">
                  <div className="text-sm text-emerald-800">
                    ✓ Tuproq namligi: 45% (optimal)
                  </div>
                  <div className="text-sm text-emerald-800">
                    ✓ Ob-havo: Quruq, 28°C
                  </div>
                  <div className="text-sm text-emerald-800">
                    ✓ Suv tejash: 35%
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-emerald-600 py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-white mb-2">
                40%
              </div>
              <div className="text-emerald-100">Suv tejash</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-white mb-2">
                25%
              </div>
              <div className="text-emerald-100">Hosil oshishi</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-white mb-2">
                95%
              </div>
              <div className="text-emerald-100">Bashorat aniqligi</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-white mb-2">
                24/7
              </div>
              <div className="text-emerald-100">Monitoring</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section
        id="features"
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24"
      >
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Platformaning asosiy imkoniyatlari
          </h2>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
            Zamonaviy texnologiyalar va sun'iy intellekt yordamida fermeringizni
            boshqaring
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow">
            <div className="bg-emerald-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
              <Brain className="text-emerald-600" size={24} />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">
              AI Sug'orish Taqvimi
            </h3>
            <p className="text-gray-600">
              Ob-havo, tuproq namligi va o'simlik bosqichlarini tahlil qilib,
              optimal sug'orish vaqtini aniqlaydi
            </p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow">
            <div className="bg-blue-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
              <TrendingDown className="text-blue-600" size={24} />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">
              Suv Tejash Tahlili
            </h3>
            <p className="text-gray-600">
              Real vaqtda suv sarfini kuzatib, tejash imkoniyatlarini ko'rsatadi
              va taqqoslash tahlili beradi
            </p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow">
            <div className="bg-purple-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
              <Droplets className="text-purple-600" size={24} />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">
              Sizish Aniqlash
            </h3>
            <p className="text-gray-600">
              Quvur tizimidagi muammolarni avtomatik aniqlaydi va darhol
              ogohlantirish yuboradi
            </p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow">
            <div className="bg-orange-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
              <MapPin className="text-orange-600" size={24} />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">
              Maydon Xaritasi
            </h3>
            <p className="text-gray-600">
              Tuproq namligi heatmap vizualizatsiyasi orqali maydonning har bir
              qismini kuzating
            </p>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section id="benefits" className="bg-gray-50 py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Nima uchun HydroIntel AI?
              </h2>
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-emerald-600 text-white rounded-full flex items-center justify-center font-bold">
                    1
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2">
                      Real vaqtda ma'lumotlar
                    </h3>
                    <p className="text-gray-600">
                      Sensor ma'lumotlari har 5 daqiqada yangilanadi va darhol
                      tahlil qilinadi
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-emerald-600 text-white rounded-full flex items-center justify-center font-bold">
                    2
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2">
                      ML bashorat modellari
                    </h3>
                    <p className="text-gray-600">
                      7 kunlik suv berilish bashorati va hosildorlik prognozlari
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-emerald-600 text-white rounded-full flex items-center justify-center font-bold">
                    3
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2">
                      Mobil-optimized
                    </h3>
                    <p className="text-gray-600">
                      Dalada ishlash uchun qulay mobil interfeys va offline
                      rejim
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-emerald-600 text-white rounded-full flex items-center justify-center font-bold">
                    4
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2">
                      Avtomatik boshqaruv
                    </h3>
                    <p className="text-gray-600">
                      Sug'orish tizimini masofadan boshqaring va avtomatik
                      rejimga o'ting
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-xl">
              <div className="space-y-6">
                <div className="border-l-4 border-emerald-600 pl-4">
                  <div className="text-2xl font-bold text-gray-900 mb-1">
                    ₽2.4M
                  </div>
                  <div className="text-gray-600">O'rtacha yillik tejash</div>
                </div>
                <div className="border-l-4 border-blue-600 pl-4">
                  <div className="text-2xl font-bold text-gray-900 mb-1">
                    3 oy
                  </div>
                  <div className="text-gray-600">
                    Investitsiya qaytish muddati
                  </div>
                </div>
                <div className="border-l-4 border-purple-600 pl-4">
                  <div className="text-2xl font-bold text-gray-900 mb-1">
                    500+
                  </div>
                  <div className="text-gray-600">Faol fermerlar</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section
        id="how-it-works"
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24"
      >
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Qanday ishlaydi?
          </h2>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
            Uch oddiy qadamda platformani ishga tushiring
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="bg-emerald-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="text-2xl font-bold text-emerald-600">1</span>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">
              Sensorlarni o'rnating
            </h3>
            <p className="text-gray-600">
              Tuproq namligi, harorat va bosim sensorlarini maydoningizga
              joylashtiring
            </p>
          </div>

          <div className="text-center">
            <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="text-2xl font-bold text-blue-600">2</span>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">
              Platformaga ulang
            </h3>
            <p className="text-gray-600">
              Sensorlarni HydroIntel AI platformasiga ulab, maydon
              ma'lumotlarini kiriting
            </p>
          </div>

          <div className="text-center">
            <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="text-2xl font-bold text-purple-600">3</span>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">
              AI tavsiyalarini oling
            </h3>
            <p className="text-gray-600">
              Real vaqtda tavsiyalar va avtomatik sug'orish rejimidan
              foydalaning
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-emerald-600 to-blue-600 py-16 md:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Bugun boshlab ko'ring
          </h2>
          <p className="text-lg md:text-xl text-emerald-50 mb-8">
            14 kunlik bepul sinov davri. Kredit karta talab qilinmaydi.
          </p>
          <a
            href="/dashboard"
            className="inline-block bg-white text-emerald-600 px-8 py-4 rounded-lg hover:bg-gray-100 transition-colors font-medium text-lg"
          >
            Bepul boshlash
            <ChevronRight className="inline ml-2" size={20} />
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Droplets className="text-emerald-500" size={28} />
                <span className="text-xl font-bold text-white">
                  HydroIntel AI
                </span>
              </div>
              <p className="text-gray-400">
                Fermerlar uchun aqlli suv boshqaruv platformasi
              </p>
            </div>

            <div>
              <h3 className="text-white font-bold mb-4">Platforma</h3>
              <ul className="space-y-2">
                <li>
                  <a
                    href="#features"
                    className="hover:text-emerald-500 transition-colors"
                  >
                    Imkoniyatlar
                  </a>
                </li>
                <li>
                  <a
                    href="#benefits"
                    className="hover:text-emerald-500 transition-colors"
                  >
                    Afzalliklar
                  </a>
                </li>
                <li>
                  <a
                    href="#how-it-works"
                    className="hover:text-emerald-500 transition-colors"
                  >
                    Qanday ishlaydi
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-white font-bold mb-4">Yordam</h3>
              <ul className="space-y-2">
                <li>
                  <a
                    href="#"
                    className="hover:text-emerald-500 transition-colors"
                  >
                    Qo'llanma
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-emerald-500 transition-colors"
                  >
                    FAQ
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-emerald-500 transition-colors"
                  >
                    Qo'llab-quvvatlash
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-white font-bold mb-4">Aloqa</h3>
              <ul className="space-y-2">
                <li className="text-gray-400">info@hydrointel.uz</li>
                <li className="text-gray-400">+998 90 123 45 67</li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-8 text-center text-gray-400">
            <p>&copy; 2025 HydroIntel AI. Barcha huquqlar himoyalangan.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
