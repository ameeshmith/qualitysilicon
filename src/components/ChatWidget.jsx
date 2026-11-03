import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  MessageSquare,
  X,
  Send,
  Sparkles,
  ArrowRight,
  UploadCloud,
  MessageCircle,
  MapPin,
  Bot,
  Key,
} from 'lucide-react';
import { askGroqAI } from '../services/aiChat';

const INITIAL_MESSAGES = [
  {
    role: 'assistant',
    content:
      'Hello! I am the Quality Media AI assistant. Ask me about Class 3 DSC tokens, ITR/TDS document checklists, or Tally & BUSY software. How can I help you today?',
  },
];

const SUGGESTED_CHIPS = [
  'Documents for Class 3 DSC?',
  'What is needed for ITR filing?',
  'TallyPrime Silver vs Gold?',
  'Where is your Udupi office?',
];

export default function ChatWidget({ onOpenPortal }) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState(INITIAL_MESSAGES);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [showKeyModal, setShowKeyModal] = useState(false);

  // Read Groq API Key from Vite env or user localStorage
  const [groqKey, setGroqKey] = useState(() => {
    return (
      import.meta.env.VITE_GROQ_API_KEY ||
      localStorage.getItem('qm_groq_api_key') ||
      ''
    );
  });
  const [keyInput, setKeyInput] = useState(groqKey);

  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen, loading]);

  const handleSendMessage = async (textToSend) => {
    const userText = (textToSend || input).trim();
    if (!userText || loading) return;

    const newMessages = [...messages, { role: 'user', content: userText }];
    setMessages(newMessages);
    setInput('');
    setLoading(true);

    try {
      const res = await askGroqAI(newMessages, groqKey);
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content: res.reply,
          action: res.action,
          isAi: res.isAi,
        },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content:
            'You can upload your forms directly via our online Customer Portal or contact our Udupi office on WhatsApp at +91 9845242565.',
          action: { label: 'Open Customer Portal', action: 'portal' },
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleSaveKey = (e) => {
    e.preventDefault();
    const cleanKey = keyInput.trim();
    setGroqKey(cleanKey);
    localStorage.setItem('qm_groq_api_key', cleanKey);
    setShowKeyModal(false);
  };

  const handleActionClick = (actionType) => {
    if (actionType === 'portal') {
      onOpenPortal('customer');
      setIsOpen(false);
    } else if (actionType === 'whatsapp') {
      window.open(
        'https://wa.me/919845242565?text=' +
          encodeURIComponent(
            'Hello Quality Media, I would like to inquire about your services.'
          ),
        '_blank'
      );
    } else if (actionType === 'maps') {
      window.open(
        'https://www.google.com/maps/search/?api=1&query=' +
          encodeURIComponent(
            'Sai Radha Residency Behind Hotel Kidiyoor Shiribeedu Udupi Karnataka 576101'
          ),
        '_blank'
      );
    }
  };

  return (
    <>
      {/* Floating Bottom-Right Launcher Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsOpen((prev) => !prev)}
          className="relative flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-tr from-[#1d4ed8] via-[#2563eb] to-[#38bdf8] text-white shadow-[0_12px_35px_rgba(29,78,216,0.5)] border border-white/30 backdrop-blur-xl group focus:outline-none"
          aria-label="Open AI Assistant"
        >
          {isOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <>
              <Bot className="h-6 w-6 group-hover:scale-110 transition-transform" />
              <span className="absolute -top-1 -right-1 h-3.5 w-3.5 rounded-full bg-[#FACC15] ring-2 ring-[#0f172a] animate-pulse" />
            </>
          )}
        </motion.button>
      </div>

      {/* Floating Glassmorphic Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.94 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.94 }}
            transition={{ type: 'spring', damping: 25, stiffness: 280 }}
            className="fixed bottom-24 right-4 sm:right-6 z-50 w-[94vw] max-w-[400px] h-[580px] max-h-[80vh] rounded-[32px] glass-panel bg-[#0B1536]/90 backdrop-blur-2xl border border-white/25 shadow-[0_30px_90px_rgba(4,10,36,0.7)] flex flex-col justify-between overflow-hidden text-white"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 px-5 border-b border-white/15 bg-white/[0.04]">
              <div className="flex items-center gap-3">
                <div className="relative flex h-9 w-9 items-center justify-center rounded-xl bg-blue-600 border border-white/25 text-white">
                  <Bot className="h-5 w-5" />
                  <span className="absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full bg-[#FACC15]" />
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="font-display text-sm font-bold text-white leading-tight">
                      Quality Media AI
                    </span>
                    <span className="rounded bg-[#FACC15]/20 border border-[#FACC15]/40 px-1.5 py-0.2 text-[9px] font-mono font-bold text-[#FACC15]">
                      {groqKey ? 'GROQ LLAMA 3.3' : 'ASSISTANT'}
                    </span>
                  </div>
                  <p className="text-[10px] text-white/70">
                    Direct Tax &amp; Software Help • Udupi
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={() => setShowKeyModal(true)}
                  title="Configure Groq API Key"
                  className="rounded-lg p-1.5 text-white/70 hover:text-[#FACC15] hover:bg-white/10 transition"
                >
                  <Key className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="rounded-lg p-1.5 text-white/70 hover:text-white hover:bg-white/10 transition"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Messages Body */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3.5 text-xs">
              {messages.map((m, idx) => (
                <div
                  key={idx}
                  className={`flex flex-col ${
                    m.role === 'user' ? 'items-end' : 'items-start'
                  }`}
                >
                  <div
                    className={`max-w-[85%] rounded-2xl px-4 py-2.5 leading-relaxed ${
                      m.role === 'user'
                        ? 'bg-[#2563EB] text-white rounded-tr-sm shadow-md'
                        : 'glass-pill text-white/95 rounded-tl-sm border-white/15'
                    }`}
                  >
                    {m.content}
                  </div>

                  {/* Interactive Action Trigger attached to Assistant Reply */}
                  {m.action && (
                    <button
                      type="button"
                      onClick={() => handleActionClick(m.action.action)}
                      className="mt-1.5 inline-flex items-center gap-1.5 rounded-xl bg-white/15 hover:bg-white/25 border border-white/25 px-3 py-1.5 text-[11px] font-semibold text-[#FACC15] transition"
                    >
                      {m.action.action === 'portal' && (
                        <UploadCloud className="h-3.5 w-3.5" />
                      )}
                      {m.action.action === 'whatsapp' && (
                        <MessageCircle className="h-3.5 w-3.5" />
                      )}
                      {m.action.action === 'maps' && (
                        <MapPin className="h-3.5 w-3.5" />
                      )}
                      <span>{m.action.label}</span>
                      <ArrowRight className="h-3 w-3" />
                    </button>
                  )}
                </div>
              ))}

              {/* Typing indicator */}
              {loading && (
                <div className="flex items-center gap-1.5 glass-pill rounded-2xl px-3.5 py-2 max-w-[70px]">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#FACC15] animate-bounce" />
                  <span className="h-1.5 w-1.5 rounded-full bg-[#FACC15] animate-bounce [animation-delay:0.2s]" />
                  <span className="h-1.5 w-1.5 rounded-full bg-[#FACC15] animate-bounce [animation-delay:0.4s]" />
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Quick Prompt Chips */}
            <div className="px-4 py-2 border-t border-white/10 bg-white/[0.02] flex gap-1.5 overflow-x-auto no-scrollbar">
              {SUGGESTED_CHIPS.map((chip) => (
                <button
                  key={chip}
                  type="button"
                  onClick={() => handleSendMessage(chip)}
                  className="whitespace-nowrap rounded-lg glass-pill hover:bg-white/15 border-white/10 px-2.5 py-1 text-[10px] text-white/80 hover:text-white transition"
                >
                  {chip}
                </button>
              ))}
            </div>

            {/* Input Box */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage();
              }}
              className="p-3 bg-white/[0.04] border-t border-white/10 flex items-center gap-2"
            >
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about tax, DSC, Tally..."
                className="flex-1 rounded-xl bg-white/[0.08] border border-white/15 px-3.5 py-2 text-xs text-white placeholder-white/40 focus:outline-none focus:border-[#FACC15]"
              />
              <button
                type="submit"
                disabled={!input.trim() || loading}
                className="flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-r from-blue-600 to-sky-500 disabled:opacity-40 text-white shadow-md hover:brightness-110 transition"
              >
                <Send className="h-3.5 w-3.5" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Optional Groq API Key Setup Modal */}
      <AnimatePresence>
        {showKeyModal && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowKeyModal(false)}
              className="fixed inset-0 z-[120] bg-black/75 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="fixed left-1/2 top-1/2 z-[130] w-[90%] max-w-sm -translate-x-1/2 -translate-y-1/2 rounded-3xl glass-panel bg-[#0B1536] p-6 text-white border border-white/20 shadow-2xl"
            >
              <div className="flex items-center justify-between pb-3 border-b border-white/15">
                <div className="flex items-center gap-2">
                  <Key className="h-4 w-4 text-[#FACC15]" />
                  <span className="font-display text-sm font-bold">
                    Groq API Key Setup
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setShowKeyModal(false)}
                  className="text-white/60 hover:text-white"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              <form onSubmit={handleSaveKey} className="mt-4 space-y-3 text-xs">
                <p className="text-white/70 leading-relaxed">
                  Paste your free Groq API key (`gsk_...`) from{' '}
                  <a
                    href="https://console.groq.com/keys"
                    target="_blank"
                    rel="noreferrer"
                    className="text-[#FACC15] underline"
                  >
                    console.groq.com
                  </a>{' '}
                  for real-time Llama 3.3 answers:
                </p>

                <input
                  type="password"
                  value={keyInput}
                  onChange={(e) => setKeyInput(e.target.value)}
                  placeholder="gsk_..."
                  className="w-full rounded-xl bg-white/[0.08] border border-white/20 px-3.5 py-2 text-xs font-mono text-white placeholder-white/30 focus:outline-none focus:border-[#FACC15]"
                />

                <div className="flex gap-2 pt-2">
                  <button
                    type="submit"
                    className="flex-1 rounded-xl bg-gradient-to-r from-blue-600 to-sky-500 py-2.5 font-bold text-white shadow-md"
                  >
                    Save Key
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setGroqKey('');
                      setKeyInput('');
                      localStorage.removeItem('qm_groq_api_key');
                      setShowKeyModal(false);
                    }}
                    className="rounded-xl glass-pill px-3 py-2.5 text-white/70 hover:text-white"
                  >
                    Clear
                  </button>
                </div>

                <p className="text-[10px] text-white/50 text-center">
                  Key is saved locally in your browser and used only for Groq LPU inference.
                </p>
              </form>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

