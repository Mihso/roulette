FROM python:3.10-bullseye
RUN python -m pip install --upgrade pip
WORKDIR /app

# Copy the top-level files in your service's directory
# Modify these instructions to do that
COPY requirements.txt requirements.txt
COPY manage.py manage.py

# Copy all of the subdirectories in your service's directory
# Modify these instructions to do that
COPY backend backend
COPY backend_api backend_api
COPY common common

RUN pip install -r requirements.txt
CMD python manage.py makemigrations && python manage.py migrate && gunicorn backend.wsgi --log-file -