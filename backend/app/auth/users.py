from app.auth.security import hash_password

fake_users_db = {
    "admin": {
        "username": "admin",
        "full_name": "System Administrator",
        "email": "admin@aileadvision.com",
        "hashed_password": hash_password("admin123"),
        "role": "Admin",
    },

    "manager": {
        "username": "manager",
        "full_name": "Sales Manager",
        "email": "manager@aileadvision.com",
        "hashed_password": hash_password("manager123"),
        "role": "Manager",
    },

    "analyst": {
        "username": "analyst",
        "full_name": "Business Analyst",
        "email": "analyst@aileadvision.com",
        "hashed_password": hash_password("analyst123"),
        "role": "Analyst",
    },
}