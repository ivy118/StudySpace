--- This is for organization purposes this file is not connected anywhere ---

CREATE DATABASE colabtive;

-- Users table
CREATE TABLE users(
    user_id SERIAL PRIMARY KEY,
    user_name VARCHAR(255) UNIQUE NOT NULL,
    user_email VARCHAR(255) UNIQUE NOT NULL,
    user_password VARCHAR(255) NOT NULL,
    user_subject TEXT[]
);


---- **Template of the Subjects table
--- NEED TO RESEARCH ABOUT BYTEA DATA TYPE AND STORING IMAGES
CREATE TABLE subject_name(
    post_id SERIAL PRIMARY KEY,
    user_id INT NOT NULL,
    post_description TEXT NOT NULL,
    post_image BYTEA,
    created_on TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    replies TEXT[],
    FOREIGN KEY(user_id)
        REFERENCES users(user_id)
);


-- Chatroom & Chatroom Data

---- Contains metadata of chatroom tables
CREATE TABLE chatroom_info(
    chatroom_id SERIAL PRIMARY KEY,
    user1_id INT NOT NULL,
    user2_id INT NOT NULL,
    FOREIGN KEY(user1_id)
        REFERENCES users(user_id),
    FOREIGN KEY(user2_id)
        REFERENCES users(user_id)
);


---- **Template of the chatroom#ID
CREATE TABLE chatroom#id(
    message_id SERIAL PRIMARY KEY,
    message_timestamp TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    message_content TEXT NOT NULL
);


-- Event table
CREATE TABLE events(
    event_id SERIAL PRIMARY KEY,
    subject TEXT,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    link VARCHAR(255) NOT NULL,
    interest INT NOT NULL,
    start_time TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    end_time TIMESTAMPTZ NOT NULL DEFAULT NOW()
);