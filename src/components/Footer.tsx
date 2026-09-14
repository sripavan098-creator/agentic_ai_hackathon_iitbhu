import { Shield } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="relative py-16 bg-slate-950 border-t border-white/5">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-sky-500 to-violet-600 flex items-center justify-center">
                <Shield className="text-white" size={18} />
              </div>
              <span className="text-white font-bold text-lg">MediAdvocate</span>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed">
              The Autonomous Medical Billing & Insurance Appeal Agent. 
              Built for Tech Zephyr 4.0 Agentic AI Hackathon.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold mb-4">Quick Links</h4>
            <div className="space-y-2">
              {[
                { href: '#problem', label: 'Problem Statement' },
                { href: '#solution', label: 'Solution Overview' },
                { href: '#architecture', label: 'System Architecture' },
                { href: '#demo', label: 'Interactive Demo' },
                { href: '#impact', label: 'Expected Impact' },
                { href: '#repository', label: 'GitHub Repository' },
              ].map((link) => (
                <a key={link.href} href={link.href} className="block text-sm text-slate-400 hover:text-white transition-colors">
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          {/* Tech Stack */}
          <div>
            <h4 className="text-white font-semibold mb-4">Tech Stack</h4>
            <div className="space-y-2 text-sm text-slate-400">
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-sky-400" />
                LangGraph — Agent Orchestration
              </div>
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-violet-400" />
                ChromaDB — Vector Database
              </div>
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                Tavily — Web Search API
              </div>
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                GPT-4o / Claude 3.5 — LLM Backbone
              </div>
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-rose-400" />
                Unstructured.io — Document Parsing
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-slate-500">
            © 2025 MediAdvocate. Built for Tech Zephyr 4.0 Agentic AI Hackathon.
          </p>
          <div className="flex items-center gap-4">
            <span className="text-xs text-slate-600">
              Observe → Decide → Act → Evaluate → Adapt
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
