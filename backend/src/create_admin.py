from user.crud import get_user_by_username, create_user
from user.schemas import UserCreate
from db.database import SessionLocal

db = SessionLocal()

# Check if 'admin' already exists
existing_user = get_user_by_username(db, username='admin')
if existing_user:
    print("Admin user already exists.")
else:
    admin_user = UserCreate(username="admin", password="123")
    create_user(db, admin_user, role="admin")
    print("Admin user created.")