-- Add admin user
-- Password: admin123 (BCrypt hashed)
INSERT INTO users (name, email, password, role) 
VALUES (
    'Admin User', 
    'admin@tasktrack.com', 
    '$2a$10$N.zmdr9k7uOCQb376NoUnuTJ8iAt6Z5EHsM8lE9lBOsl7iKTVEFDa', 
    '0'
); 