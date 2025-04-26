from setuptools import setup, find_packages

setup(
    name="FastApiBackend",
    version="0.1.0",
    packages=find_packages(),
    install_requires=[
        "langchain",
        "langchain_google_genai",
        "fastapi",
        "uvicorn",
        "python-dotenv",
        "cors",
        "chromadb",
        "unstructured",
        "pypdf",
        "langchain_community",
        "sentence-transformers",
        "wheel",
    ],
)
