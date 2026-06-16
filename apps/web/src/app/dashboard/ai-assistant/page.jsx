"use client";

import { useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import ReactMarkdown from "react-markdown";
import {
  Send,
  Bot,
  User,
  Lightbulb,
  Droplets,
  Sprout,
  TrendingUp,
  AlertCircle,
  Sparkles,
  MessageCircle,
  BarChart3,
  CloudRain,
  Leaf,
  Brain,
} from "lucide-react";

export default function AIAssistantPage() {
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content:
        "Salom! Men sizning AI yordamchi fermeringizman. Sug'orish, ekinlar, bashorat va ferma boshqaruvi bo'yicha har qanday savollaringizga yordam bera olaman. Nimada yordam kerak?",
      timestamp: new Date().toISOString(),
    },
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const sendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage = {
      role: "user",
      content: inputMessage.trim(),
      timestamp: new Date().toISOString(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputMessage("");
    setIsLoading(true);

    try {
      // Direct call to Gemini API
      const GEMINI_API_KEY = "AIzaSyA6OHNFyLgluKtBHgQr3t_ik7vNJF6awFo";
      const systemPrompt = `Sen HydroIntel AI platformasining AI yordamchisisiz. Fermerlar uchun sug'orish, ekin boshqaruvi, bashorat va aqlli ferma texnologiyalari bo'yicha mutaxxassis yordam berasan. 

Hozirgi ferma ma'lumotlari:
- 4 ta ekin zonasi (Zone A-D): pomidor, bodring, karam, sabzi
- Tuproq namligi: 25-78% oralig'ida
- Harorat: 22-28°C
- Sug'orish tizimi: 8 ta zona
- Sensor ma'lumotlari: real vaqtda yangilanadi

Har doim Oʻzbek tilida javob ber va ferma kontekstida savollarni hal qil. Amaliy maslahatlar va aniq raqamlar bilan yordam ber.`;

      const fullPrompt = `${systemPrompt}\n\n${userMessage.content}`;

      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${GEMINI_API_KEY}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            contents: [
              {
                parts: [
                  {
                    text: fullPrompt,
                  },
                ],
              },
            ],
          }),
        }
      );

      const data = await response.json();
      console.log("Gemini API response:", data);
      
      let aiText = "Javob olinmadi.";
      if (data.candidates && data.candidates.length > 0) {
        const candidate = data.candidates[0];
        if (candidate.content && candidate.content.parts && candidate.content.parts.length > 0) {
          aiText = candidate.content.parts[0].text;
        }
      } else if (data.error) {
        aiText = `Xatolik: ${data.error.message || JSON.stringify(data.error)}`;
      }

      const aiMessage = {
        role: "assistant",
        content: aiText,
        timestamp: new Date().toISOString(),
      };

      setMessages((prev) => [...prev, aiMessage]);
    } catch (error) {
      console.error("Error:", error);
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "Uzr, xatolik yuz berdi. Iltimos, qaytadan harakat qiling.",
          timestamp: new Date().toISOString(),
          isError: true,
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const quickActions = [
    {
      icon: Droplets,
      title: "Sug'orish tavsiyasi",
      prompt:
        "Bugungi ob-havo sharoitini hisobga olib, har bir zona uchun sug'orish rejasini tavsiya eting.",
    },
    {
      icon: Sprout,
      title: "Ekinlar holati",
      prompt:
        "Hozirgi ekinlarning holati va rivojlanish bosqichini tahlil qilib bering.",
    },
    {
      icon: CloudRain,
      title: "Ob-havo bashorati",
      prompt:
        "Kelgusi hafta uchun ob-havo bashoratini hisobga olib ferma ishlarini rejalashtiring.",
    },
    {
      icon: BarChart3,
      title: "Suv tejash",
      prompt: "Suv sarfini kamaytirish va tejash bo'yicha tavsiyalar bering.",
    },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 flex items-center gap-3">
              <Brain className="text-emerald-600" size={32} />
              AI Yordamchi
            </h1>
            <p className="text-gray-600 mt-1">
              Ferma boshqaruvi uchun aqlli yordam
            </p>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <Sparkles size={16} className="text-emerald-500" />
            <span>Gemini bilan ishlaydi</span>
          </div>
        </div>

        <div className="grid lg:grid-cols-4 gap-6">
          {/* Quick Actions */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
              <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Lightbulb className="text-yellow-500" size={20} />
                Tezkor savollar
              </h3>
              <div className="space-y-3">
                {quickActions.map((action, index) => {
                  const Icon = action.icon;
                  return (
                    <button
                      key={index}
                      onClick={() => setInputMessage(action.prompt)}
                      className="w-full text-left p-3 rounded-lg border border-gray-200 hover:border-emerald-300 hover:bg-emerald-50 transition-colors group"
                    >
                      <div className="flex items-center gap-3">
                        <Icon
                          className="text-gray-600 group-hover:text-emerald-600"
                          size={16}
                        />
                        <span className="font-medium text-gray-900 text-sm">
                          {action.title}
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Chat Area */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 h-[600px] flex flex-col">
              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map((message, index) => (
                  <div
                    key={index}
                    className={`flex gap-3 ${message.role === "user" ? "flex-row-reverse" : "flex-row"}`}
                  >
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        message.role === "user"
                          ? "bg-emerald-600 text-white"
                          : "bg-gray-100 text-gray-600"
                      }`}
                    >
                      {message.role === "user" ? (
                        <User size={16} />
                      ) : (
                        <Bot size={16} />
                      )}
                    </div>
                    <div className="max-w-[80%]">
                      <div
                        className={`rounded-2xl px-4 py-3 ${
                          message.role === "user"
                            ? "bg-emerald-600 text-white"
                            : "bg-gray-100 text-gray-900"
                        }`}
                      >
                        {message.role === "user" ? (
                          <p className="whitespace-pre-wrap">{message.content}</p>
                        ) : (
                          <ReactMarkdown
                            className="prose prose-sm max-w-none prose-p:my-2 prose-ul:my-2 prose-li:my-1"
                            components={{
                              p: ({ children }) => <p className="mb-2 last:mb-0">{children}</p>,
                              ul: ({ children }) => <ul className="list-disc pl-4 mb-2">{children}</ul>,
                              ol: ({ children }) => <ol className="list-decimal pl-4 mb-2">{children}</ol>,
                              li: ({ children }) => <li className="mb-1">{children}</li>,
                              strong: ({ children }) => <strong className="font-bold">{children}</strong>,
                              em: ({ children }) => <em className="italic">{children}</em>,
                            }}
                          >
                            {message.content}
                          </ReactMarkdown>
                        )}
                      </div>
                    </div>
                  </div>
                ))}

                {isLoading && (
                  <div className="flex gap-3">
                    <div className="w-8 h-8 rounded-full flex items-center justify-center bg-gray-100 text-gray-600">
                      <Bot size={16} />
                    </div>
                    <div className="rounded-2xl px-4 py-3 bg-gray-100">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                        <div
                          className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                          style={{ animationDelay: "0.1s" }}
                        ></div>
                        <div
                          className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                          style={{ animationDelay: "0.2s" }}
                        ></div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Input */}
              <div className="border-t border-gray-200 p-4">
                <div className="flex gap-3">
                  <textarea
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    placeholder="Savolingizni yozing..."
                    className="flex-1 resize-none rounded-lg border border-gray-300 px-4 py-3 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    rows={2}
                    disabled={isLoading}
                  />
                  <button
                    onClick={sendMessage}
                    disabled={!inputMessage.trim() || isLoading}
                    className="bg-emerald-600 text-white p-3 rounded-lg hover:bg-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    <Send size={20} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
