from typing import TypedDict
from langgraph.graph import START, StateGraph, END
from langchain_groq import ChatGroq
from dotenv import load_dotenv
load_dotenv()

llm = ChatGroq(model='openai/gpt-oss-20b', temperature=1)
llm_content = ChatGroq(model='openai/gpt-oss-120b', temperature=1)

# define State
class BLOGState(TypedDict):
    title : str
    outline : str
    content : str

def outline_node(state: BLOGState) -> BLOGState:

    title = state['title']
    prompt = (f'''
    You are an expert content strategist and writer.

    I will give you a title/topic. Create a clear, logical, and comprehensive outline for the content.

    Title: {title}

    Requirements:

    * Identify the main purpose and search intent behind the title.
    * Define the target audience based on the topic.
    * Create a logical structure that flows naturally from introduction to conclusion.
    * Include an engaging introduction section.
    * Break the main topic into relevant H2 sections.
    * Add useful H3 subsections under H2s where appropriate.
    * Cover important questions, concepts, examples, benefits, drawbacks, practical tips, and related points when relevant.
    * Avoid unnecessary or repetitive sections.
    * Make the outline comprehensive enough to support a detailed, high-quality article.
    * Arrange sections in the order that makes the most sense for the reader.
    * Include a brief description of what should be covered in each section.
    * If the topic is suitable for SEO, naturally include relevant subtopics and related search queries without keyword stuffing.

    Output format:

    # [Title]

    ## Introduction

    * What the introduction should cover

    ## H2: [Main Section]

    * Key points to discuss
    * Important details/examples

    ### H3: [Subsection]

    * Key points to discuss

    ## H2: [Main Section]

    * Key points to discuss

    ## Conclusionz

    * What the conclusion should summarize
    * Final takeaway or recommendation

    Do not write the full article. Only provide the outline.
    Important rule: 
        result will be less then 1000 tokens.
        

    ''')
    response = llm.invoke(prompt).content
    state['outline'] = response
    return state

def content_node(state: BLOGState) -> BLOGState:

    title = state['title']
    outline = state['outline']

    prompt = f'''
        You are an expert writer and subject-matter researcher.

    Using the outline below, write a complete, original, well-structured piece of content.

    Title: {title}

    Outline:
    [{outline}]

    Requirements:

    * Follow the outline closely, but expand each section naturally.
    * Write for the intended target audience.
    * Start with a strong, engaging introduction that clearly explains what the reader will learn.
    * Use clear H2 and H3 headings matching the outline.
    * Explain concepts thoroughly but avoid unnecessary repetition or filler.
    * Use simple, natural, and easy-to-understand language.
    * Provide practical examples wherever they improve understanding.
    * Use short paragraphs for readability.
    * Use bullet points or numbered lists when they make information easier to understand.
    * Maintain a logical flow between sections.
    * Include useful details, insights, and actionable advice.
    * Do not make unsupported claims or invent statistics, studies, quotes, or sources.
    * Keep the writing natural and human-sounding rather than robotic or formulaic.
    * Avoid excessive keyword repetition or obvious SEO stuffing.
    * Answer the reader's likely questions throughout the content.
    * End with a concise conclusion that reinforces the main takeaway.
    * Do not mention that you are an AI.
    * Do not mention these instructions or the outline-generation process.

    Before writing, silently identify any gaps or inconsistencies in the outline and resolve them in the most logical way.

    Output only the finished content.

    '''
    response = llm_content.invoke(prompt).content
    state['content'] = response
    return state

# Graph
graph = StateGraph(BLOGState)

graph.add_node('outline_node', outline_node)
graph.add_node('content_node', content_node)

graph.add_edge(START, 'outline_node')
graph.add_edge('outline_node', 'content_node')
graph.add_edge('content_node', END)

workflow = graph.compile()

