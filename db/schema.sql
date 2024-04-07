DROP DATABASE IF EXISTS techBlog_db;

CREATE DATABASE techBlog_db;

-- CREATE TABLE blogpost (
--     id INT AUTO_INCREMENT PRIMARY KEY,
--     title VARCHAR(255) NOT NULL,
--     content TEXT NOT NULL,
--     user_id INT,
--     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
--     FOREIGN KEY (user_id) REFERENCES user(id)
-- );