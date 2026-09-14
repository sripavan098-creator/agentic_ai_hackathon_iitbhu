"""
MediAdvocate Agent Graph
Wires all nodes together into a cyclic LangGraph state machine.
"""
from langgraph.graph import StateGraph, END
from .state import AgentState
from .nodes import (
    observe_node,
    act_node,
    draft_node,
    evaluate_node,
    adapt_node,
    should_adapt_or_finish,
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
            "adapt": "adapt",  # Loop back if evaluation fails or pushback occurs
            "finish": END,     # Exit if successful
        },
    )

    # After adapting, go back to drafting with new evidence
    workflow.add_edge("adapt", "draft")

    return workflow.compile()
