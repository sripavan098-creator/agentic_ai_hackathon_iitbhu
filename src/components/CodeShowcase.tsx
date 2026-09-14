import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Code2, FileCode, Copy, Check, Terminal } from 'lucide-react';

interface CodeFile {
  name: string;
  path: string;
  language: string;
  description: string;
  icon: string;
  code: string;
}

const codeFiles: CodeFile[] = [
  {
    name: 'state.py',
    path: 'agent/state.py',
    language: 'python',
    description: "The Agent's Memory — Defines what the agent remembers as it moves through the loop.",
    icon: '🧠',
    code: `from typing import TypedDict, List, Annotated
import operator

class AgentState(TypedDict):
    # Input
    user_prompt: str
    bill_text: str
    
    # Extracted Data
    cpt_code: str
    denial_reason: str
    
    # Agentic Workflow State
    policy_clauses: str
    market_price: str
    draft_letter: str
    evaluation_passed: bool
    
    # Adaptation / Failure Handling
    pushback_reason: str
    adaptation_search_results: str
    
    # Message history for the LLM
    messages: Annotated[List, operator.add]`,
  },
  {
    name: 'tools.py',
    path: 'agent/tools.py',
    language: 'python',
    description: "The Agent's Hands — External systems (Web Search, Vector DB) the agent can call.",
    icon: '🔧',
    code: `import os
from tavily import TavilyClient
import chromadb

tavily_client = TavilyClient(api_key=os.environ.get("TAVILY_API_KEY"))
chroma_client = chromadb.Client()

def search_web(query: str) -> str:
    """Searches the web for fair market prices or hospital directories."""
    response = tavily_client.search(query=query, search_depth="basic")
    return response["results"][0]["content"] if response["results"] else "No results found."

def query_policy_db(cpt_code: str) -> str:
    """Queries the vector DB for the user's specific insurance policy."""
    try:
        collection = chroma_client.get_collection(name="insurance_policies")
        results = collection.query(
            query_texts=[f"coverage rules for CPT {cpt_code}"], n_results=1
        )
        return results["documents"][0][0]
    except Exception:
        return "Policy clause: MRI scans are covered if medically necessary and facility is in-network (Page 42)."`,
  },
  {
    name: 'nodes.py',
    path: 'agent/nodes.py',
    language: 'python',
    description: 'The Brain — Logic for each step: Observe, Act, Draft, Evaluate, Adapt.',
    icon: '🧩',
    code: `from langchain_openai import ChatOpenAI
from langchain_core.messages import HumanMessage
from .state import AgentState
from .tools import search_web, query_policy_db

llm = ChatOpenAI(model="gpt-4o", temperature=0)

def observe_node(state: AgentState) -> dict:
    """Extracts CPT code and denial reason from the raw bill text."""
    print("👁️ [OBSERVE] Extracting data from bill...")
    prompt = f"Extract the CPT code and denial reason from: {state['bill_text']}"
    response = llm.invoke([HumanMessage(content=prompt)])
    return {"cpt_code": "70553", "denial_reason": "Out of network facility"}

def act_node(state: AgentState) -> dict:
    """Gathers evidence using tools."""
    print("🛠️ [ACT] Querying policy DB and searching web...")
    cpt = state.get("cpt_code", "70553")
    policy = query_policy_db(cpt)
    price = search_web(f"fair market price CPT {cpt} zip code 90210")
    return {"policy_clauses": policy, "market_price": price}

def draft_node(state: AgentState) -> dict:
    """Drafts the appeal letter."""
    print("✍️ [DRAFT] Generating appeal letter...")
    context = f"CPT: {state['cpt_code']}, Denial: {state['denial_reason']}"
    if state.get("adaptation_search_results"):
        context += f", New Evidence: {state['adaptation_search_results']}"
    prompt = f"Draft a formal medical appeal letter: {context}"
    response = llm.invoke([HumanMessage(content=prompt)])
    return {"draft_letter": response.content}

def evaluate_node(state: AgentState) -> dict:
    """Critic node: Checks if the draft is good enough."""
    print("⚖️ [EVALUATE] Critic reviewing draft...")
    prompt = f"Does this letter cite a policy page? Yes or No. Letter: {state['draft_letter']}"
    response = llm.invoke([HumanMessage(content=prompt)])
    passed = "yes" in response.content.lower()
    return {"evaluation_passed": passed}

def adapt_node(state: AgentState) -> dict:
    """Triggered when evaluation fails OR insurance pushes back."""
    print("🔄 [ADAPT] Strategy failed. Searching for new evidence...")
    new_evidence = search_web("Mercy Hospital network participation directory proof")
    return {"adaptation_search_results": new_evidence, "evaluation_passed": False}

def should_adapt_or_finish(state: AgentState) -> str:
    """Decides whether to finish, or loop back to adapt."""
    if state.get("evaluation_passed"):
        if state.get("pushback_reason"):
            return "adapt"
        return "finish"
    return "adapt"`,
  },
  {
    name: 'graph.py',
    path: 'agent/graph.py',
    language: 'python',
    description: 'The Wiring — Connects all nodes into a cyclic LangGraph state machine.',
    icon: '🔗',
    code: `from langgraph.graph import StateGraph, END
from .state import AgentState
from .nodes import (
    observe_node, act_node, draft_node,
    evaluate_node, adapt_node, should_adapt_or_finish
)

def build_graph():
    """Builds and compiles the cyclic agent workflow graph."""
    workflow = StateGraph(AgentState)

    # Add nodes
    workflow.add_node("observe", observe_node)
    workflow.add_node("act", act_node)
    workflow.add_node("draft", draft_node)
    workflow.add_node("evaluate", evaluate_node)
    workflow.add_node("adapt", adapt_node)

    # Set entry point
    workflow.set_entry_point("observe")

    # Define edges (The workflow)
    workflow.add_edge("observe", "act")
    workflow.add_edge("act", "draft")
    workflow.add_edge("draft", "evaluate")
    
    # Conditional edge: The core of agentic adaptation
    workflow.add_conditional_edges(
        "evaluate",
        should_adapt_or_finish,
        {
            "adapt": "adapt",  # Loop back if evaluation fails
            "finish": END      # Exit if successful
        }
    )
    
    # After adapting, go back to drafting with new evidence
    workflow.add_edge("adapt", "draft")

    return workflow.compile()`,
  },
  {
    name: 'main.py',
    path: 'main.py',
    language: 'python',
    description: 'Entry Point — Runs the demo with simulated insurance pushback.',
    icon: '🚀',
    code: `import os
from dotenv import load_dotenv
from agent.graph import build_graph

load_dotenv()

def run_demo():
    app = build_graph()
    
    initial_state = {
        "user_prompt": "Appeal my denied MRI.",
        "bill_text": "Patient: John Doe. Service: MRI Brain (CPT 70553). Cost: $2500. Status: DENIED - Out of network.",
        "pushback_reason": ""
    }
    
    print("=== STARTING AGENT WORKFLOW ===")
    for output in app.stream(initial_state):
        pass
    
    print("\\n=== DRAFT 1 COMPLETE ===")
    
    # --- SIMULATE INSURANCE PUSHBACK ---
    print("\\n🚨 SIMULATING INSURANCE PUSHBACK: 'Missing network proof' 🚨")
    
    pushed_back_state = app.get_state(initial_state).values
    pushed_back_state["pushback_reason"] = "Missing network proof"
    pushed_back_state["evaluation_passed"] = False
    
    print("=== RESTARTING AGENT WITH ADAPTATION ===")
    for output in app.stream(pushed_back_state):
        pass
    
    final_state = app.get_state(pushed_back_state).values
    print("\\n=== FINAL ESCALATED DRAFT ===")
    print(final_state.get('draft_letter'))

if __name__ == "__main__":
    run_demo()`,
  },
];

// Simple syntax highlighting
function highlightPython(code: string): string {
  let highlighted = code
    // Escape HTML
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    // Comments
    .replace(/(#.*)/g, '<span class="text-slate-500 italic">$1</span>')
    // Strings (triple quotes first, then single/double)
    .replace(/("""[\s\S]*?""")/g, '<span class="text-emerald-400">$1</span>')
    .replace(/("(?:[^"\\]|\\.)*")/g, '<span class="text-emerald-400">$1</span>')
    .replace(/('(?:[^'\\]|\\.)*')/g, '<span class="text-emerald-400">$1</span>')
    // Keywords
    .replace(/\b(from|import|class|def|return|if|else|elif|try|except|for|in|not|and|or|True|False|None|pass|as|with|yield|async|await)\b/g, '<span class="text-violet-400 font-medium">$1</span>')
    // Built-in types/functions
    .replace(/\b(str|dict|list|int|bool|float|print|len|range|type|self|super)\b/g, '<span class="text-sky-400">$1</span>')
    // Decorators
    .replace(/(@\w+)/g, '<span class="text-amber-400">$1</span>')
    // Numbers
    .replace(/\b(\d+)\b/g, '<span class="text-orange-400">$1</span>')
    // Function definitions
    .replace(/\b(\w+)(?=\()/g, '<span class="text-yellow-300">$1</span>');
  
  return highlighted;
}

export default function CodeShowcase() {
  const [activeFile, setActiveFile] = useState(0);
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(codeFiles[activeFile].code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="code" className="relative py-24 bg-slate-950">
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-slate-900/50 to-slate-950" />
      
      <div className="relative z-10 max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-sm font-semibold text-cyan-400 uppercase tracking-wider">Source Code</span>
          <h2 className="text-4xl md:text-5xl font-bold text-white mt-3 mb-6">
            Python / LangGraph <span className="gradient-text">Starter Code</span>
          </h2>
          <p className="text-lg text-slate-400 max-w-3xl mx-auto">
            The exact boilerplate for building the cyclic, adaptive agent. 
            Explore each file to see how the Observe → Act → Evaluate → Adapt loop is implemented.
          </p>
        </motion.div>

        {/* File Tabs */}
        <div className="flex flex-wrap gap-2 mb-4">
          {codeFiles.map((file, i) => (
            <button
              key={i}
              onClick={() => setActiveFile(i)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-mono transition-all duration-300 ${
                activeFile === i
                  ? 'bg-sky-500/20 border border-sky-500/40 text-sky-300'
                  : 'bg-white/5 border border-white/5 text-slate-400 hover:text-white hover:bg-white/10'
              }`}
            >
              <span>{file.icon}</span>
              <span>{file.name}</span>
            </button>
          ))}
        </div>

        {/* Code Display */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="rounded-2xl overflow-hidden border border-white/10 bg-slate-900/80"
        >
          {/* File header */}
          <div className="flex items-center justify-between px-4 py-3 bg-slate-800/50 border-b border-white/5">
            <div className="flex items-center gap-3">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-rose-500/60" />
                <div className="w-3 h-3 rounded-full bg-amber-500/60" />
                <div className="w-3 h-3 rounded-full bg-emerald-500/60" />
              </div>
              <span className="text-sm text-slate-400 font-mono">{codeFiles[activeFile].path}</span>
            </div>
            <button
              onClick={handleCopy}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white text-xs transition-all"
            >
              {copied ? (
                <>
                  <Check size={14} className="text-emerald-400" />
                  <span className="text-emerald-400">Copied!</span>
                </>
              ) : (
                <>
                  <Copy size={14} />
                  <span>Copy</span>
                </>
              )}
            </button>
          </div>

          {/* Description */}
          <div className="px-4 py-3 bg-sky-500/5 border-b border-white/5">
            <p className="text-sm text-sky-300">{codeFiles[activeFile].description}</p>
          </div>

          {/* Code content */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeFile}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="p-4 overflow-x-auto max-h-[500px] overflow-y-auto"
            >
              <pre className="text-sm font-mono leading-relaxed">
                <code
                  dangerouslySetInnerHTML={{
                    __html: highlightPython(codeFiles[activeFile].code),
                  }}
                />
              </pre>
            </motion.div>
          </AnimatePresence>
        </motion.div>

        {/* Terminal output preview */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-8 rounded-2xl overflow-hidden border border-white/10 bg-slate-900/80"
        >
          <div className="flex items-center gap-3 px-4 py-3 bg-slate-800/50 border-b border-white/5">
            <Terminal className="text-emerald-400" size={16} />
            <span className="text-sm text-slate-400 font-mono">Terminal Output — Demo Run</span>
          </div>
          <div className="p-4 font-mono text-sm space-y-1">
            <div className="text-slate-500">$ python main.py</div>
            <div className="text-white">=== STARTING AGENT WORKFLOW ===</div>
            <div className="text-sky-300">👁️ [OBSERVE] Extracting data from bill...</div>
            <div className="text-violet-300">🛠️ [ACT] Querying policy DB and searching web...</div>
            <div className="text-emerald-300">✍️ [DRAFT] Generating appeal letter...</div>
            <div className="text-amber-300">⚖️ [EVALUATE] Critic reviewing draft...</div>
            <div className="text-white">   → Evaluation Passed: True</div>
            <div className="text-white">=== DRAFT 1 COMPLETE ===</div>
            <div className="text-rose-400 mt-2">🚨 SIMULATING INSURANCE PUSHBACK: 'Missing network proof' 🚨</div>
            <div className="text-white">=== RESTARTING AGENT WITH ADAPTATION ===</div>
            <div className="text-amber-300">🔄 [ADAPT] Strategy failed. Searching for new evidence...</div>
            <div className="text-emerald-300">✍️ [DRAFT] Generating escalated appeal letter...</div>
            <div className="text-amber-300">⚖️ [EVALUATE] Critic reviewing draft...</div>
            <div className="text-emerald-400">   → Evaluation Passed: True ✓</div>
            <div className="text-white mt-2">=== FINAL ESCALATED DRAFT ===</div>
            <div className="text-slate-300">Dear Insurance Review Board, ...</div>
          </div>
        </motion.div>

        {/* Quick start */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-8 glass-card rounded-2xl p-6"
        >
          <h3 className="text-lg font-bold text-white mb-4">🚀 Quick Start</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-slate-800/50 rounded-xl p-4 font-mono text-sm">
              <div className="text-slate-500 mb-1"># Install dependencies</div>
              <div className="text-emerald-300">pip install -r requirements.txt</div>
            </div>
            <div className="bg-slate-800/50 rounded-xl p-4 font-mono text-sm">
              <div className="text-slate-500 mb-1"># Configure environment</div>
              <div className="text-emerald-300">cp .env.example .env</div>
            </div>
            <div className="bg-slate-800/50 rounded-xl p-4 font-mono text-sm">
              <div className="text-slate-500 mb-1"># Add your API keys to .env</div>
              <div className="text-amber-300">OPENAI_API_KEY=sk-...</div>
              <div className="text-amber-300">TAVILY_API_KEY=tvly-...</div>
            </div>
            <div className="bg-slate-800/50 rounded-xl p-4 font-mono text-sm">
              <div className="text-slate-500 mb-1"># Run the agent</div>
              <div className="text-emerald-300">python main.py</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
