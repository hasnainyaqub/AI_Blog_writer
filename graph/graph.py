from langgraph.graph import StateGraph, START, END
from schema.state import BLOGState
from graph.node import outline_node, content_node

graph = StateGraph(BLOGState)

graph.add_node('outline_node', outline_node)
graph.add_node('content_node', content_node)

graph.add_edge(START, 'outline_node')
graph.add_edge('outline_node', 'content_node')
graph.add_edge('content_node', END)

workflow = graph.compile()
