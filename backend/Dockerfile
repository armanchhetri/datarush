# 
FROM tiangolo/uvicorn-gunicorn-fastapi:python3.8

# 
WORKDIR /code

# 
COPY ./requirements.txt /code/requirements.txt

# 
RUN pip install --no-cache-dir --upgrade -r /code/requirements.txt

# 
COPY ./app /code/app
COPY ./static /code/static
COPY ./static /code/
COPY ./alembic /code/alembic
COPY ./alembic.ini /code/alembic.ini
COPY ./.env /code/.env

RUN chmod +x /code/prestart.sh
# RUN ./prestart.sh

EXPOSE 8000
# 
CMD ["uvicorn", "app.main:app", "--proxy-headers", "--host", "0.0.0.0", "--port", "80"]
