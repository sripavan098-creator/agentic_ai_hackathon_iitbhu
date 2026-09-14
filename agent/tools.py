"""
MediAdvocate Agent Tools
External systems the agent can call: Web Search and Vector DB.
"""
import os
from tavily import TavilyClient
import chromadb

# Initialize clients (ensure keys are in .env)
tavily_client = TavilyClient(api_key=os.environ.get("TAVILY_API_KEY"))
chroma_client = chromadb.Client()  # Using local in-memory for demo


def search_web(query: str) -> str:
    """Searches the web for fair market prices or hospital directories."""
    response = tavily_client.search(query=query, search_depth="basic")
    return response["results"][0]["content"] if response["results"] else "No results found."


def query_policy_db(cpt_code: str) -> str:
    """Queries the vector DB for the user's specific insurance policy."""
    # In a real app, you'd load the user's PDF into ChromaDB first.
    # For the hackathon demo, we can mock this or use a pre-loaded collection.
    try:
        collection = chroma_client.get_collection(name="insurance_policies")
        results = collection.query(
            query_texts=[f"coverage rules for CPT {cpt_code}"], n_results=1
        )
        return results["documents"][0][0]
    except Exception:
        return (
            "Policy clause: MRI scans are covered if medically necessary and "
            "facility is in-network (Page 42)."
        )
