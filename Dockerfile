FROM python:3.10-slim-buster

WORKDIR /app

ENV PYTHONUNBUFFERED=1 \
    PYTHONPATH=/app \
    DJANGO_SETTINGS_MODULE=fashionpedia_frontend.settings \
    PORT=8000 \
    WEB_CONCURRENCY=2

# Install system packages required Django.
RUN sudo apt-get update --yes --quiet && sudo apt-get install --yes --quiet --no-install-recommends

# Requirements are installed here to ensure they will be cached.
COPY ./requirements.txt /requirements.txt
RUN pip install -r /requirements.txt

# Copy project code
COPY . .

RUN python manage.py collectstatic --noinput --clear

# Run as non-root user
# RUN chown -R django:django /app
# USER django

EXPOSE 8000

# Run application
CMD gunicorn --bind=0.0.0.0:8000 --workers=5 --threads=5 shopping_list.wsgi:application
# CMD python manage.py runserver 0.0.0.0:8000