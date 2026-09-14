"""
MediAdvocate Agent Nodes
The logic for each step: Observe, Act, Draft, Evaluate, Adapt.
"""
from langchain_openai import ChatOpenAI
from langchain_core.messages import HumanMessage, SystemMessage
from .state import AgentState
from .tools import search_web, query_policy_db

llm = ChatOpenAI(model="gpt-4o", temperature=0)


def observe_node(state: AgentState) -> dict:
    """Extracts CPT code and denial reason from the raw bill text."""
    print("👁️ [OBSERVE] Extracting data from bill...")
    # In reality, use an LLM or regex to extract this from state['bill_text']
    prompt = f"Extract the CPT code and denial reason from this text: {state['bill_text']}. Return as JSON."
    response = llm.invoke([HumanMessage(content=prompt)])

    # Mocking extraction for reliability in demo
    return {
        "cpt_code": "70553",
        "denial_reason": "Out of network facility"
    }


def act_node(state: AgentState) -> dict:
    """Gathers evidence using tools."""
    print("🛠️ [ACT] Querying policy DB and searching web...")
    cpt = state.get("cpt_code", "70553")

    policy = query_policy_db(cpt)
    price = search_web(f"fair market price CPT {cpt} zip code 90210")

    return {
        "policy_clauses": policy,
        "market_price": price
    }


def draft_node(state: AgentState) -> dict:
    """Drafts the appeal letter."""
    print("✍️ [DRAFT] Generating appeal letter...")
    context = f"CPT: {state['cpt_code']}, Denial: {state['denial_reason']}, Policy: {state['policy_clauses']}, Price: {state['market_price']}"
    if state.get("adaptation_search_results"):
        context += f", New Evidence: {state['adaptation_search_results']}"

    prompt = f"Draft a formal medical appeal letter based on this context: {context}. Cite the policy."
    response = llm.invoke([HumanMessage(content=prompt)])

    return {"draft_letter": response.content}


def evaluate_node(state: AgentState) -> dict:
    """Critic node: Checks if the draft is good enough."""
    print("⚖️ [EVALUATE] Critic reviewing draft...")
    prompt = f"Does this letter cite a policy page and sound professional? Yes or No. Letter: {state['draft_letter']}"
    response = llm.invoke([HumanMessage(content=prompt)])

    passed = "yes" in response.content.lower()
    print(f"   -> Evaluation Passed: {passed}")
    return {"evaluation_passed": passed}


def adapt_node(state: AgentState) -> dict:
    """Triggered when evaluation fails OR insurance pushes back."""
    print("🔄 [ADAPT] Strategy failed. Searching for new evidence...")
    # Simulate adapting to the "missing network proof" pushback
    new_evidence = search_web("Mercy Hospital network participation directory proof")
    return {
        "adaptation_search_results": new_evidence,
        "evaluation_passed": False  # Reset to force re-drafting
    }


# --- Routing Logic (The "Decide" step) ---
def should_adapt_or_finish(state: AgentState) -> str:
    """Decides whether to finish, or loop back to adapt."""
    if state.get("evaluation_passed"):
        # If we have a pushback reason (simulated externally), force adaptation anyway for the demo
        if state.get("pushback_reason"):
            return "adapt"
        return "finish"
    return "adapt"
