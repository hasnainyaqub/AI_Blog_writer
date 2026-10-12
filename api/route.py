from fastapi import APIRouter, HTTPException

from schema.input import BlogRequest
from graph.graph import workflow

router = APIRouter(
    prefix='/api',
    tags= ['Content Generation']
)

@router.post("/ai-blog-writer")
def ai_blog_writer(request: BlogRequest):
    try: 
        results = workflow.invoke(
            {'title':request.title}
        )
        return {
            'title': request.title,
            'results' : results
        }
    except Exception as e: 
        raise HTTPException(status_code=500, detail=str(e))