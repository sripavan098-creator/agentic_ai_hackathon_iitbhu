import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Upload, Search, FileText, CheckCircle, AlertCircle, ArrowRight } from 'lucide-react';

const demoSteps = [
  {
    id: 0,
    title: 'Upload Medical Bill',
    icon: Upload,
    color: 'sky',
    content: {
      description: 'User uploads their medical bill and EOB denial letter.',
      mockData: [
        { label: 'Patient', value: 'Jane Doe' },
        { label: 'Provider', value: 'Metro General Hospital' },
        { label: 'Date of Service', value: '2024-11-15' },
        { label: 'Billed Amount', value: '$12,847.00' },
        { label: 'Status', value: 'DENIED — Out of Network', isError: true },
      ],
      agentThought: 'I see this claim was denied as "out of network." Let me verify if Metro General Hospital is actually in-network for this patient\'s plan...',
    },
  },
  {
    id: 1,
    title: 'Extract & Analyze',
    icon: Search,
    color: 'violet',
    content: {
      description: 'Agent extracts CPT codes and cross-references with insurance policy.',
      mockData: [
        { label: 'CPT Code', value: '99213 — Office Visit Lvl 3' },
        { label: 'ICD-10', value: 'K21.0 — GERD with esophagitis' },
        { label: 'Policy Section', value: '§4.2 — In-Network Facilities' },
        { label: 'Fair Market Price', value: '$340 (regional avg)' },
        { label: 'Billed vs Fair', value: '$12,847 vs $340 — 37.8x markup', isError: true },
      ],
      agentThought: 'Critical finding: The billed amount is 37.8x the regional fair market price. Additionally, policy §4.2 states that services at in-network facilities are covered even if individual providers are out-of-network.',
    },
  },
  {
    id: 2,
    title: 'Draft Appeal Letter',
    icon: FileText,
    color: 'emerald',
    content: {
      description: 'LLM drafts a formal appeal letter with specific policy citations.',
      mockData: [
        { label: 'Tone', value: 'Professional & Assertive' },
        { label: 'Policy Citations', value: '§4.2, §7.1, §12.3' },
        { label: 'Evidence Cited', value: '3 sources (policy, pricing, directory)' },
        { label: 'Legal References', value: 'No Surprises Act (2022)' },
        { label: 'Word Count', value: '847 words' },
      ],
      agentThought: 'Draft complete. Sending to Critic node for evaluation against the appeal rubric...',
    },
  },
  {
    id: 3,
    title: 'Critic Evaluation',
    icon: AlertCircle,
    color: 'amber',
    content: {
      description: 'Critic node evaluates draft — finds missing network proof.',
      mockData: [
        { label: 'Rubric Check: Tone', value: '✓ Pass' },
        { label: 'Rubric Check: Citations', value: '✓ Pass — 3 policy sections cited' },
        { label: 'Rubric Check: Evidence', value: '✗ Fail — Missing facility network proof' },
        { label: 'Rubric Check: Legal', value: '✓ Pass — No Surprises Act cited' },
        { label: 'Overall', value: 'REJECTED — Needs adaptation', isError: true },
      ],
      agentThought: 'The Critic flagged that we need proof Metro General is in-network. Pivoting strategy: searching hospital provider directory...',
    },
  },
  {
    id: 4,
    title: 'Adapt & Finalize',
    icon: CheckCircle,
    color: 'emerald',
    content: {
      description: 'Agent searches hospital directory, finds proof, regenerates letter.',
      mockData: [
        { label: 'New Evidence', value: 'Hospital directory confirms in-network ✓' },
        { label: 'Updated Citations', value: '§4.2 + Directory Page 47' },
        { label: 'Rubric Re-check', value: 'All 4 criteria PASS ✓' },
        { label: 'Final Status', value: 'APPROVED — Ready to submit' },
        { label: 'Time Elapsed', value: '2 min 47 sec' },
      ],
      agentThought: 'All rubric criteria pass. The appeal letter is now complete with 4 policy citations, fair market pricing data, and official network status proof. Ready for user review.',
    },
  },
];

const colorMap: Record<string, { bg: string; border: string; text: string; glow: string }> = {
  sky: { bg: 'bg-sky-500/10', border: 'border-sky-500/30', text: 'text-sky-400', glow: 'shadow-sky-500/20' },
  violet: { bg: 'bg-violet-500/10', border: 'border-violet-500/30', text: 'text-violet-400', glow: 'shadow-violet-500/20' },
  emerald: { bg: 'bg-emerald-500/10', border: 'border-emerald-500/30', text: 'text-emerald-400', glow: 'shadow-emerald-500/20' },
  amber: { bg: 'bg-amber-500/10', border: 'border-amber-500/30', text: 'text-amber-400', glow: 'shadow-amber-500/20' },
};

export default function HowItWorks() {
  const [activeStep, setActiveStep] = useState(0);
  const step = demoSteps[activeStep];
  const colors = colorMap[step.color];

  return (
    <section id="demo" className="relative py-24 bg-slate-950">
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-slate-900/30 to-slate-950" />
      
      <div className="relative z-10 max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-sm font-semibold text-sky-400 uppercase tracking-wider">Interactive Demo</span>
          <h2 className="text-4xl md:text-5xl font-bold text-white mt-3 mb-6">
            Watch the Agent <span className="gradient-text">In Action</span>
          </h2>
          <p className="text-lg text-slate-400 max-w-3xl mx-auto">
            Click through each step to see how MediAdvocate processes a denied claim, 
            evaluates its work, and adapts when it finds gaps.
          </p>
        </motion.div>

        {/* Step Navigation */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {demoSteps.map((s, i) => (
            <button
              key={i}
              onClick={() => setActiveStep(i)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                activeStep === i
                  ? `${colorMap[s.color].bg} ${colorMap[s.color].border} border ${colorMap[s.color].text}`
                  : 'bg-white/5 border border-white/5 text-slate-400 hover:text-white hover:bg-white/10'
              }`}
            >
              <s.icon size={16} />
              <span className="hidden sm:inline">{s.title}</span>
              <span className="sm:hidden">{i + 1}</span>
            </button>
          ))}
        </div>

        {/* Step Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeStep}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className={`${colors.bg} border ${colors.border} rounded-2xl p-6 md:p-8 shadow-2xl ${colors.glow}`}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className={`p-2 rounded-lg ${colors.bg}`}>
                <step.icon className={colors.text} size={24} />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">Step {activeStep + 1}: {step.title}</h3>
                <p className="text-sm text-slate-400">{step.content.description}</p>
              </div>
            </div>

            {/* Data table */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-6">
              {step.content.mockData.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className={`flex justify-between items-center px-4 py-3 rounded-lg ${
                    'isError' in item && item.isError
                      ? 'bg-rose-500/10 border border-rose-500/20'
                      : 'bg-white/5 border border-white/5'
                  }`}
                >
                  <span className="text-sm text-slate-400">{item.label}</span>
                  <span className={`text-sm font-medium ${
                    'isError' in item && item.isError ? 'text-rose-400' : 'text-white'
                  }`}>{item.value}</span>
                </motion.div>
              ))}
            </div>

            {/* Agent thought bubble */}
            <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700/50">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-violet-500 to-sky-500 flex items-center justify-center shrink-0">
                  <span className="text-white text-xs font-bold">AI</span>
                </div>
                <div>
                  <div className="text-xs text-slate-500 mb-1 font-medium">Agent Reasoning:</div>
                  <p className="text-sm text-slate-300 italic">{step.content.agentThought}</p>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Navigation arrows */}
        <div className="flex justify-center gap-4 mt-8">
          <button
            onClick={() => setActiveStep(Math.max(0, activeStep - 1))}
            disabled={activeStep === 0}
            className="px-5 py-2 rounded-lg bg-white/5 border border-white/10 text-white text-sm disabled:opacity-30 disabled:cursor-not-allowed hover:bg-white/10 transition-all"
          >
            ← Previous
          </button>
          <button
            onClick={() => setActiveStep(Math.min(demoSteps.length - 1, activeStep + 1))}
            disabled={activeStep === demoSteps.length - 1}
            className="px-5 py-2 rounded-lg bg-sky-500/20 border border-sky-500/30 text-sky-300 text-sm disabled:opacity-30 disabled:cursor-not-allowed hover:bg-sky-500/30 transition-all"
          >
            Next →
          </button>
        </div>
      </div>
    </section>
  );
}
