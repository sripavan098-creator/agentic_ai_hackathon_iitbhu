# 🏥 MediAdvocate: Autonomous Medical Billing & Insurance Appeal Agent

[![Python 3.10+](https://img.shields.io/badge/python-3.10+-blue.svg)](https://www.python.org/downloads/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Hackathon](https://img.shields.io/badge/Hackathon-Tech%20Zephyr%204.0-orange)](https://techzephyr.iitbbs.ac.in/)

> **Tagline:** Empowering patients with an autonomous AI paralegal to fight medical billing errors and insurance claim denials.

---

## ⚠️ SECURITY & COMPLIANCE WARNING
**DO NOT commit API keys, passwords, tokens, or confidential credentials to this repository.**  
This project uses a `.env` file for local configuration. The `.env` file is explicitly listed in `.gitignore`. If you are a judge or contributor, you must provide your own API keys to run this project locally.

---

## 📄 Problem & Solution Brief

### The Problem
Up to 80% of hospital bills contain errors, and 15–20% of legitimate insurance claims are initially denied. Patients lack the expertise to decode complex CPT/ICD-10 codes, cross-reference dense insurance policies, and navigate bureaucratic appeals, resulting in billions of dollars in unjustified medical debt.

### The Agentic Solution
MediAdvocate is not a simple chatbot. It is an **agentic system** that follows a strict `Observe → Decide → Act → Evaluate → Adapt` loop:
1. **Observe**: Ingests medical bills and Explanation of Benefits (EOB) denial letters.
2. **Decide & Act**: Extracts codes, queries a Vector DB of the user's specific insurance policy, and searches the web for fair-market pricing.
3. **Evaluate**: A dedicated "Critic" node reviews the drafted appeal against a strict legalistic rubric.
4. **Adapt**: If the draft fails evaluation or encounters a simulated pushback (e.g., "Missing network proof"), the agent dynamically alters its plan, searches for the missing evidence, and regenerates a stronger, escalated appeal.

---

## 🏗️ System Architecture

MediAdvocate is built on a cyclic **LangGraph** architecture, enabling true multi-step reasoning and recovery from failures.

```mermaid
graph TD
    classDef user fill:#e1f5fe,stroke:#01579b,stroke-width:2px;
    classDef agent fill:#fff3e0,stroke:#e65100,stroke-width:2px;
    classDef tool fill:#e8f5e9,stroke:#1b5e20,stroke-width:2px;
    classDef memory fill:#f3e5f5,stroke:#4a148c,stroke-width:2px;
    classDef failure fill:#ffebee,stroke:#b71c1c,stroke-width:2px;

    User([👤 User: Uploads Bill/EOB PDF]) ::: user -->|1. Goal: Appeal Denial| Controller
    Controller((🧠 Agentic Controller<br/>LangGraph ReAct Loop)) ::: agent
    
    StateMemory[(🗄️ State Memory<br/>- Extracted Codes<br/>- Policy Clauses<br/>- Draft Iterations)] ::: memory
    Controller <-->|Read/Write State| StateMemory

    Controller -->|2. Extract Text| OCR_Tool[📄 Document Parser<br/>Unstructured.io] ::: tool
    Controller -->|3. Lookup Policy| VectorDB_Tool[🔍 Vector DB Retriever<br/>ChromaDB] ::: tool
    Controller -->|4. Market Price Check| Search_Tool[🌐 Web Search API<br/>Tavily] ::: tool
    Controller -->|5. Draft Letter| LLM_Tool[✍️ LLM Drafting Node<br/>GPT-4o / Claude 3.5] ::: tool

    LLM_Tool -->|6. Submit Draft| CriticNode{⚖️ Evaluation Node<br/>Checks Appeal Rubric} ::: agent
    CriticNode -->|7a. Passes| FinalOutput
    CriticNode -->|7b. Fails / Missing Info| Controller

    CriticNode -.->|8. Simulated Pushback:<br/>'Denied: Need network proof'| AdaptationNode[🔄 Adaptation Protocol:<br/>Pivots search to Hospital Directory] ::: failure
    AdaptationNode -->|9. New Search Query| Search_Tool
    AdaptationNode -->|10. Update Plan| Controller

    FinalOutput([✅ Final Outcome:<br/>Polished, Cited Appeal Letter]) ::: user
```

---

## 🛠️ Tech Stack

| Component | Technology |
| :--- | :--- |
| **Agent Framework** | LangGraph (for cyclic, adaptive workflows) |
| **LLM** | OpenAI GPT-4o / Anthropic Claude 3.5 Sonnet |
| **Document Parsing** | Unstructured.io / LlamaParse |
| **Vector Database** | ChromaDB (Local, lightweight) |
| **Web Search** | Tavily API (Agentic-optimized search) |
| **Frontend** | Streamlit |
| **Environment** | Python 3.10+, `python-dotenv` |

---

## 🚀 Setup & Installation

Follow these steps to run MediAdvocate locally.

### 1. Clone the Repository
```bash
git clone https://github.com/YOUR_USERNAME/mediadvocate.git
cd mediadvocate
```

### 2. Create a Virtual Environment
```bash
python -m venv venv
source venv/bin/activate  # On Windows use: venv\Scripts\activate
```

### 3. Install Dependencies
```bash
pip install -r requirements.txt
```

### 4. Configure Environment Variables
Create a `.env` file in the root directory by copying the example:
```bash
cp .env.example .env
```

Open `.env` and add your API keys. **Example:**
```env
# LLM API Keys (Provide at least one)
OPENAI_API_KEY=your_openai_key_here
ANTHROPIC_API_KEY=your_anthropic_key_here

# Tool API Keys
TAVILY_API_KEY=your_tavily_key_here

# Optional: Local DB Path
CHROMA_DB_PATH=./chroma_db
```
> 🔒 **Reminder:** Never commit this `.env` file to GitHub. It is protected by `.gitignore`.

---

## 💻 How to Run

### Option A: Local Streamlit App (Recommended for Demo)
```bash
streamlit run app.py
```
*This will open a local web interface at `http://localhost:8501` where you can upload mock PDFs and watch the agent execute its workflow in real-time.*

### Option B: Command Line Execution (For Testing Agent Logic)
```bash
python main.py --input_path ./mock_data/sample_denial.pdf --policy_path ./mock_data/sample_policy.pdf
```

---

## 📂 Project Structure

```text
mediadvocate/
├── app.py                  # Streamlit frontend UI
├── main.py                 # CLI entry point for agent execution
├── requirements.txt        # Python dependencies
├── .env.example            # Template for environment variables
├── .gitignore              # Ensures .env and local DBs are not committed
├── agent/
│   ├── graph.py            # LangGraph state machine definition
│   ├── nodes.py            # Individual agent nodes (Observe, Act, Evaluate, Adapt)
│   └── tools.py            # Tool definitions (Tavily, Chroma, OCR)
├── mock_data/              # Sample PDFs for testing (Fake bill, fake EOB, fake policy)
└── README.md               # This file
```

---

## 🎬 Demo & Deployment

- **📺 Demo Video**: [Link to your 3-5 minute YouTube/Loom video here]  
  *(Watch the agent encounter a simulated insurance pushback and autonomously adapt its strategy!)*
- **🌐 Live Deployment**: [Link to your Streamlit Cloud / Render / Hugging Face Space here]  
  *(Note: If using a free tier, the first load may take 30-60 seconds to wake up).*

---

## 👥 Team Members

- **[Your Name]** – Role (e.g., Agent Architecture & Backend)
- **[Teammate Name]** – Role (e.g., Frontend & UI/UX)
- **[Teammate Name]** – Role (e.g., Prompt Engineering & Evaluation)

---

## ⚖️ Disclaimer
MediAdvocate is a **proof-of-concept** built for the Tech Zephyr 4.0 Hackathon. It is not a substitute for professional legal or medical billing advice. All "mock data" provided in this repository is entirely fictional and generated for demonstration purposes only.

---
*Built with ❤️ for Tech Zephyr 4.0 | IIT Bhubaneswar*
