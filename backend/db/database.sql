--- This is for organization purposes this file is not connected anywhere ---

CREATE DATABASE colabtive;

-- Users table
CREATE TABLE users(
    -- user_id SERIAL PRIMARY KEY,
    user_name VARCHAR(255) UNIQUE NOT NULL PRIMARY KEY,
    first_name VARCHAR(255) NOT NULL,
    last_name VARCHAR(255) NOT NULL,
    -- add a profile picture
    user_email VARCHAR(255) UNIQUE NOT NULL,
    user_password VARCHAR(255) NOT NULL,
    user_communities TEXT[],
    user_chats TEXT[],
);


-- Communities Table and Individual Communities Tables
CREATE TABLE all_communities (
    community_id SERIAL PRIMARY KEY,
    community_name VARCHAR(255) NOT NULL
);

-- Not sure if its better to have all seperate comment table or one big one
-- All comments from all communities
CREATE TABLE community_name_post_comments(
    comment_id SERIAL PRIMARY KEY,
    sender VARCHAR(255) NOT NULL,
    receiver VARCHAR(255),
    comment TEXT,
    created_on TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

---- **Template of the Communitiess table
CREATE TABLE communities_name(
    post_id SERIAL PRIMARY KEY,
    user_id INT NOT NULL,
    post_description TEXT NOT NULL,
    users_likes_post TEXT[] NOT NULL, 
    post_image_key VARCHAR(255), 
    created_on TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    replies INT[],
    FOREIGN KEY(user_id)
        REFERENCES users(user_id) ON DELETE cascade ON UPDATE cascade
);


-- Chatroom & Chatroom Data

---- Contains metadata of chatroom tables
CREATE TABLE chatroom_metadata(
    chatroom_id SERIAL PRIMARY KEY,
    chatroom_uuid TEXT UNIQUE,
    chatroom_name VARCHAR(255) DEFAULT 'Group Chat',
    -- We can add a profile pic of the group chat
    users TEXT[]
);

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
    Communities TEXT,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    link VARCHAR(255) NOT NULL,
    interest INT NOT NULL,
    start_time TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    end_time TIMESTAMPTZ NOT NULL DEFAULT NOW()
);