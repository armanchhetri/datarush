from fastapi.testclient import TestClient
import pytest
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from sqlalchemy.ext.declarative import declarative_base
from app.main import app

from app.core.config import settings
from app.database import get_db
from app.database import Base
from app.core.security import syn_create_access_token
from app.models import usermodel
from app.schemas import userschema
from app.crud import usercrud
# from alembic import command

SQLALCHEMY_DATABASE_URL = "sqlite:///./sql_app_test.db"
# SQLALCHEMY_DATABASE_URL = 'postgresql://postgres:password123@localhost:5432/fastapi_test'
# SQLALCHEMY_DATABASE_URL = f'postgresql://{settings.database_username}:{settings.database_password}@{settings.database_hostname}:{settings.database_port}/{settings.database_name}_test'


engine = create_engine(SQLALCHEMY_DATABASE_URL, connect_args={'check_same_thread': False})

TestingSessionLocal = sessionmaker(
    autocommit=False, autoflush=False, bind=engine)


@pytest.fixture()
def admin_user():
    user_in = userschema.UserCreate(
            email=settings.FIRST_SUPERUSER,
            password=settings.FIRST_SUPERUSER_PASSWORD,
            is_admin = True,
            role = usermodel.Role.ADMIN
        )

    return user_in


@pytest.fixture()
def session():
    print("my session fixture ran")
    Base.metadata.drop_all(bind=engine)
    Base.metadata.create_all(bind=engine)
    db = TestingSessionLocal()
   
    try:
        yield db
    finally:
        db.close()


@pytest.fixture()
def client(session):
    def override_get_db():
        try:
            yield session
        finally:
            session.close()
    
    app.dependency_overrides[get_db] = override_get_db
    yield TestClient(app)

@pytest.fixture
def admin_token(admin_user, session):
    try:
        _ = usercrud.create_user(session, user= admin_user, is_superuser=True)

    except Exception as E:
        print("[EXCEPTION]", E)

    token =  syn_create_access_token(admin_user.email)
    return token 



@pytest.fixture
def authorized_client(client, admin_token):
    client.headers = {
        **client.headers,
        "Authorization": f"Bearer {admin_token}"
    }
    print("authorized client is here")

    return client


@pytest.fixture
def test_user2(authorized_client):
    user_data = {"email": "arman44@gmail.com",
                 "password": "password123"}
    res = authorized_client.post("/users/", json=user_data)

    assert res.status_code == 201

    new_user = res.json()
    new_user['password'] = user_data['password']
    return new_user


@pytest.fixture
def test_user(session):
    user = userschema.UserCreate(email =  "arman@gmail.com", password = "password123")
    try:
        _ = usercrud.create_user(session, user= user)

    except Exception as E:
        print("[EXCEPTION]", E)
    
    return user.dict()




# @pytest.fixture
# def test_posts(test_user, session, test_user2):
#     posts_data = [{
#         "title": "first title",
#         "content": "first content",
#         "owner_id": test_user['id']
#     }, {
#         "title": "2nd title",
#         "content": "2nd content",
#         "owner_id": test_user['id']
#     },
#         {
#         "title": "3rd title",
#         "content": "3rd content",
#         "owner_id": test_user['id']
#     }, {
#         "title": "3rd title",
#         "content": "3rd content",
#         "owner_id": test_user2['id']
#     }]

#     def create_post_model(post):
#         return models.Post(**post)

#     post_map = map(create_post_model, posts_data)
#     posts = list(post_map)

#     session.add_all(posts)
#     # session.add_all([models.Post(title="first title", content="first content", owner_id=test_user['id']),
#     #                 models.Post(title="2nd title", content="2nd content", owner_id=test_user['id']), models.Post(title="3rd title", content="3rd content", owner_id=test_user['id'])])
#     session.commit()

#     posts = session.query(models.Post).all()
#     return posts
