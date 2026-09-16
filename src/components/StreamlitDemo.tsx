import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Upload, Play, AlertTriangle, CheckCircle2, 
  FileText, Search, PenTool, RefreshCw, 
  Scale, ChevronRight, Sparkles
} from 'lucide-react';

interface LogEntry {
  icon: string;
  node: string;
  message: string;
  color: string;
}

const phase1Logs: LogEntry[] = [
  { icon: '👁️', node: 'OBSERVE', message: 'Extracted CPT: 70553', color: 'text-sky-400' },
  { icon: '🛠️', node: 'ACT', message: 'Queried Policy DB and Web Search.', color: 'text-violet-400' },
  { icon: '✍️', node: 'DRAFT', message: 'Generated Draft 1.', color: 'text-emerald-400' },
  { icon: '⚖️', node: 'EVALUATE', message: 'Critic reviewed the draft.', color: 'text-amber-400' },
];

const phase2Logs: LogEntry[] = [
  { icon: '🚨', node: 'PUSHBACK', message: 'Insurance denied Draft 1. Agent adapting...', color: 'text-rose-400' },
  { icon: '🔄', node: 'ADAPT', message: 'Searched hospital directory for network proof.', color: 'text-amber-400' },
  { icon: '✍️', node: 'DRAFT', message: 'Regenerated escalated Draft 2 with new evidence.', color: 'text-emerald-400' },
  { icon: '⚖️', node: 'EVALUATE', message: 'Critic approved. All rubric criteria pass ✓', color: 'text-emerald-400' },
];

const draft1 = `Dear Claims Review Board,

I am writing to formally appeal the denial of my claim for CPT 70553 (MRI Brain without Contrast) dated August 28, 2026, billed at $2,450.00.

Per your policy document, Section 4.2 (Page 42) states that the fair market value for CPT 70553 shall not exceed $1,200.00 in zip code 90210. The billed amount significantly exceeds this allowed amount.

Furthermore, Section 4.3 invokes No Surprises Act protections, which shield patients from balance billing at in-network facilities.

I respectfully request a re-evaluation of this claim.

Sincerely,
Alex Mercer`;

const draft2 = `Dear Claims Review Board,

I am writing to formally appeal the denial of my claim for CPT 70553 (MRI Brain without Contrast) dated August 28, 2026, billed at $2,450.00.

NEW EVIDENCE SUBMITTED: Per the official Mercy General Hospital Network Directory (DIR-2026-08-MGH-001, updated August 15, 2026), Mercy General Hospital is confirmed as IN-NETWORK (Tier 1 Preferred), with the Radiology & Imaging Center specifically listed as In-Network.

Per your policy document, Section 4.2 (Page 42) states that the fair market value for CPT 70553 shall not exceed $1,200.00 in zip code 90210. Section 4.4 further confirms that all services at in-network facilities are covered at in-network rates.

Under the No Surprises Act (Section 4.3), I am protected from balance billing.

I respectfully request immediate re-evaluation and full coverage of this claim.

Sincerely,
Alex Mercer`;

export default function StreamlitDemo() {
  const [phase, setPhase] = useState<'idle' | 'running1' | 'draft1' | 'pushback' | 'running2' | 'final'>('idle');
  const [visibleLogs, setVisibleLogs] = useState<LogEntry[]>([]);
  const [currentDraft, setCurrentDraft] = useState<string | null>(null);
  const logIndexRef = useRef(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const startPhase1 = () => {
    setPhase('running1');
    setVisibleLogs([]);
    setCurrentDraft(null);
    logIndexRef.current = 0;

    intervalRef.current = setInterval(() => {
      if (logIndexRef.current < phase1Logs.length) {
        setVisibleLogs(prev => [...prev, phase1Logs[logIndexRef.current]]);
        logIndexRef.current++;
      } else {
        if (intervalRef.current) clearInterval(intervalRef.current);
        setPhase('draft1');
        setCurrentDraft(draft1);
      }
    }, 800);
  };

  const startPhase2 = () => {
    setPhase('pushback');
    setVisibleLogs([]);
    logIndexRef.current = 0;

    setTimeout(() => {
      setPhase('running2');
      intervalRef.current = setInterval(() => {
        if (logIndexRef.current < phase2Logs.length) {
          setVisibleLogs(prev => [...prev, phase2Logs[logIndexRef.current]]);
          logIndexRef.current++;
        } else {
          if (intervalRef.current) clearInterval(intervalRef.current);
          setPhase('final');
          setCurrentDraft(draft2);
        }
      }, 1000);
    }, 1500);
  };

  const reset = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    setPhase('idle');
    setVisibleLogs([]);
    setCurrentDraft(null);
  };

  return (
    <section id="streamlit-demo" className="relative py-24 bg-slate-950">
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-slate-900/50 to-slate-950" />
      
      <div className="relative z-10 max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-sm font-semibold text-rose-400 uppercase tracking-wider">Live Demo Simulation</span>
          <h2 className="text-4xl md:text-5xl font-bold text-white mt-3 mb-6">
            Streamlit <span className="gradient-text">App Experience</span>
          </h2>
          <p className="text-lg text-slate-400 max-w-3xl mx-auto">
            This simulates the actual Streamlit interface. Click "Start Autonomous Appeal" to watch 
            the agent work, then trigger the insurance pushback to see it adapt.
          </p>
        </motion.div>

        {/* Streamlit-like UI */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="rounded-2xl overflow-hidden border border-white/10 bg-white shadow-2xl"
        >
          {/* Streamlit Header */}
          <div className="bg-white px-6 py-4 border-b border-gray-200">
            <div className="flex items-center gap-3">
              <span className="text-2xl">🏥</span>
              <h1 className="text-xl font-bold text-gray-900">MediAdvocate: Autonomous Appeal Agent</h1>
            </div>
            <p className="text-sm text-gray-600 mt-1">
              Upload your Explanation of Benefits (EOB) denial letter. The agent will autonomously gather evidence, draft an appeal, and adapt to insurance pushbacks.
            </p>
          </div>

          {/* Main Content */}
          <div className="p-6 bg-gray-50">
            {/* Upload Area */}
            <div className="bg-white rounded-lg border-2 border-dashed border-gray-300 p-6 mb-6 text-center">
              <Upload className="mx-auto text-gray-400 mb-2" size={32} />
              <p className="text-sm text-gray-600">
                <span className="font-medium text-gray-900">mock_data/eob_denial.pdf</span> uploaded ✓
              </p>
            </div>

            {/* Extracted Text */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
              <p className="text-xs font-semibold text-blue-800 mb-2">📄 Extracted Bill Text</p>
              <p className="text-xs text-blue-700 font-mono">
                EXPLANATION OF BENEFITS (EOB) - CLAIM DENIAL... Patient Name: Alex Mercer... 
                CPT Code: 70553... Billed Amount: $2,450.00... DENIAL REASON CODE: CO-45...
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 mb-6">
              {phase === 'idle' && (
                <button
                  onClick={startPhase1}
                  className="flex items-center gap-2 px-6 py-3 bg-red-600 text-white font-medium rounded-lg hover:bg-red-700 transition-colors"
                >
                  <Play size={16} />
                  Start Autonomous Appeal
                </button>
              )}
              {phase === 'draft1' && (
                <button
                  onClick={startPhase2}
                  className="flex items-center gap-2 px-6 py-3 bg-gray-700 text-white font-medium rounded-lg hover:bg-gray-800 transition-colors"
                >
                  <AlertTriangle size={16} />
                  Simulate Insurance Pushback ('Missing Network Proof')
                </button>
              )}
              {phase === 'final' && (
                <button
                  onClick={reset}
                  className="flex items-center gap-2 px-6 py-3 bg-gray-200 text-gray-700 font-medium rounded-lg hover:bg-gray-300 transition-colors"
                >
                  Reset Demo
                </button>
              )}
            </div>

            {/* Agent Logs */}
            {(phase === 'running1' || phase === 'running2' || phase === 'pushback') && (
              <div className="bg-white rounded-lg border border-gray-200 p-4 mb-6">
                <p className="text-xs font-semibold text-gray-600 mb-3">Agent Execution Log:</p>
                <div className="space-y-2">
                  <AnimatePresence>
                    {visibleLogs.map((log, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="flex items-start gap-2 text-sm"
                      >
                        <span>{log.icon}</span>
                        <span className="font-semibold text-gray-900">[{log.node}]</span>
                        <span className={`${log.color} dark:text-opacity-100`}>{log.message}</span>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                  {(phase === 'running1' || phase === 'running2') && (
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
                      Processing...
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Pushback Alert */}
            {phase === 'pushback' && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6"
              >
                <div className="flex items-center gap-2 text-red-800 font-semibold text-sm">
                  <AlertTriangle size={16} />
                  PUSHBACK RECEIVED: Insurance denied Draft 1. Agent adapting...
                </div>
              </motion.div>
            )}

            {/* Draft Display */}
            <AnimatePresence>
              {currentDraft && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="bg-white rounded-lg border border-gray-200 p-6"
                >
                  <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <PenTool size={18} />
                    {phase === 'final' ? '✍️ Final Escalated Appeal Letter' : '✍️ Draft Appeal Letter'}
                  </h3>
                  <pre className="text-sm text-gray-700 whitespace-pre-wrap font-sans leading-relaxed">
                    {currentDraft}
                  </pre>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Success Message */}
            {phase === 'final' && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-6 bg-green-50 border border-green-200 rounded-lg p-4"
              >
                <div className="flex items-center gap-2 text-green-800 font-semibold">
                  <CheckCircle2 size={18} />
                  Final Escalated Draft Ready! The agent successfully adapted and found the missing network proof.
                </div>
              </motion.div>
            )}
          </div>
        </motion.div>

        {/* How to run instructions */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-12 glass-card rounded-2xl p-6"
        >
          <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
            <Sparkles className="text-amber-400" size={20} />
            Run This Locally
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-slate-800/50 rounded-xl p-4 font-mono text-sm">
              <div className="text-slate-500 mb-1"># 1. Install dependencies</div>
              <div className="text-emerald-300">pip install -r requirements.txt</div>
            </div>
            <div className="bg-slate-800/50 rounded-xl p-4 font-mono text-sm">
              <div className="text-slate-500 mb-1"># 2. Generate mock PDFs</div>
              <div className="text-emerald-300">python generate_mock_data.py</div>
            </div>
            <div className="bg-slate-800/50 rounded-xl p-4 font-mono text-sm">
              <div className="text-slate-500 mb-1"># 3. Configure API keys</div>
              <div className="text-amber-300">cp .env.example .env</div>
            </div>
            <div className="bg-slate-800/50 rounded-xl p-4 font-mono text-sm">
              <div className="text-slate-500 mb-1"># 4. Launch Streamlit app</div>
              <div className="text-emerald-300">streamlit run app.py</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
