delete from users where email ='admin@tasktrack.com';

INSERT INTO users (name, email, password, role)
VALUES (
           'Admin User',
           'admin@tasktrack.com',
           '$2a$10$wFS/iydWKGnMZNmkkUGT4unt/0gfgqvm8gwqY61RaF8Y4GYl6DNay',
           '0'
       );