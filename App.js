import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const universeData = {
  falqz: {
    title: "Incognito Infiltration",
    theme: "from-red-900/40 via-black to-black",
    accent: "text-red-500",
    questions: [
      { q: "Who is the ruthless leader of the Incognitos?", a: "CrimsonzFlame", o: ["CrimsonzFlame", "Cryptic", "ShadowRunner", "falqz"] },
      { q: "What specific entrance led to the mysterious 'Incognito Valley'?", a: "A 2x2 hole", o: ["A 2x2 hole", "A hidden waterfall", "A bedrock trapdoor", "A secret tunnel"] },
      { q: "What was the threatened punishment for being captured by the Incognitos?", a: "Sent flying to the sea", o: ["Sent flying to the sea", "Dropped into the Void", "Banishment", "Nether Lock"] }
    ]
  },
  SmilyCrit: {
    title: "Sepherian Golden Kingdom",
    theme: "from-yellow-700/30 via-black to-black",
    accent: "text-yellow-500",
    questions: [
      { q: "What weapon did the duo master to become 'unkillable'?", a: "The Minecraft Spear", o: ["The Minecraft Spear", "The Netherite Mace", "The Crystal Bow", "The Ender Blade"] },
      { q: "How far did they travel to find the Sepherian Kingdom?", a: "1 Million Blocks", o: ["1 Million Blocks", "500,000 Blocks", "10,000 Blocks", "To the Border"] },
      { q: "What item granted them ownership of the kingdom?", a: "The Final Book", o: ["The Final Book", "A Golden Scepter", "The Dragon Egg", "A Crown"] }
    ]
  },
  ReviTech: {
    title: "The End Invasion Strategy",
    theme: "from-purple-900/30 via-black to-black",
    accent: "text-purple-500",
    questions: [
      { q: "What was ReviTech's primary goal on the Fantist SMP?", a: "Acquire Elytra", o: ["Acquire Elytra", "Build a Mega-Base", "Kill the Warden", "Automate Iron"] },
      { q: "What supplies were prioritized for trading in the corrupt environment?", a: "Potions and Gaps", o: ["Potions and Gaps", "Diamonds and Gold", "Tridents and Rockets", "TNT"] },
      { q: "Who did ReviTech team up with after spawning in a destroyed region?", a: "SmilyCrit", o: ["SmilyCrit", "CrimsonzFlame", "Cryptic", "Wingolingo"] }
    ]
  }
};

export default function App() {
  const [screen, setScreen] = useState('home');
  const [activeUniverse, setActiveUniverse] = useState(null);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [score, setScore] = useState(0);

  const startQuiz = (key) => {
    setActiveUniverse(key);
    setCurrentIdx(0);
    setScore(0);
    setScreen('quiz');
  };

  return (
    <div className="min-h-screen bg-black text-white selection:bg-red-600 selection:text-white font-sans">
      <div className={`fixed inset-0 bg-gradient-radial ${activeUniverse ? universeData[activeUniverse].theme : 'from-blue-900/20 via-black to-black'} transition-all duration-700`} />

      <main className="relative z-10 flex flex-col items-center justify-center min-h-screen p-6">
        <AnimatePresence mode="wait">
          
          {screen === 'home' && (
            <motion.div key="home" className="w-full max-w-xl text-center">
              <h1 className="text-5xl font-black mb-1 tracking-tighter italic uppercase">Fantist Universe Events</h1>
              <p className="text-gray-500 mb-12 text-[10px] tracking-[0.4em] uppercase font-bold">Nexus Access Terminal</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {Object.keys(universeData).map(key => (
                  <button key={key} onClick={() => startQuiz(key)} className="group p-6 bg-white/[0.03] border border-white/10 rounded-2xl hover:bg-white/[0.07] hover:border-white/20 transition-all text-left relative overflow-hidden">
                    <h3 className="text-2xl font-black tracking-tight italic">{key}</h3>
                    <p className="text-[9px] text-gray-500 mt-1 uppercase tracking-widest font-bold">{universeData[key].title}</p>
                  </button>
                ))}
                
                <button disabled className="p-6 bg-black/60 border border-red-900/30 rounded-2xl opacity-40 cursor-not-allowed text-left relative">
                  <h3 className="text-2xl font-black italic text-gray-600">IcyJK</h3>
                  <div className="absolute top-4 right-4 text-[7px] font-black bg-red-600/80 text-white px-1.5 py-0.5 rounded">OFFLINE</div>
                  <p className="text-[9px] text-red-900 mt-1 uppercase tracking-widest font-bold italic">System Maintenance</p>
                </button>
              </div>
            </motion.div>
          )}

          {screen === 'quiz' && (
            <motion.div key="quiz" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="max-w-md w-full">
               <div className="mb-8 flex justify-between items-end border-b border-white/10 pb-3">
                <span className={`text-sm font-black italic tracking-widest ${universeData[activeUniverse].accent}`}>{activeUniverse}</span>
                <span className="text-[10px] font-mono text-gray-500 uppercase">Packet_{currentIdx + 1}_of_3</span>
               </div>
              <h2 className="text-2xl font-bold mb-10 leading-snug">{universeData[activeUniverse].questions[currentIdx].q}</h2>
              <div className="space-y-3">
                {universeData[activeUniverse].questions[currentIdx].o.map(opt => (
                  <button 
                    key={opt} 
                    onClick={() => {
                      if (opt === universeData[activeUniverse].questions[currentIdx].a) setScore(s => s + 1);
                      if (currentIdx + 1 < 3) setCurrentIdx(currentIdx + 1);
                      else setScreen('results');
                    }}
                    className="w-full text-left p-5 bg-white/[0.03] border border-white/5 rounded-xl hover:border-white/30 hover:bg-white/[0.08] transition-all active:scale-95 text-sm font-medium"
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {screen === 'results' && (
            <motion.div key="results" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale:
