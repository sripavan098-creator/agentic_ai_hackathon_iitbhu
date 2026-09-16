"""
MediAdvocate - CLI Entry Point
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
        "bill_text": (
            "Patient: Alex Mercer. Member ID: XYZ-987-654321. "
            "Provider: Mercy General Hospital - Radiology Dept. "
            "Date of Service: August 28, 2026. "
            "Procedure: MRI Brain without Contrast. "
            "CPT Code: 70553. Billed Amount: $2,450.00. "
            "Status: DENIED - CO-45 - Out-of-network provider/facility."
        ),
        "iteration_count": 0,
    }

    print("=" * 60)
    print("🏥 MEDICADVOCATE - AUTONOMOUS APPEAL AGENT")
    print("=" * 60)
    print("\n=== PHASE 1: INITIAL APPEAL ===\n")

    # Run the graph until it hits END
    for output in app.stream(initial_state):
        for node_name, node_state in output.items():
            if node_name == "observe":
                print(f"   → CPT: {node_state.get('cpt_code')}")
                print(f"   → Denial: {node_state.get('denial_reason')}")
            elif node_name == "draft":
                print(f"   → Draft #{node_state.get('iteration_count')} generated")

    final_state = app.get_state(initial_state).values
    print("\n" + "-" * 60)
    print("📝 DRAFT 1:")
    print("-" * 60)
    print(final_state.get("draft_letter", "No draft generated"))

    # --- SIMULATE INSURANCE PUSHBACK ---
    print("\n" + "=" * 60)
    print("🚨 SIMULATING INSURANCE PUSHBACK")
    print("   Reason: 'Missing network proof'")
    print("=" * 60)
    print("\n=== PHASE 2: ADAPTATION & ESCALATION ===\n")

    # Update state with pushback and run again
    pushed_back_state = {
        "bill_text": initial_state["bill_text"],
        "draft_letter": final_state.get("draft_letter"),
        "pushback_reason": "Missing network proof",
        "iteration_count": final_state.get("iteration_count", 1),
    }

    for output in app.stream(pushed_back_state):
        for node_name, node_state in output.items():
            if node_name == "adapt":
                print("   → Found hospital directory proof!")
            elif node_name == "draft":
                print(f"   → Escalated Draft #{node_state.get('iteration_count')} generated")

    escalated_state = app.get_state(pushed_back_state).values
    print("\n" + "-" * 60)
    print("📝 FINAL ESCALATED DRAFT:")
    print("-" * 60)
    print(escalated_state.get("draft_letter"))
    print("\n" + "=" * 60)
    print("✅ Agent successfully adapted to insurance pushback!")
    print("=" * 60)


if __name__ == "__main__":
    run_demo()
