import { motion } from 'framer-motion';
import { AlertTriangle, Clock, DollarSign, HelpCircle } from 'lucide-react';

const problems = [
  {
    icon: DollarSign,
    title: 'Staggering Costs',
    description: 'Medical billing errors cost patients billions annually. One error can mean thousands in unnecessary charges.',
    color: 'text-amber-400',
    bg: 'bg-amber-500/10',
    border: 'border-amber-500/20',
  },
  {
    icon: Clock,
    title: 'Time-Consuming Process',
    description: 'The appeals process requires weeks of phone calls, document cross-referencing, and bureaucratic navigation.',
    color: 'text-rose-400',
    bg: 'bg-rose-500/10',
    border: 'border-rose-500/20',
  },
  {
    icon: HelpCircle,
    title: 'Complex Documentation',
    description: 'EOBs, CPT/ICD-10 codes, and dense insurance policy PDFs are incomprehensible to most patients.',
    color: 'text-violet-400',
    bg: 'bg-violet-500/10',
    border: 'border-violet-500/20',
  },
  {
    icon: AlertTriangle,
    title: 'Emotional Toll',
    description: 'Patients dealing with illness lack the bandwidth to fight insurance bureaucracies while recovering.',
    color: 'text-sky-400',
    bg: 'bg-sky-500/10',
    border: 'border-sky-500/20',
  },
];

export default function Problem() {
  return (
    <section id="problem" className="relative py-24 bg-slate-950">
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-slate-900/50 to-slate-950" />
      
      <div className="relative z-10 max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-sm font-semibold text-rose-400 uppercase tracking-wider">The Problem</span>
          <h2 className="text-4xl md:text-5xl font-bold text-white mt-3 mb-6">
            A Broken System That <span className="text-rose-400">Hurts Patients</span>
          </h2>
          <p className="text-lg text-slate-400 max-w-3xl mx-auto">
            Medical billing errors and insurance claim denials create a devastating financial burden. 
            Most patients simply don't have the tools, expertise, or energy to fight back.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
          {problems.map((problem, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className={`${problem.bg} border ${problem.border} rounded-2xl p-6 hover:scale-[1.02] transition-transform duration-300`}
            >
              <div className="flex items-start gap-4">
                <div className={`p-3 rounded-xl ${problem.bg}`}>
                  <problem.icon className={problem.color} size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-white mb-2">{problem.title}</h3>
                  <p className="text-slate-400">{problem.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Visual comparison */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="glass-card rounded-2xl p-8"
        >
          <h3 className="text-xl font-semibold text-white mb-6 text-center">The Patient's Dilemma</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <div className="flex items-center gap-3 text-rose-400">
                <div className="w-8 h-8 rounded-full bg-rose-500/20 flex items-center justify-center text-sm font-bold">✗</div>
                <span className="font-medium">Without MediAdvocate</span>
              </div>
              <ul className="space-y-3 text-slate-400">
                <li className="flex items-start gap-2">
                  <span className="text-rose-400 mt-1">•</span>
                  <span>Manually decode 50+ page insurance policies</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-400 mt-1">•</span>
                  <span>Cross-reference CPT codes with billing statements</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-400 mt-1">•</span>
                  <span>Make 10+ phone calls to insurance companies</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-400 mt-1">•</span>
                  <span>Wait weeks for responses, often getting denied again</span>
                </li>
              </ul>
            </div>
            <div className="space-y-4">
              <div className="flex items-center gap-3 text-emerald-400">
                <div className="w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center text-sm font-bold">✓</div>
                <span className="font-medium">With MediAdvocate</span>
              </div>
              <ul className="space-y-3 text-slate-400">
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 mt-1">•</span>
                  <span>Upload your bill — AI extracts all relevant codes</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 mt-1">•</span>
                  <span>Agent automatically identifies discrepancies</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 mt-1">•</span>
                  <span>Researches fair market prices in your region</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 mt-1">•</span>
                  <span>Generates a polished, cited appeal letter in minutes</span>
                </li>
              </ul>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
