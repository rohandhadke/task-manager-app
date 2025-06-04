import sys
import os
import pytest
from fastapi.testclient import TestClient

sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
from main import app

client = TestClient(app)

test_user = {
    "username": "testuser",
    "email": "testuser@example.com",
    "password": "newsecurepass"
}

def test_register_user():
    res = client.post("/register", json=test_user)
    assert res.status_code in [201, 400]  # Already exists = 400

def test_login_user():
    res = client.post("/login", data={
        "username": test_user["username"],
        "password": test_user["password"]
    })
    assert res.status_code == 200

def test_update_profile():
    login = client.post("/login", data={
        "username": test_user["username"],
        "password": test_user["password"]
    })
    token = login.json()["access_token"]

    response = client.put("/profile",
        headers={"Authorization": f"Bearer {token}"},
        json={"name": "Updated User", "email": "newemail@example.com"}
    )
    assert response.status_code == 200
    assert response.json()["email"] == "newemail@example.com"

def test_change_password():
    login = client.post("/login", data={
        "username": test_user["username"],
        "password": test_user["password"]
    })
    token = login.json()["access_token"]

    response = client.put("/update-password",
        headers={"Authorization": f"Bearer {token}"},
        json={
            "old_password": test_user["password"],
            "new_password": "newsecurepass"
        }
    )
    assert response.status_code == 200
    assert response.json()["message"] == "Password updated successfully"
