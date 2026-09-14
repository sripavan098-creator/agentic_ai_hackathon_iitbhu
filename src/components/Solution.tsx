import { motion } from 'framer-motion';
import { Eye, Brain, PenTool, RefreshCw, CheckCircle } from 'lucide-react';

const steps = [
  {
    icon: Eye,
    title: 'Observe',
    subtitle: 'Ingest & Extract',
    description: 'Upload medical bills and EOB denial letters. The agent parses unstructured PDFs, extracts CPT/ICD-10 codes, and identifies key billing line items.',
    color: 'from-sky-500 to-cyan-500',
    textColor: 'text-sky-400',
    bg: 'bg-sky-500/10',
  },
  {
    icon: Brain,
    title: 'Decide & Act',
    subtitle: 'Research & Query',
    description: 'Identifies discrepancies autonomously. Queries your insurance policy via vector DB, searches real-time fair market prices, and builds a case strategy.',
    color: 'from-violet-500 to-purple-500',
    textColor: 'text-violet-400',
    bg: 'bg-violet-500/10',
  },
  {
    icon: PenTool,
    title: 'Evaluate',
    subtitle: 'Draft & Critique',
    description: 'A dedicated "Critic" node reviews the drafted appeal letter against a strict rubric — checking for policy citations, professional tone, and legal soundness.',
    color: 'from-emerald-500 to-teal-500',
    textColor: 'text-emerald-400',
    bg: 'bg-emerald-500/10',
  },
  {
    icon: RefreshCw,
    title: 'Adapt',
    subtitle: 'Iterate & Strengthen',
    description: 'If the draft fails evaluation or insurance pushes back with new objections, the agent dynamically alters its plan, searches for missing evidence, and regenerates a stronger appeal.',
    color: 'from-amber-500 to-orange-500',
    textColor: 'text-amber-400',
    bg: 'bg-amber-500/10',
  },
];

export default function Solution() {
  return (
    <section id="solution" className="relative py-24 bg-slate-950">
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-slate-900/30 to-slate-950" />
      
      <div className="relative z-10 max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-sm font-semibold text-emerald-400 uppercase tracking-wider">The Solution</span>
          <h2 className="text-4xl md:text-5xl font-bold text-white mt-3 mb-6">
            An Agentic <span className="gradient-text">Observe → Act → Adapt</span> Loop
          </h2>
          <p className="text-lg text-slate-400 max-w-3xl mx-auto">
            Unlike a simple chatbot, MediAdvocate uses a cyclic agentic workflow that can reason, 
            use tools, evaluate its own output, and adapt when faced with new challenges.
          </p>
        </motion.div>

        {/* Workflow Steps */}
        <div className="relative">
          {/* Connecting line */}
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-sky-500/50 via-violet-500/50 to-amber-500/50" />
          
          <div className="space-y-12">
            {steps.map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: i % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className={`flex flex-col md:flex-row items-center gap-8 ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}
              >
                <div className={`flex-1 ${i % 2 === 0 ? 'md:text-right' : 'md:text-left'}`}>
                  <div className={`inline-block ${step.bg} border border-white/5 rounded-2xl p-6 max-w-md ${i % 2 === 0 ? 'md:ml-auto' : 'md:mr-auto'}`}>
                    <div className="flex items-center gap-3 mb-3">
                      <div className={`p-2 rounded-lg bg-gradient-to-br ${step.color}`}>
                        <step.icon className="text-white" size={20} />
                      </div>
                      <div>
                        <span className={`text-xs font-semibold uppercase tracking-wider ${step.textColor}`}>
                          Step {i + 1}: {step.subtitle}
                        </span>
                      </div>
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-2">{step.title}</h3>
                    <p className="text-slate-400">{step.description}</p>
                  </div>
                </div>

                {/* Center node */}
                <div className="hidden md:flex items-center justify-center w-12 h-12 rounded-full bg-slate-800 border-2 border-slate-700 z-10 shrink-0">
                  <span className="text-lg font-bold text-white">{i + 1}</span>
                </div>

                <div className="flex-1" />
              </motion.div>
            ))}
          </div>
        </div>

        {/* Final output */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-16 text-center"
        >
          <div className="inline-flex items-center gap-3 px-6 py-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20">
            <CheckCircle className="text-emerald-400" size={24} />
            <span className="text-lg text-emerald-300 font-medium">
              Result: Polished, cited appeal letter ready for submission
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
