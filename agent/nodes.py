"""
MediAdvocate Agent Nodes
The logic for each step: Observe, Act, Draft, Evaluate, Adapt.
"""
import json
from langchain_openai import ChatOpenAI
from langchain_core.messages import HumanMessage
from .state import AgentState
from .tools import search_web, query_policy_db, search_local_directory

llm = ChatOpenAI(model="gpt-4o", temperature=0)


def observe_node(state: AgentState) -> dict:
    """Extracts CPT code and denial reason from the raw bill text."""
    print("👁️ [OBSERVE] Extracting data from bill...")
    prompt = f"""Extract the CPT code and denial reason from this medical bill text. 
    Return ONLY a JSON object with keys 'cpt_code' and 'denial_reason'.
    Text: {state['bill_text']}"""

    response = llm.invoke([HumanMessage(content=prompt)])

    # Simple JSON parsing fallback for demo stability
    try:
        # Clean up markdown code blocks if present
        clean_res = response.content.replace("```json", "").replace("```", "").strip()
        data = json.loads(clean_res)
        return {
            "cpt_code": data.get("cpt_code", "70553"),
            "denial_reason": data.get("denial_reason", "Out of network"),
        }
    except Exception:
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
    context = f"CPT: {state.get('cpt_code')}, Denial: {state.get('denial_reason')}, Policy: {state.get('policy_clauses')}, Price: {state.get('market_price')}"
    if state.get("adaptation_evidence"):
        context += f", NEW EVIDENCE FOUND: {state['adaptation_evidence']}"

    prompt = f"""Draft a formal, professional medical appeal letter to the insurance company based on this context: {context}.
    Cite the specific policy page if available. Keep it under 200 words."""
    response = llm.invoke([HumanMessage(content=prompt)])

    new_count = state.get("iteration_count", 0) + 1
    return {"draft_letter": response.content, "iteration_count": new_count}


def evaluate_node(state: AgentState) -> dict:
    """Critic node: Checks if the draft is good enough."""
    print("⚖️ [EVALUATE] Critic reviewing draft...")
    prompt = f"""Review this medical appeal letter. Does it cite a policy page and sound professional? 
    Provide a short feedback. Letter: {state['draft_letter']}"""
    response = llm.invoke([HumanMessage(content=prompt)])
    return {"evaluation_feedback": response.content}


def adapt_node(state: AgentState) -> dict:
    """Triggered when insurance pushes back. Searches for new evidence."""
    print("🔄 [ADAPT] Strategy failed. Searching for new evidence...")
    # Search the local hospital directory for network proof
    new_evidence = search_local_directory("Mercy General Hospital network status proof")
    return {"adaptation_evidence": new_evidence}


# --- Routing Logic ---
def should_adapt_or_finish(state: AgentState) -> str:
    """Decides whether to finish, or loop back to adapt."""
    # If we have a pushback reason, force adaptation
    if state.get("pushback_reason"):
        return "adapt"
    # If iteration count is high, just finish to prevent infinite loops
    if state.get("iteration_count", 0) >= 2:
        return "finish"
    return "finish"
