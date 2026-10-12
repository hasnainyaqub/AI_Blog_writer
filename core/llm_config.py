from langchain_groq import ChatGroq
from dotenv import load_dotenv

load_dotenv()

llm = ChatGroq(
    model='openai/gpt-oss-120b',
     temperature=0.5
)

llm_content = ChatGroq(
    model='openai/gpt-oss-20b',
    temperature=0.5, 
    max_tokens=1500
)