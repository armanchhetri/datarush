from attr import attr
import pytest
from jose import jwt
from app.schemas import userschema

from app.core.config import settings



def test_create_user(authorized_client):
    res = authorized_client.post(
        "/users/", json={"email": "hello123@gmail.com", "password": "password123","role": "BASIC"})
    # print(res.json())

    new_user = userschema.User(**res.json())
    assert new_user.email == "hello123@gmail.com"
    assert new_user.role == "BASIC"
    assert res.status_code == 200


def test_update_user(test_user, authorized_client):   
    res = authorized_client.put(
        "/users/admin/update-user", json={"email": test_user["email"], "password": "password","role": "LAB"})

    new_user = userschema.User(**res.json())
    assert new_user.email == test_user['email']
    assert new_user.role == "LAB"
    assert res.status_code == 200

def test_update_user_fail(test_user, client):   
    res = client.put(
        "/users/admin/update-user", json={"email": test_user["email"], "password": "password","role": "LAB"})

    print(res.json())

    assert res.status_code == 401


def test_get_user(test_user, client):
    res = client.get("/users/")
    assert len(res.json()) == 1
    assert res.status_code == 200
    assert res.json()[0]["email"] == test_user['email']

def test_login_user(test_user, client):
    res = client.post(
        "/token", data={"username": test_user['email'], "password": test_user['password']})
    login_res = userschema.Token(**res.json())
    print(login_res)

    payload = jwt.decode(login_res.access_token, settings.SECRET_KEY, algorithms=[settings.ALGORITHM])
    email: str = payload.get("sub")
    assert email == test_user['email']
    assert login_res.token_type == "bearer"
    assert res.status_code == 200


@pytest.mark.parametrize("email, password, status_code", [
    ('wrongemail@gmail.com', 'password123', 401),
    ('arman@gmail.com', 'wrongpassword', 401),
    ('wrongemail@gmail.com', 'wrongpassword', 401),
    (None, 'password123', 422),
    ('arman@gmail.com', None, 422)
])
def test_incorrect_login(test_user, client, email, password, status_code):
    res = client.post(
        "/token", data={"username": email, "password": password})

    assert res.status_code == status_code
