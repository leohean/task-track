-- Drop the existing project_user table
DROP TABLE IF EXISTS project_user;

-- Recreate the project_user table with correct structure
CREATE TABLE project_user (
    project_id INTEGER NOT NULL,
    user_id INTEGER NOT NULL,
    added_at TIMESTAMP NOT NULL,
    PRIMARY KEY (project_id, user_id),
    FOREIGN KEY (project_id) REFERENCES projects(id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
); 