from schema.state import BLOGState
from core.llm_config import llm, llm_content
from prompt.outline_prompt import prompt_outline
from prompt.content_prompt import prompt_content

def outline_node(state: BLOGState) -> BLOGState:

    prompt = prompt_outline

    response = llm.invoke(prompt).content
    state['outline'] = response
    return state

def content_node(state: BLOGState) -> BLOGState:

    title = state['title']
    outline = state['outline']

    prompt = prompt_content
    response = llm_content.invoke(prompt).content
    state['content'] = response
    return state