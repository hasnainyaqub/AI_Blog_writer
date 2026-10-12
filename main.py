from fastapi import FastAPI
from api.route import router

app = FastAPI(
    title="AI Content Writer API",
    description="API for AI-powered content generation",
    version="1.0.0",
)


@app.get("/")
async def root():
    return {'message': 'AI_Blog_Generator'}

@app.get('/health')
def health():
    return {
        "health" : 200
    }

app.include_router(router=router)