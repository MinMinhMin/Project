# Use Python 3.11.5 slim base image for smaller footprint
FROM python:3.11.5-slim

# Set working directory
WORKDIR /app

# Copy requirements file
COPY requirements.txt .

# Install dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Copy source code
COPY src/ .

# Expose FastAPI port
EXPOSE 8000

# Start FastAPI server with uvicorn
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]