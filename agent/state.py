"""
MediAdvocate Agent State Definition
Defines the agent's memory structure as it moves through the workflow loop.
"""
from typing import TypedDict, List, Annotated
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
    messages: Annotated[List, operator.add]
