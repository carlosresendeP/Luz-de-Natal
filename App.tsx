import React, { useState, useCallback, useEffect } from "react";
import Snowfall from "./components/Snowfall";
import MusicControl from "./components/MusicControl";
import { COLORS } from "./constants";
import { TranslatedMessage, Language } from "./types";
import { TRANSLATED_MESSAGES, UI_TRANSLATIONS } from "./translations";

const App: React.FC = () => {
  const [language, setLanguage] = useState<Language>("pt");
  const [currentMessage, setCurrentMessage] = useState<TranslatedMessage>(
    TRANSLATED_MESSAGES[0]
  );
  const [isAnimating, setIsAnimating] = useState(false);
  const [showCopyFeedback, setShowCopyFeedback] = useState(false);

  const currentText = currentMessage.translations[language];
  const uiText = UI_TRANSLATIONS[language];

  const getNewMessage = useCallback(() => {
    setIsAnimating(true);
    setTimeout(() => {
      let nextMessage;
      do {
        const randomIndex = Math.floor(
          Math.random() * TRANSLATED_MESSAGES.length
        );
        nextMessage = TRANSLATED_MESSAGES[randomIndex];
      } while (nextMessage.id === currentMessage.id);

      setCurrentMessage(nextMessage);
      setIsAnimating(false);
    }, 400);
  }, [currentMessage.id]);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(currentText).then(() => {
      setShowCopyFeedback(true);
      setTimeout(() => setShowCopyFeedback(false), 2000);
    });
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-between text-white relative overflow-hidden font-sans pb-10">
      {/* Background and Effects */}
      <Snowfall />
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/60 pointer-events-none"></div>

      {/* Header */}
      <header className="relative z-20 pt-16 px-4 text-center">
        {/* Language Selector */}
        <div className="flex justify-center mb-4 gap-2">
          <button
            onClick={() => setLanguage("pt")}
            className={`px-3 py-1 rounded-full text-sm font-medium transition-all ${
              language === "pt"
                ? "bg-[#D4AF37] text-black"
                : "bg-white/10 text-white/60 hover:bg-white/20"
            }`}
          >
            🇧🇷 PT
          </button>
          <button
            onClick={() => setLanguage("en")}
            className={`px-3 py-1 rounded-full text-sm font-medium transition-all ${
              language === "en"
                ? "bg-[#D4AF37] text-black"
                : "bg-white/10 text-white/60 hover:bg-white/20"
            }`}
          >
            🇺🇸 EN
          </button>
          <button
            onClick={() => setLanguage("es")}
            className={`px-3 py-1 rounded-full text-sm font-medium transition-all ${
              language === "es"
                ? "bg-[#D4AF37] text-black"
                : "bg-white/10 text-white/60 hover:bg-white/20"
            }`}
          >
            🇪🇸 ES
          </button>
        </div>

        <h1 className="text-4xl md:text-6xl lg:text-7xl font-handwriting text-[#D4AF37] mb-2 drop-shadow-lg">
          {uiText.title}
        </h1>
        <p className="text-lg md:text-xl text-white/80 font-light italic">
          {uiText.subtitle}
        </p>
      </header>

      {/* Main Area */}
      <main className="relative z-20 flex-1 flex flex-col items-center justify-center w-full max-w-4xl px-6">
        {/* Message Display Card */}
        <div
          className={`w-full glass p-8 md:p-12 rounded-[2rem] text-center transition-all duration-500 transform ${
            isAnimating ? "opacity-0 scale-95" : "opacity-100 scale-100"
          }`}
        >
          <div className="mb-6 flex justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-12 w-12 text-[#D2122E] animate-float"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                d="M12 2L4.5 20.29L5.21 21L12 18L18.79 21L19.5 20.29L12 2Z"
                fill="#D4AF37"
              />
              <path
                d="M12 12L12 15"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </div>

          <blockquote className="text-2xl md:text-3xl lg:text-4xl font-light leading-relaxed mb-10 text-[#F8F8FF]">
            "{currentText}"
          </blockquote>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={getNewMessage}
              className="px-8 py-4 bg-[#D2122E] hover:bg-[#B00E26] text-white rounded-full font-semibold shadow-lg transition-all duration-300 transform hover:scale-105 active:scale-95 flex items-center gap-2 group"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 group-hover:rotate-12 transition-transform"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7"
                />
              </svg>
              {uiText.newMessage}
            </button>

            <button
              onClick={copyToClipboard}
              className="px-8 py-4 bg-white/10 hover:bg-white/20 border border-white/30 text-white rounded-full font-medium transition-all duration-300 flex items-center gap-2 relative"
            >
              {showCopyFeedback ? (
                <span className="flex items-center gap-2 text-[#D4AF37]">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  {uiText.copied}
                </span>
              ) : (
                <>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"
                    />
                  </svg>
                  {uiText.copyMessage}
                </>
              )}
            </button>
          </div>
        </div>

        {/* Decorative elements */}
        <div className="mt-12 opacity-50 flex gap-6 text-[#D4AF37]">
          <span className="text-3xl">❄</span>
          <span className="text-4xl">🎄</span>
          <span className="text-3xl">❄</span>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-20 text-center px-4 w-full">
        <p className="text-white/60 text-sm mb-2">
          Que a luz do nascimento de Jesus brilhe em sua vida hoje e sempre.
        </p>
        <div className="flex items-center justify-center gap-2 text-white/40 text-xs">
          <span>&copy; {new Date().getFullYear()} Natal de Luz</span>
          <span>•</span>
          <a
            href="#"
            className="hover:text-[#D4AF37] transition-colors underline decoration-dotted"
          >
            Compartilhe Amor
          </a>
        </div>
      </footer>

      {/* Controls */}
      <MusicControl />

      {/* Style Overrides for Tailwind */}
      <style>{`
        body { background-color: ${COLORS.pineGreen}; }
        .glass { background: rgba(255, 255, 255, 0.08); }
      `}</style>
    </div>
  );
};

export default App;
