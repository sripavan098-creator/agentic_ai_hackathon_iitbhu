import { motion } from 'framer-motion';
import { Shield, FileText, ArrowDown } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
      {/* Background effects */}
      <div className="absolute inset-0 grid-bg opacity-50" />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-sky-500/10 rounded-full blur-3xl animate-float" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-violet-500/10 rounded-full blur-3xl animate-float-delayed" />
      
      {/* Floating medical icons */}
      <motion.div
        className="absolute top-20 left-[15%] text-sky-400/20"
        animate={{ y: [-10, 10, -10], rotate: [0, 5, -5, 0] }}
        transition={{ duration: 8, repeat: Infinity }}
      >
        <FileText size={48} />
      </motion.div>
      <motion.div
        className="absolute top-40 right-[20%] text-violet-400/20"
        animate={{ y: [10, -10, 10], rotate: [0, -5, 5, 0] }}
        transition={{ duration: 7, repeat: Infinity }}
      >
        <Shield size={40} />
      </motion.div>

      <div className="relative z-10 max-w-6xl mx-auto px-6 text-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-sky-500/10 border border-sky-500/20 text-sky-300 text-sm font-medium mb-8"
        >
          <span className="w-2 h-2 bg-sky-400 rounded-full animate-pulse" />
          Tech Zephyr 4.0 — Agentic AI Hackathon
        </motion.div>

        {/* Main heading */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-6 tracking-tight"
        >
          <span className="gradient-text">MediAdvocate</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-xl md:text-2xl text-slate-300 max-w-3xl mx-auto mb-4 font-light"
        >
          The Autonomous Medical Billing & Insurance Appeal Agent
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="text-base md:text-lg text-slate-400 max-w-2xl mx-auto mb-12"
        >
          An AI agent that acts as your personal medical billing paralegal — 
          reading bills, finding errors, and fighting insurance denials so you don't have to.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16"
        >
          <a
            href="#solution"
            className="px-8 py-4 bg-gradient-to-r from-sky-500 to-violet-600 text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-sky-500/25 transition-all duration-300 hover:-translate-y-0.5"
          >
            See How It Works
          </a>
          <a
            href="#architecture"
            className="px-8 py-4 bg-white/5 border border-white/10 text-white font-semibold rounded-xl hover:bg-white/10 transition-all duration-300"
          >
            View Architecture
          </a>
        </motion.div>

        {/* Stats row */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto"
        >
          {[
            { value: '80%', label: 'of hospital bills contain errors' },
            { value: '15-20%', label: 'of legitimate claims denied' },
            { value: '$2.8B', label: 'lost annually to billing errors' },
          ].map((stat, i) => (
            <div key={i} className="glass-card rounded-xl p-4">
              <div className="text-2xl md:text-3xl font-bold text-sky-400">{stat.value}</div>
              <div className="text-sm text-slate-400 mt-1">{stat.label}</div>
            </div>
          ))}
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <ArrowDown className="text-slate-500" size={24} />
        </motion.div>
      </div>
    </section>
  );
}
