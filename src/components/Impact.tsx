import { motion } from 'framer-motion';
import { DollarSign, Users, Zap, Heart, TrendingUp, Shield } from 'lucide-react';

const impacts = [
  {
    icon: DollarSign,
    title: 'Financial Impact',
    description: 'Saves users thousands of dollars by overturning erroneous denials and correcting billing errors.',
    stat: '$5,000+',
    statLabel: 'avg. savings per appeal',
    color: 'text-emerald-400',
    bg: 'bg-emerald-500/10',
    border: 'border-emerald-500/20',
  },
  {
    icon: Users,
    title: 'Social Equity',
    description: 'Democratizes access to healthcare financial advocacy, leveling the playing field against insurance bureaucracies.',
    stat: '10x',
    statLabel: 'more patients can fight back',
    color: 'text-sky-400',
    bg: 'bg-sky-500/10',
    border: 'border-sky-500/20',
  },
  {
    icon: Zap,
    title: 'Efficiency',
    description: 'Reduces a process that normally takes weeks of phone calls and research into a 3-minute automated workflow.',
    stat: '3 min',
    statLabel: 'vs. weeks of manual work',
    color: 'text-violet-400',
    bg: 'bg-violet-500/10',
    border: 'border-violet-500/20',
  },
];

const targetUsers = [
  { icon: Heart, label: 'Patients & Caregivers', desc: 'Overwhelmed by medical debt or claim denials' },
  { icon: Shield, label: 'Patient Advocacy Groups', desc: 'Scaling their support to more people' },
  { icon: TrendingUp, label: 'Medical Billing Advocates', desc: 'AI-augmented workflow for professionals' },
];

export default function Impact() {
  return (
    <section id="impact" className="relative py-24 bg-slate-950">
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-slate-900/50 to-slate-950" />
      
      <div className="relative z-10 max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-sm font-semibold text-emerald-400 uppercase tracking-wider">Expected Impact</span>
          <h2 className="text-4xl md:text-5xl font-bold text-white mt-3 mb-6">
            Transforming <span className="gradient-text">Healthcare Access</span>
          </h2>
          <p className="text-lg text-slate-400 max-w-3xl mx-auto">
            MediAdvocate doesn't just save money — it restores agency to patients 
            and creates a more equitable healthcare system.
          </p>
        </motion.div>

        {/* Impact Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {impacts.map((impact, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className={`${impact.bg} border ${impact.border} rounded-2xl p-6 hover:scale-[1.02] transition-transform duration-300`}
            >
              <impact.icon className={`${impact.color} mb-4`} size={32} />
              <h3 className="text-xl font-bold text-white mb-2">{impact.title}</h3>
              <p className="text-slate-400 text-sm mb-4">{impact.description}</p>
              <div className="pt-4 border-t border-white/5">
                <div className={`text-3xl font-bold ${impact.color}`}>{impact.stat}</div>
                <div className="text-xs text-slate-500 mt-1">{impact.statLabel}</div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Target Users */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="glass-card rounded-2xl p-8"
        >
          <h3 className="text-xl font-bold text-white mb-6 text-center">Who Benefits?</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {targetUsers.map((user, i) => (
              <div key={i} className="flex items-start gap-4">
                <div className="p-3 rounded-xl bg-white/5 shrink-0">
                  <user.icon className="text-sky-400" size={24} />
                </div>
                <div>
                  <div className="text-white font-semibold">{user.label}</div>
                  <div className="text-sm text-slate-400 mt-1">{user.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Why Agentic */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-12 glass-card rounded-2xl p-8 border border-violet-500/20"
        >
          <h3 className="text-xl font-bold text-white mb-4 text-center">
            Why This Requires an <span className="text-violet-400">Agentic</span> Solution
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-rose-500/20 flex items-center justify-center shrink-0 mt-0.5">
                  <span className="text-rose-400 text-xs">✗</span>
                </div>
                <div>
                  <div className="text-white font-medium text-sm">Standard LLM / RAG Chatbot</div>
                  <div className="text-slate-400 text-sm">Can only <em>explain</em> what a medical code means. Cannot act, adapt, or iterate.</div>
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-emerald-500/20 flex items-center justify-center shrink-0 mt-0.5">
                  <span className="text-emerald-400 text-xs">✓</span>
                </div>
                <div>
                  <div className="text-white font-medium text-sm">MediAdvocate (Agentic)</div>
                  <div className="text-slate-400 text-sm">Dynamic loop: <strong>Observe → Decide → Act → Evaluate → Adapt</strong>. Handles failures gracefully.</div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
