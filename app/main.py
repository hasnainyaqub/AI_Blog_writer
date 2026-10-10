from fastapi import FastAPI, HTTPException
from pydantic import BaseModel

from app.code import workflow

class BlogRequest(BaseModel):
    title : str

app = FastAPI(title='AI_Blog_Generator', docs_url="/documentation", redoc_url="/redocumentation")

@app.get("/")
async def root():
    return {'message': 'AI_Blog_Generator'}

@app.post("/ai-blog-writer")
def ai_blog_writer(request : BlogRequest):
    try:
        results = workflow.invoke(
            {"title": request.title}
        )
        return {
            'title': request.title,
            'results': results
        }

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))