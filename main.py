"""
MediAdvocate - Main Entry Point
Runs the agentic workflow demo with simulated insurance pushback.
"""
import os
from dotenv import load_dotenv
from agent.graph import build_graph

load_dotenv()


def run_demo():
    """Runs the complete MediAdvocate agent workflow demo."""
    app = build_graph()

    # Initial State
    initial_state = {
        "user_prompt": "Appeal my denied MRI.",
        "bill_text": (
            "Patient: John Doe. Service: MRI Brain (CPT 70553). "
            "Cost: $2500. Status: DENIED - Out of network."
        ),
        "pushback_reason": "",  # Empty initially
    }

    print("=== STARTING AGENT WORKFLOW ===")

    # Run the graph until it hits END or adapts
    # We use stream to see the logs in real-time
    for output in app.stream(initial_state):
        for node_name, node_state in output.items():
            pass  # Logs are handled inside the nodes

    print("\n=== DRAFT 1 COMPLETE ===")
    print(
        app.get_state(initial_state).values.get(
            "draft_letter", "No draft generated"
        )
    )

    # --- SIMULATE INSURANCE PUSHBACK (The Hackathon "Wow" Moment) ---
    print("\n🚨 SIMULATING INSURANCE PUSHBACK: 'Missing network proof' 🚨")

    # Update state with pushback and run again
    pushed_back_state = app.get_state(initial_state).values
    pushed_back_state["pushback_reason"] = "Missing network proof"
    pushed_back_state["evaluation_passed"] = False  # Force the loop

    print("=== RESTARTING AGENT WITH ADAPTATION ===")
    for output in app.stream(pushed_back_state):
        pass

    final_state = app.get_state(pushed_back_state).values
    print("\n=== FINAL ESCALATED DRAFT ===")
    print(final_state.get("draft_letter"))


if __name__ == "__main__":
    run_demo()
