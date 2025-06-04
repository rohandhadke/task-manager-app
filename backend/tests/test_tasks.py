import sys
import os
import pytest
from fastapi.testclient import TestClient

sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
from main import app

client = TestClient(app)

# Reuse valid credentials
test_user = {
    "username": "testuser",
    "password": "newsecurepass"  # Updated from last test
}

def get_auth_token():
    login = client.post("/login", data=test_user)
    return login.json()["access_token"]

def test_create_task():
    token = get_auth_token()
    response = client.post("/tasks",
        headers={"Authorization": f"Bearer {token}"},
        json={"title": "Test Task", "description": "Task description"}
    )
    assert response.status_code == 201 or response.status_code == 200
    assert "id" in response.json()
    global created_task_id
    created_task_id = response.json()["id"]

def test_get_tasks():
    token = get_auth_token()
    response = client.get("/tasks", headers={"Authorization": f"Bearer {token}"})
    assert response.status_code == 200
    assert isinstance(response.json(), list)

def test_update_task():
    token = get_auth_token()
    response = client.put(f"/tasks/{created_task_id}",
        headers={"Authorization": f"Bearer {token}"},
        json={"title": "Updated Task", "description": "Updated description"}
    )
    assert response.status_code == 200
    assert response.json()["title"] == "Updated Task"


def test_update_task():
    token = get_auth_token()
    response = client.put(f"/tasks/update/{created_task_id}",
        headers={"Authorization": f"Bearer {token}"},
        json={
            "title": "Updated Task",
            "description": "Updated description",
            "status": "completed",
            "priority": "high",
            "deadline": "2025-12-31T23:59:00"  # use valid ISO datetime
        }
    )
    assert response.status_code == 200
    assert response.json()["title"] == "Updated Task"
    assert response.json()["status"] == "completed"


def test_delete_task():
    token = get_auth_token()
    response = client.delete(f"/tasks/{created_task_id}",
        headers={"Authorization": f"Bearer {token}"}
    )
    assert response.status_code == 200 or response.status_code == 204
