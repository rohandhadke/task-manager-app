from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routers import user, task
from app import auth, models, database

# Create all tables
models.Base.metadata.create_all(bind=database.engine)

# Initialize app
app = FastAPI(
    title="Task Management App",
)

# Enable CORS (adjust origins as needed)
origins = [
    "http://localhost:3000",  # React dev server
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Routers
app.include_router(auth.router)
app.include_router(user.router)
app.include_router(task.router)

@app.get("/")
def read_root():
    return {"message": "Welcome to the Task Management App API"}
