import { motion } from 'framer-motion';
import { 
  Github, FolderTree, Shield, Key, FileCode, 
  Terminal, AlertTriangle, CheckCircle2, ExternalLink
} from 'lucide-react';

const projectStructure = [
  { name: 'app.py', desc: 'Streamlit frontend UI', icon: '📱' },
  { name: 'main.py', desc: 'CLI entry point for agent execution', icon: '⚡' },
  { name: 'requirements.txt', desc: 'Python dependencies', icon: '📦' },
  { name: '.env.example', desc: 'Template for environment variables', icon: '🔑' },
  { name: '.gitignore', desc: 'Ensures .env and local DBs are not committed', icon: '🔒' },
  { name: 'agent/graph.py', desc: 'LangGraph state machine definition', icon: '🧠' },
  { name: 'agent/nodes.py', desc: 'Individual agent nodes', icon: '🔗' },
  { name: 'agent/tools.py', desc: 'Tool definitions (Tavily, Chroma, OCR)', icon: '🔧' },
  { name: 'mock_data/', desc: 'Sample PDFs for testing', icon: '📄' },
];

const securityItems = [
  { label: '.env file in .gitignore', status: '✓' },
  { label: '.env.example with dummy values', status: '✓' },
  { label: 'No API keys in source code', status: '✓' },
  { label: 'chroma_db/ excluded from commits', status: '✓' },
  { label: 'venv/ excluded from commits', status: '✓' },
  { label: '__pycache__/ excluded from commits', status: '✓' },
];

export default function Repository() {
  return (
    <section id="repository" className="relative py-24 bg-slate-950">
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-slate-900/30 to-slate-950" />
      
      <div className="relative z-10 max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-sm font-semibold text-cyan-400 uppercase tracking-wider">Open Source</span>
          <h2 className="text-4xl md:text-5xl font-bold text-white mt-3 mb-6">
            GitHub <span className="gradient-text">Repository</span>
          </h2>
          <p className="text-lg text-slate-400 max-w-3xl mx-auto">
            Full source code, documentation, and setup instructions. 
            Clone, configure, and run locally with your own API keys.
          </p>
        </motion.div>

        {/* GitHub CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex justify-center mb-12"
        >
          <a
            href="https://github.com/your-username/mediadvocate"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-6 py-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all duration-300 group"
          >
            <Github size={24} className="text-white" />
            <span className="text-white font-medium">View on GitHub</span>
            <ExternalLink size={16} className="text-slate-400 group-hover:text-white transition-colors" />
          </a>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Project Structure */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="glass-card rounded-2xl p-6"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 rounded-lg bg-sky-500/10">
                <FolderTree className="text-sky-400" size={20} />
              </div>
              <h3 className="text-lg font-bold text-white">Project Structure</h3>
            </div>
            <div className="space-y-2">
              {projectStructure.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  className="flex items-center gap-3 px-3 py-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
                >
                  <span className="text-lg">{item.icon}</span>
                  <code className="text-sm text-sky-300 font-mono">{item.name}</code>
                  <span className="text-xs text-slate-500 ml-auto hidden sm:block">{item.desc}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Security & Setup */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            {/* Security Warning */}
            <div className="glass-card rounded-2xl p-6 border border-amber-500/20">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 rounded-lg bg-amber-500/10">
                  <Shield className="text-amber-400" size={20} />
                </div>
                <h3 className="text-lg font-bold text-white">Security & Compliance</h3>
              </div>
              <div className="bg-amber-500/5 border border-amber-500/10 rounded-xl p-4 mb-4">
                <div className="flex items-start gap-2">
                  <AlertTriangle className="text-amber-400 shrink-0 mt-0.5" size={16} />
                  <p className="text-sm text-amber-200">
                    <strong>DO NOT commit API keys.</strong> This project uses a <code className="text-amber-300">.env</code> file 
                    for local configuration. All secrets are protected by <code className="text-amber-300">.gitignore</code>.
                  </p>
                </div>
              </div>
              <div className="space-y-2">
                {securityItems.map((item, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <CheckCircle2 className="text-emerald-400" size={16} />
                    <span className="text-sm text-slate-300">{item.label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Setup */}
            <div className="glass-card rounded-2xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 rounded-lg bg-emerald-500/10">
                  <Terminal className="text-emerald-400" size={20} />
                </div>
                <h3 className="text-lg font-bold text-white">Quick Setup</h3>
              </div>
              <div className="bg-slate-900 rounded-xl p-4 font-mono text-sm space-y-1">
                <div className="text-slate-500"># Clone & setup</div>
                <div className="text-emerald-300">$ git clone https://github.com/.../mediadvocate.git</div>
                <div className="text-emerald-300">$ cd mediadvocate</div>
                <div className="text-emerald-300">$ python -m venv venv && source venv/bin/activate</div>
                <div className="text-emerald-300">$ pip install -r requirements.txt</div>
                <div className="text-emerald-300">$ cp .env.example .env</div>
                <div className="text-slate-500 mt-2"># Add your API keys to .env, then:</div>
                <div className="text-emerald-300">$ streamlit run app.py</div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Tech Stack Table */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-12 glass-card rounded-2xl p-6"
        >
          <h3 className="text-lg font-bold text-white mb-6 text-center">Complete Tech Stack</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { name: 'LangGraph', role: 'Agent Orchestration', color: 'bg-violet-500/10 text-violet-300' },
              { name: 'GPT-4o / Claude 3.5', role: 'LLM Backbone', color: 'bg-sky-500/10 text-sky-300' },
              { name: 'Unstructured.io', role: 'Document Parsing', color: 'bg-emerald-500/10 text-emerald-300' },
              { name: 'ChromaDB', role: 'Vector Database', color: 'bg-purple-500/10 text-purple-300' },
              { name: 'Tavily API', role: 'Web Search', color: 'bg-amber-500/10 text-amber-300' },
              { name: 'Streamlit', role: 'Frontend UI', color: 'bg-rose-500/10 text-rose-300' },
            ].map((tech, i) => (
              <div key={i} className={`${tech.color} rounded-xl p-4 flex items-center gap-3`}>
                <div className="w-2 h-2 rounded-full bg-current" />
                <div>
                  <div className="font-semibold text-sm">{tech.name}</div>
                  <div className="text-xs opacity-70">{tech.role}</div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
