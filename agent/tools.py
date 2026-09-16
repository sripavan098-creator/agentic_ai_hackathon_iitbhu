"""
MediAdvocate Agent Tools
External systems the agent can call: Web Search, Vector DB, Local Directory.
"""
import os
from tavily import TavilyClient
from langchain_community.document_loaders import PyPDFLoader
from langchain_community.vectorstores import Chroma
from langchain_openai import OpenAIEmbeddings

# Initialize clients (ensure keys are in .env)
tavily_client = TavilyClient(api_key=os.environ.get("TAVILY_API_KEY"))
embeddings = OpenAIEmbeddings()


def search_web(query: str) -> str:
    """Searches the web for fair market prices or hospital directories."""
    try:
        response = tavily_client.search(query=query, search_depth="basic")
        return response["results"][0]["content"] if response["results"] else "No results found."
    except Exception as e:
        return f"Web search failed: {str(e)}"


def query_policy_db(cpt_code: str) -> str:
    """Queries the vector DB for the user's specific insurance policy."""
    try:
        # Load and index the mock policy PDF on the fly for the demo
        loader = PyPDFLoader("mock_data/insurance_policy.pdf")
        docs = loader.load()
        db = Chroma.from_documents(docs, embeddings)
        results = db.similarity_search(f"coverage rules for CPT {cpt_code}", k=1)
        return results[0].page_content if results else "Policy clause not found."
    except Exception as e:
        return f"Policy DB query failed: {str(e)}"


def search_local_directory(query: str) -> str:
    """Searches the local hospital directory PDF for network proof."""
    try:
        loader = PyPDFLoader("mock_data/hospital_directory.pdf")
        docs = loader.load()
        db = Chroma.from_documents(docs, embeddings)
        results = db.similarity_search(query, k=1)
        return results[0].page_content if results else "Directory proof not found."
    except Exception as e:
        return f"Directory search failed: {str(e)}"
