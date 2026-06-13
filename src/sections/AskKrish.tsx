import { useState, useEffect, useRef } from 'react'
import { Terminal, Send, Blocks, Cpu, Sparkles } from 'lucide-react'
import FadeIn from '../components/FadeIn'

interface Message {
  sender: 'user' | 'bot'
  text: string
  isTyping?: boolean
}

interface Question {
  id: string
  question: string
  answer: string
}

const CATEGORIES = [
  { id: 'web3', label: 'Web3 & DeFi', icon: Blocks },
  { id: 'backend', label: 'Backend Systems', icon: Cpu },
  { id: 'general', label: 'General Info', icon: Sparkles },
]

const QUESTIONS: Record<string, Question[]> = {
  web3: [
    {
      id: 'web3-solidity',
      question: 'Is Krish good at Web3?',
      answer: 'Yes, Krish specializes in production Solidity smart contracts. At Ancilar, he has built protocols with 95%+ test coverage using Foundry, and works with complex DeFi concepts like Uniswap V3 concentrated liquidity, Permit2 flows, and UniswapX reactors.',
    },
    {
      id: 'web3-crosschain',
      question: 'What is his cross-chain experience?',
      answer: 'Krish has deep knowledge of LayerZero: OFT token transfers, message lifecycle, and oracle/relayer models. He has integrated and monitored transactions across 20+ EVM, Cosmos, and Move chains.',
    },
  ],
  backend: [
    {
      id: 'backend-stack',
      question: 'What is his backend stack?',
      answer: 'His core backend stack consists of Rust (Axum) and Node/TypeScript. He is skilled in building high-performance microservices, event-driven architectures, and implementing resiliency patterns like circuit breakers and retry logic.',
    },
    {
      id: 'backend-db',
      question: 'How does he optimize databases?',
      answer: 'Krish specializes in PostgreSQL and MongoDB schema optimization. He cut database query latencies by 30-40% through query tuning, compound indexing, caching, and connection pooling.',
    },
  ],
  general: [
    {
      id: 'gen-role',
      question: 'What is his current role?',
      answer: 'Krish is an Associate System Analyst and Backend Developer at Ancilar, working on production blockchain monitoring and transaction indexing systems.',
    },
    {
      id: 'gen-philosophy',
      question: 'How does he solve tough problems?',
      answer: "Krish likes the hard problems. His philosophy: 'reading the contract beats reading the docs.' He debugs protocols directly at the bytecode or source level, bringing a rigorous CS and Data Science background to every project.",
    },
  ],
}

export default function AskKrish() {
  const [activeTab, setActiveTab] = useState('web3')
  const [messages, setMessages] = useState<Message[]>([
    {
      sender: 'bot',
      text: 'Hi there! I am Krish\'s portfolio assistant. Click any of the queries on the left to ask about my engineering experience, stack, or work philosophy.',
    },
  ])
  const [typingText, setTypingText] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const viewportRef = useRef<HTMLDivElement>(null)

  // Handle question click
  const handleQuestionClick = (q: Question) => {
    if (isTyping) return // Block while typing
    
    // Add user message
    const newMessages = [...messages, { sender: 'user' as const, text: q.question }]
    setMessages(newMessages)
    setIsTyping(true)

    // Simulate response delay
    setTimeout(() => {
      let currentLength = 0
      const fullAnswer = q.answer
      setTypingText('')
      
      const interval = setInterval(() => {
        if (currentLength < fullAnswer.length) {
          setTypingText((prev) => prev + fullAnswer.charAt(currentLength))
          currentLength++
        } else {
          clearInterval(interval)
          setMessages((prev) => [...prev, { sender: 'bot', text: fullAnswer }])
          setTypingText('')
          setIsTyping(false)
        }
      }, 8) // speed of typing
    }, 600)
  }

  // Keep the chat scrolled to the latest message WITHOUT moving the page.
  // (scrollIntoView would scroll the window; we only scroll the inner box.)
  useEffect(() => {
    const el = viewportRef.current
    if (el) el.scrollTop = el.scrollHeight
  }, [messages, typingText])

  return (
    <section 
      id="ask" 
      className="relative bg-ink py-24 px-5 sm:px-8 md:px-10 overflow-hidden border-t border-zinc-900"
    >
      <div className="absolute inset-0 bg-dot-grid pointer-events-none" />
      
      <div className="max-w-6xl mx-auto relative z-10">
        <FadeIn y={30} className="text-center mb-16">
          <h2 
            className="hero-heading font-black uppercase leading-none tracking-tight"
            style={{ fontSize: 'clamp(2.5rem, 8vw, 90px)' }}
          >
            Ask about Krish
          </h2>
          <p className="text-mist/70 text-sm sm:text-base md:text-lg max-w-xl mx-auto mt-4 font-light uppercase tracking-widest">
            Click a preset query below to query his engineering subroutines
          </p>
        </FadeIn>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch mt-10">
          
          {/* Query Selector Pane (cols 5) */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            {/* Category Tabs */}
            <div className="flex bg-[#121212] p-1.5 rounded-xl border border-zinc-800/80 gap-1">
              {CATEGORIES.map((cat) => {
                const Icon = cat.icon
                const isActive = activeTab === cat.id
                return (
                  <button
                    key={cat.id}
                    onClick={() => setActiveTab(cat.id)}
                    className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-xs md:text-sm font-semibold uppercase tracking-wider transition-all duration-200 ${
                      isActive 
                        ? 'bg-zinc-800 text-white shadow-sm' 
                        : 'text-mist/50 hover:text-mist/80 hover:bg-zinc-900/50'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span className="hidden sm:inline">{cat.label}</span>
                  </button>
                )
              })}
            </div>

            {/* Questions Grid/List */}
            <div className="flex-1 flex flex-col gap-3 bg-[#121212]/40 border border-zinc-900 rounded-2xl p-5 justify-center">
              {QUESTIONS[activeTab].map((q) => (
                <button
                  key={q.id}
                  onClick={() => handleQuestionClick(q)}
                  disabled={isTyping}
                  className={`group text-left p-4 rounded-xl border transition-all duration-200 flex justify-between items-center gap-4 ${
                    isTyping 
                      ? 'border-zinc-900 bg-zinc-950/40 opacity-40 cursor-not-allowed' 
                      : 'border-zinc-800 bg-[#121212] hover:border-violet-500/50 hover:bg-zinc-900/80'
                  }`}
                >
                  <span className="text-xs sm:text-sm md:text-base text-mist font-light tracking-wide uppercase leading-snug">
                    {q.question}
                  </span>
                  <div className="w-6 h-6 rounded-full border border-zinc-700 group-hover:border-violet-500 flex items-center justify-center shrink-0 transition-colors duration-200">
                    <Send className="w-3 h-3 text-mist/60 group-hover:text-violet-400 group-hover:translate-x-[1px] group-hover:-translate-y-[1px] transition-all duration-200" />
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Interactive Chat Console (cols 7) */}
          <div className="lg:col-span-7 flex flex-col h-[480px] rounded-2xl bg-[#0e0e0e] border border-zinc-805 shadow-2xl relative overflow-hidden">
            {/* Console Header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-zinc-900 bg-[#121212]">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full bg-red-500/80" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                <div className="w-3 h-3 rounded-full bg-green-500/80" />
                <span className="font-mono text-xs text-mist/60 uppercase tracking-widest ml-2 flex items-center gap-1.5">
                  <Terminal className="w-3.5 h-3.5 text-violet-400" />
                  krish_query_terminal.sh
                </span>
              </div>
              <span className="text-[10px] text-emerald-500 font-mono animate-pulse uppercase tracking-wider">
                ● connected
              </span>
            </div>

            {/* Chat Messages viewport */}
            <div ref={viewportRef} className="flex-1 overflow-y-auto p-5 space-y-4 font-mono scrollbar-none">
              {messages.map((msg, i) => {
                const isBot = msg.sender === 'bot'
                return (
                  <div 
                    key={i} 
                    className={`flex ${isBot ? 'justify-start' : 'justify-end'}`}
                  >
                    <div 
                      className={`max-w-[85%] rounded-xl px-4 py-3 text-xs sm:text-sm leading-relaxed border ${
                        isBot 
                          ? 'bg-zinc-900/40 border-zinc-850 text-mist' 
                          : 'bg-[#7621B0]/20 border-violet-800/40 text-violet-200'
                      }`}
                    >
                      <div className="text-[9px] uppercase tracking-wider opacity-40 mb-1">
                        {isBot ? 'krish_agent' : 'visitor'}
                      </div>
                      <p className="whitespace-pre-wrap">{msg.text}</p>
                    </div>
                  </div>
                )
              })}

              {/* Bot typing simulation */}
              {isTyping && typingText && (
                <div className="flex justify-start">
                  <div className="max-w-[85%] rounded-xl px-4 py-3 text-xs sm:text-sm leading-relaxed border bg-zinc-900/40 border-zinc-850 text-mist">
                    <div className="text-[9px] uppercase tracking-wider opacity-40 mb-1">
                      krish_agent
                    </div>
                    <p className="whitespace-pre-wrap">
                      {typingText}
                      <span className="inline-block w-1.5 h-3.5 bg-violet-400 ml-1 animate-pulse" />
                    </p>
                  </div>
                </div>
              )}

              {/* Loader placeholder when delay is active */}
              {isTyping && !typingText && (
                <div className="flex justify-start">
                  <div className="bg-zinc-900/40 border border-zinc-850 rounded-xl px-4 py-3 text-xs sm:text-sm text-mist/60">
                    <div className="flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 bg-violet-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                      <span className="w-1.5 h-1.5 bg-violet-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                      <span className="w-1.5 h-1.5 bg-violet-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Console Footer / Status */}
            <div className="px-5 py-3 border-t border-zinc-900 bg-[#0c0c0c] text-[10px] text-mist/35 font-mono uppercase tracking-widest flex justify-between">
              <span>Ready for inputs</span>
              <span>Lines: {messages.length + (isTyping ? 1 : 0)}</span>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
