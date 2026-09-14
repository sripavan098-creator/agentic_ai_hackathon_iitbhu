"""
MediAdvocate Agent State Definition
Defines the agent's memory structure as it moves through the workflow loop.
"""
from typing import TypedDict, List, Annotated, Optional
import operator


class AgentState(TypedDict):
    # Input
    bill_text: str

    # Extracted Data
    cpt_code: Optional[str]
    denial_reason: Optional[str]

    # Evidence Gathered
    policy_clauses: Optional[str]
    market_price: Optional[str]

    # Draft & Evaluation
    draft_letter: Optional[str]
    evaluation_feedback: Optional[str]

    # Adaptation / Failure Handling
    pushback_reason: Optional[str]
    adaptation_evidence: Optional[str]

    # Iteration tracking
    iteration_count: int

    # Message history for the LLM
    messages: Annotated[List, operator.add]
