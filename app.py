"""
MediAdvocate - Streamlit Frontend
A beautiful, interactive UI for the autonomous medical billing appeal agent.
"""
import streamlit as st
import os
from dotenv import load_dotenv
from agent.graph import build_graph
from langchain_community.document_loaders import PyPDFLoader

load_dotenv()

st.set_page_config(page_title="MediAdvocate", page_icon="🏥", layout="wide")

st.title("🏥 MediAdvocate: Autonomous Appeal Agent")
st.markdown(
    "Upload your Explanation of Benefits (EOB) denial letter. The agent will autonomously "
    "gather evidence, draft an appeal, and adapt to insurance pushbacks."
)

# Initialize session state
if "app" not in st.session_state:
    st.session_state.app = build_graph()
if "draft" not in st.session_state:
    st.session_state.draft = None
if "pushback_triggered" not in st.session_state:
    st.session_state.pushback_triggered = False
if "bill_text" not in st.session_state:
    st.session_state.bill_text = None

# Sidebar for API Keys (Optional fallback if not in .env)
with st.sidebar:
    st.header("⚙️ Configuration")
    if not os.environ.get("OPENAI_API_KEY"):
        os.environ["OPENAI_API_KEY"] = st.text_input("OpenAI API Key", type="password")
    if not os.environ.get("TAVILY_API_KEY"):
        os.environ["TAVILY_API_KEY"] = st.text_input("Tavily API Key", type="password")
    st.divider()
    st.markdown(
        "**Mock Data:** Ensure you have run `python generate_mock_data.py` to create "
        "the test PDFs in the `mock_data/` folder."
    )
    st.divider()
    st.markdown("### 📋 How It Works")
    st.markdown(
        "1. **Observe**: Extracts CPT codes and denial reasons\n"
        "2. **Act**: Queries policy DB and searches web for fair pricing\n"
        "3. **Draft**: Generates a formal appeal letter\n"
        "4. **Evaluate**: Critic node reviews the draft\n"
        "5. **Adapt**: If pushback occurs, finds new evidence and regenerates"
    )

# File Upload
uploaded_file = st.file_uploader("Upload EOB Denial PDF", type=["pdf"])

if uploaded_file:
    # Save uploaded file temporarily
    temp_path = "temp_upload.pdf"
    with open(temp_path, "wb") as f:
        f.write(uploaded_file.getbuffer())

    # Extract text
    loader = PyPDFLoader(temp_path)
    bill_text = loader.load()[0].page_content
    st.session_state.bill_text = bill_text

    st.subheader("📄 Extracted Bill Text")
    st.info(bill_text[:500] + "...")

    if st.button("🚀 Start Autonomous Appeal", type="primary"):
        with st.spinner("Agent is observing, deciding, and acting..."):
            initial_state = {"bill_text": bill_text, "iteration_count": 0}

            # Stream the graph execution
            logs_placeholder = st.empty()
            logs = []

            for output in st.session_state.app.stream(initial_state):
                for node_name, node_state in output.items():
                    log_msg = f"✅ **[{node_name.upper()}]** completed."
                    if node_name == "observe":
                        log_msg += f" Extracted CPT: `{node_state.get('cpt_code')}`"
                    elif node_name == "act":
                        log_msg += " Queried Policy DB and Web Search."
                    elif node_name == "draft":
                        log_msg += f" Generated Draft {node_state.get('iteration_count')}."
                    elif node_name == "evaluate":
                        log_msg += " Critic reviewed the draft."

                    logs.append(log_msg)
                    logs_placeholder.markdown("\n".join(logs))

            final_state = st.session_state.app.get_state(initial_state).values
            st.session_state.draft = final_state.get("draft_letter")

# Display Draft
if st.session_state.draft:
    st.divider()
    st.subheader("✍️ Draft Appeal Letter")
    st.write(st.session_state.draft)

    # Simulate Pushback Button
    if not st.session_state.pushback_triggered:
        if st.button(
            "🚨 Simulate Insurance Pushback ('Missing Network Proof')",
            type="secondary",
        ):
            st.session_state.pushback_triggered = True
            with st.spinner("Agent is adapting to new constraints..."):
                # Re-run graph with pushback state
                current_state = {
                    "bill_text": st.session_state.bill_text,
                    "draft_letter": st.session_state.draft,
                    "pushback_reason": "Missing network proof",
                    "iteration_count": 1,
                }

                logs_placeholder = st.empty()
                logs = [
                    "🚨 **PUSHBACK RECEIVED:** Insurance denied Draft 1. Agent adapting..."
                ]
                logs_placeholder.markdown("\n".join(logs))

                for output in st.session_state.app.stream(current_state):
                    for node_name, node_state in output.items():
                        if node_name == "adapt":
                            logs.append(
                                "🔄 **[ADAPT]** Searched local hospital directory for network proof."
                            )
                        elif node_name == "draft":
                            logs.append(
                                f"✍️ **[DRAFT]** Regenerated escalated Draft {node_state.get('iteration_count')} with new evidence."
                            )
                        logs_placeholder.markdown("\n".join(logs))

                final_state = st.session_state.app.get_state(current_state).values
                st.session_state.draft = final_state.get("draft_letter")
                st.rerun()
    else:
        st.success(
            "🎉 **Final Escalated Draft Ready!** The agent successfully adapted and found the missing network proof."
        )
        st.balloons()
