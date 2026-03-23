import React, { useState } from 'react';
import { motion } from 'framer-motion';

export default function Suggestions() {
  const [status, setStatus] = useState('idle'); // idle, sending, success
  const [faction, setFaction] = useState('falqz');

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus('sending');
    // Simulate data transmission
    setTimeout(() => setStatus('success'), 2000);
  };

  return (
    <div className="min-h-screen bg-black text-white p-6 flex flex-col items-center justify-center font-sans">
      <motion.div 
        initial={{ opacity: 0, y: 20 }} 
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-lg bg-white/[0.02] border border-white/10 p-8 rounded-3xl backdrop-blur-md shadow-2xl"
      >
        <div className="mb-8 border-b border-white/10 pb-4">
          <h2 className="text-3xl font-black italic tracking-tighter uppercase text-red-600">Intel Submission</h2>
          <p className="text-[10px] text-gray-500 tracking-[0.3em] uppercase mt-1">NEXUS FEEDBACK LOOP // ENCRYPTED CHANNEL</p>
        </div>

        {status !== 'success' ? (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest block mb-3">Select Faction Target</label>
              <div className="flex gap-2">
                {['falqz', 'SmilyCrit', 'ReviTech'].map((f) => (
                  <button
                    key={f}
                    type="button"
                    onClick={() => setFaction(f)}
                    className={`flex-1 py-2 text-[10px] font-black rounded-lg border transition-all ${
                      faction === f ? 'bg-white text-black border-white' : 'border-white/10 text-gray-500 hover:border-white/30'
                    }`}
                  >
                    {f.toUpperCase()}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest block mb-3">Lore Briefing / Suggestion</label>
              <textarea 
                required
                className="w-full bg-black/50 border border-white/10 rounded-xl p-4 text-sm focus:outline-none focus:border-red-600 transition-colors h-32 resize-none"
                placeholder="Enter details about the event, coordinates, or player actions..."
              />
            </div>

            <button 
              type="submit"
              disabled={status === 'sending'}
              className="w-full bg-red-600 py-4 rounded-xl font-black italic uppercase tracking-widest hover:bg-red-500 transition-all disabled:opacity-50"
            >
              {status === 'sending' ? "Transmitting..." : "Send Intel Report"}
            </button>
          </form>
        ) : (
          <motion.div 
            initial={{ scale: 0.9 }} 
            animate={{ scale: 1 }}
            className="text-center py-10"
          >
            <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="text-2xl">✓</span>
            </div>
            <h3 className="text-2xl font-black italic uppercase mb-2">Transmission Received</h3>
            <p className="text-gray-500 text-xs">The Nexus has archived your data. Stay alert, operative.</p>
            <button 
              onClick={() => setStatus('idle')}
              className="mt-8 text-[10px] font-black uppercase tracking-widest text-red-600 underline underline-offset-4"
            >
              New Submission
            </button>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}
