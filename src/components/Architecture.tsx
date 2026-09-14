import { motion } from 'framer-motion';
import { 
  Brain, Database, Globe, FileSearch, PenTool, 
  Scale, RefreshCw, User, CheckCircle
} from 'lucide-react';

export default function Architecture() {
  return (
    <section id="architecture" className="relative py-24 bg-slate-950">
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-slate-900/50 to-slate-950" />
      
      <div className="relative z-10 max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-sm font-semibold text-violet-400 uppercase tracking-wider">System Architecture</span>
          <h2 className="text-4xl md:text-5xl font-bold text-white mt-3 mb-6">
            Built on <span className="gradient-text">LangGraph</span> ReAct Loop
          </h2>
          <p className="text-lg text-slate-400 max-w-3xl mx-auto">
            A cyclic agentic architecture that enables dynamic planning, tool use, 
            self-evaluation, and adaptive recovery from failures.
          </p>
        </motion.div>

        {/* Architecture Diagram */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative"
        >
          <div className="glass-card rounded-3xl p-8 md:p-12 glow-purple">
            {/* User Input */}
            <div className="flex justify-center mb-8">
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="flex items-center gap-3 px-5 py-3 rounded-xl bg-sky-500/10 border border-sky-500/30"
              >
                <User className="text-sky-400" size={20} />
                <span className="text-sky-300 font-medium text-sm">User: Uploads Bill/EOB PDF</span>
              </motion.div>
            </div>

            {/* Arrow down */}
            <div className="flex justify-center mb-4">
              <div className="w-px h-8 bg-gradient-to-b from-sky-500/50 to-violet-500/50" />
            </div>

            {/* Controller */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="flex justify-center mb-8"
            >
              <div className="flex items-center gap-3 px-6 py-4 rounded-2xl bg-gradient-to-r from-violet-500/20 to-sky-500/20 border border-violet-500/30 glow-purple">
                <Brain className="text-violet-400" size={24} />
                <div>
                  <div className="text-white font-bold">Agentic Controller / Planner</div>
                  <div className="text-xs text-violet-300">LangGraph ReAct Loop</div>
                </div>
              </div>
            </motion.div>

            {/* State Memory - side connection */}
            <div className="flex flex-col md:flex-row items-center justify-center gap-4 mb-8">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
                className="flex items-center gap-2 px-4 py-3 rounded-xl bg-purple-500/10 border border-purple-500/20"
              >
                <Database className="text-purple-400" size={18} />
                <div>
                  <div className="text-purple-300 font-medium text-sm">State Memory</div>
                  <div className="text-xs text-slate-500">CPT Codes • Policy Clauses • Drafts</div>
                </div>
              </motion.div>
            </div>

            {/* Tools Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              {[
                { icon: FileSearch, title: 'Document Parser', desc: 'Unstructured.io / LlamaParse', color: 'text-emerald-400', bg: 'bg-emerald-500/10', border: 'border-emerald-500/20' },
                { icon: Database, title: 'Vector DB Retriever', desc: 'ChromaDB + Policy PDF', color: 'text-cyan-400', bg: 'bg-cyan-500/10', border: 'border-cyan-500/20' },
                { icon: Globe, title: 'Web Search API', desc: 'Tavily for CPT/Pricing', color: 'text-amber-400', bg: 'bg-amber-500/10', border: 'border-amber-500/20' },
                { icon: PenTool, title: 'LLM Drafting Node', desc: 'GPT-4o / Claude 3.5', color: 'text-rose-400', bg: 'bg-rose-500/10', border: 'border-rose-500/20' },
              ].map((tool, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5 + i * 0.1 }}
                  className={`${tool.bg} border ${tool.border} rounded-xl p-4 text-center`}
                >
                  <tool.icon className={`${tool.color} mx-auto mb-2`} size={24} />
                  <div className="text-white font-medium text-sm">{tool.title}</div>
                  <div className="text-xs text-slate-500 mt-1">{tool.desc}</div>
                </motion.div>
              ))}
            </div>

            {/* Evaluation Node */}
            <div className="flex justify-center mb-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.8 }}
                className="flex items-center gap-3 px-5 py-3 rounded-xl bg-amber-500/10 border border-amber-500/30"
              >
                <Scale className="text-amber-400" size={20} />
                <div>
                  <div className="text-amber-300 font-medium text-sm">Evaluation / Critic Node</div>
                  <div className="text-xs text-slate-500">Checks against Appeal Rubric</div>
                </div>
              </motion.div>
            </div>

            {/* Adaptation / Feedback loop */}
            <div className="flex justify-center mb-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.9 }}
                className="flex items-center gap-3 px-5 py-3 rounded-xl bg-rose-500/10 border border-rose-500/20 border-dashed"
              >
                <RefreshCw className="text-rose-400" size={18} />
                <div>
                  <div className="text-rose-300 font-medium text-sm">Adaptation Protocol</div>
                  <div className="text-xs text-slate-500">Fails rubric? → New search → Regenerate</div>
                </div>
              </motion.div>
            </div>

            {/* Final Output */}
            <div className="flex justify-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 1.0 }}
                className="flex items-center gap-3 px-6 py-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30"
              >
                <CheckCircle className="text-emerald-400" size={22} />
                <div>
                  <div className="text-emerald-300 font-bold">Final Output</div>
                  <div className="text-xs text-slate-400">Polished, Cited Appeal Letter</div>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Tech Stack */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4"
        >
          {[
            { name: 'LangGraph', role: 'Agent Orchestration' },
            { name: 'ChromaDB', role: 'Vector Database' },
            { name: 'Tavily', role: 'Web Search' },
            { name: 'Claude/GPT-4o', role: 'LLM Backbone' },
          ].map((tech, i) => (
            <div key={i} className="text-center p-4 rounded-xl bg-white/5 border border-white/5">
              <div className="text-white font-semibold text-sm">{tech.name}</div>
              <div className="text-xs text-slate-500 mt-1">{tech.role}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
