const router = require("express").Router();
const fs = require('fs');

const pool = require("../db/postgreDB");
const myS3Instance = require("../aws-s3/aws-s3");

// Random Community Data
const allCommunities = ['algorithms', 'artificial_intelligence', 'calculus', 'computer_architect', 'computer_science_theory', 'computer_theory', 'data_logic', 'data_management', 'design_physics', 'device_utilization', 'electronic_design', 'files_and_databases', 'information_management', 'logic_design', 'machine_language', 'network_fundamentals', 'operating_systems', 'statistics'];
const imageKeys = [
    "1647932638418.png",
    "1_ZIGq3Xit78261gDW-3bheQ.png",
    "1_ikKSYqB3U5Ms9e4fYoRg8w.png",
    "Data-structures-can-be-defined-as-the-process of-organizing-data-in-the-best-way.jpeg",
    "dp2.png",
    "images.png",
    "plhA-E3btLLYRvc4hi3WxmUpAhu3aoef1o0V.png",
    "qt21.png",
    "srdgf.jpeg"
];

function generateRandomNumber(max) {
    return Math.floor(Math.random() *  max);
}

// Creates a table for all the communities all the tables
router.post("/create-table-all-communities", async (req, res) => {
    try {
        // Get the 'all_communities' table
        const allCommunitiesName = "all_communities";
        const allCommunitiesTable = await pool.query(`SELECT * FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_NAME = '${allCommunitiesName}'`);

        // Check to see if the table 'all_communities' is created yet 
        if (allCommunitiesTable.rows.length === 0) {
            // Create the 'all_communities' table 
            await pool.query(`CREATE TABLE ${allCommunitiesName} (\
                community_id SERIAL PRIMARY KEY,\
                community_name VARCHAR(255) NOT NULL)`);
        }

        // Populate the table with each community
        for (community of allCommunities) {
            const course = await pool.query(`SELECT * from all_communities WHERE community_name = '${community}'`);

            // Check to see if the course is inside the 'all_communities' table
            if (course.rowCount  === 0) {
                await pool.query(`INSERT INTO ${allCommunitiesName} (community_name) VALUES ('${community}')`);
            }
        }

        res.send("Successfully created all-community table.");
    } catch (err) {
        console.log(err.message);
        res.status(500).json("Server Error");
    }
});

// Populate the users with random communities, 
router.put("/populate-users-with-random-communities", async (req, res) => {
    try {
        const users = await pool.query(`SELECT * FROM users`);

        for (let i = 0; i < users.rowCount; i++) {
            // Generate a random number and get that many random communities

            let numberOfCommunities = generateRandomNumber(allCommunities.length);
            let communities = [];
            const userId = users.rows[i].user_id;
            const setSeenIndices = new Set();
            
            // Iterate through the random number of communities this user will have
            for (let j = 0; j < numberOfCommunities; j++) {
                // Generate a random index that has not been seen yet
                let randomIndex = generateRandomNumber(allCommunities.length);
                while (setSeenIndices.has(randomIndex)) {
                    randomIndex = generateRandomNumber(allCommunities.length);
                }

                // Add the index and the community it index's into to the communities array
                setSeenIndices.add(randomIndex);
                communities.push(allCommunities[randomIndex]);
            }
            const userCommunities = `{ ${communities.map((community) => `\"${community}\"`).toString()} }`;

            // Update the SQL table
            await pool.query(`UPDATE users SET user_communities = '${userCommunities}' WHERE user_id = ${userId}`);

        }
        res.send("Succesfully populated users with communities.");
    } catch (err) {
        console.log(err.message);
        res.status(500).json("Server Error");
    }
});

// Creates tables for all the Communities
router.post("/create-community-tables", async (req, res) => {
    try {
        // Iterate through all the dummy communities 
        for (community of allCommunities) {
            // Check if the community exists
            const communityQuery = await pool.query(`SELECT * FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_NAME = '${community}'`);
            
            if (communityQuery.rows.length === 0) {
                await pool.query(`CREATE TABLE ${community} (\
                    post_id SERIAL PRIMARY KEY,\
                    user_id INT NOT NULL,\
                    post_image_key VARCHAR(255), \
                    post_description TEXT NOT NULL,\
                    users_likes_post TEXT[] NOT NULL, \
                    created_on TIMESTAMPTZ NOT NULL DEFAULT NOW(),\
                    replies INT[],\
                    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE cascade ON UPDATE cascade\
                )`);

                const communtiyComment = `${community}_post_comments`;
                await pool.query(`CREATE TABLE ${communtiyComment}(\
                    comment_id SERIAL PRIMARY KEY,\
                    sender VARCHAR(255) NOT NULL,\
                    receiver VARCHAR(255),\
                    comment TEXT,\
                    created_on TIMESTAMPTZ NOT NULL DEFAULT NOW()
                );`);
            }
        }
        
        // 
        res.send("Successfully created all communty tables.");
    } catch (err) {
        console.log(err.message);
        res.status(500).json("Server Error");
    }
});

// DELETES all tables for all the Communities
router.delete("/delete-community-tables", async (req, res) => {
    try {
        for (community of allCommunities) {
            const communityQuery = await pool.query(`SELECT * FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_NAME = '${community}'`);
            if (communityQuery.rows.length !== 0) {
                await pool.query(`DROP TABLE ${community};`);
                await pool.query(`DROP TABLE ${community}_post_comments`);
            }
        }
        res.send("Successfully deleted all community tables.");
    } catch (err) {
        console.log(err.message);
        res.status(500).json("Server Error");
    }
});

const dummyText = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Urna id volutpat lacus laoreet non curabitur gravida arcu. Amet nisl purus in mollis nunc sed. Accumsan tortor posuere ac ut consequat. Eu facilisis sed odio morbi quis commodo odio aenean. Varius quam quisque id diam. Egestas tellus rutrum tellus pellentesque. In iaculis nunc sed augue. Blandit libero volutpat sed cras ornare arcu dui vivamus. Sit amet mattis vulputate enim nulla aliquet porttitor. Aenean euismod elementum nisi quis. Justo laoreet sit amet cursus sit amet dictum. Porta nibh venenatis cras sed felis eget velit aliquet sagittis. Et netus et malesuada fames ac turpis. A lacus vestibulum sed arcu non odio euismod lacinia at. Arcu non sodales neque sodales ut etiam.";

function generateLikes(users) {
    let likesUserID = [];

    const numLikes = generateRandomNumber(users.rowCount);
    const userIds = users.rows.map((user) => user.user_id);

    for (let i = 0; i < numLikes; i++) {
        const index = generateRandomNumber(userIds.length);
        likesUserID.push(userIds[index]);
    }

    return likesUserID
}

router.get("/generateLikes", async (req, res) => {
    try {
        const users = await pool.query(`SELECT * FROM users`);
        const likesUserID = generateLikes(users);

        const likesUserName = []
        for (id of likesUserID) {
            const user = await pool.query(`SELECT user_name FROM users WHERE user_id = ${id}`);
            likesUserName.push(user.rows[0].user_name);
        }

        console.log(likesUserName)
        res.status(200).json("Successfully generateLike.");
    } catch (err) {
        console.log(err.message);
        res.status(500).json("Error in generateLikes")
    }
});

// Populate communities with dummy data
router.post("/populate-community-with-dummy-data", async (req, res) => {
    try {
        // get all the users
        const users = await pool.query(`SELECT * FROM users`);
        const userIdQuery = await pool.query(`SELECT user_id FROM users;`);
        const userIds = userIdQuery.rows.map((row) => row.user_id);
        // iterate through all the communities
        for (communtyName of allCommunities) {
            const numPosts = generateRandomNumber(10);
            for (let j = 0; j < numPosts; j++) {
                // generate all the random data
                const randomUser = userIds[generateRandomNumber(userIds.length)];
                
                const likesUserName = [];
                for (id of generateLikes(users)) {
                    const user = await pool.query(`SELECT user_name FROM users WHERE user_id = ${id}`);
                    const username = user.rows[0].user_name;
                    likesUserName.push(username);
                }
                const likes = `{ ${likesUserName.map((username) => `\"${username}\"`).toString()} }`

                const insertImageBool = Boolean(generateRandomNumber(2));
                const imageKey = imageKeys[generateRandomNumber(imageKeys.length)];
                
                const text = communtyName + ": " + dummyText.slice(generateRandomNumber(dummyText.length));
    
                // insert data to the community
                const communityQueryString = 
                    insertImageBool
                    ? `INSERT INTO ${communtyName} 
                        (user_id, post_description, users_likes_post, post_image_key)
                        VALUES (${randomUser}, '${text}', '${likes}', '${imageKey}')
                        RETURNING post_id;`
                    : `INSERT INTO ${communtyName} 
                        (user_id, post_description, users_likes_post) 
                        VALUES (${randomUser}, '${text}', '${likes}') 
                        RETURNING post_id;`;
                const communityQuery = await pool.query(communityQueryString);

                // insert data to the community comment
                const numComments = generateRandomNumber(10);
                const commentIDs = [];
                for (let k = 0; k < numComments; k++) {
                    const communtiyComment = `${communtyName}_post_comments`;
                    const senderId = userIds[generateRandomNumber(userIds.length)];
                    const receiverId = userIds[generateRandomNumber(userIds.length)];

                    const sender  = (await pool.query(`SELECT user_name FROM users WHERE user_id = ${senderId}`)).rows[0].user_name;
                    const receiver  = (await pool.query(`SELECT user_name FROM users WHERE user_id = ${receiverId}`)).rows[0].user_name;
                    const comment = dummyText.slice(generateRandomNumber(dummyText.length));

                    const commentQuery = await pool.query(`
                        INSERT INTO ${communtiyComment} 
                        (sender, receiver, comment) 
                        VALUES ('${sender}', '${receiver}', '${comment}') 
                        RETURNING comment_id;`);
                    commentIDs.push(commentQuery.rows[0].comment_id);
                }

                await pool.query(`UPDATE ${communtyName} SET replies = '{${commentIDs.toString()}}' WHERE post_id = ${communityQuery.rows[0].post_id};`);
            
            }
        }
        res.send("Successfully populated all community tables with dummy data.");
    } catch (err) {
        console.log(err.message);
        res.status(500).json("Server Error");
    }
});




// Download images from folder and add it to S3 Bucket
router.post("/populate-S3-with-images", async (req, res) => {
    try { 
        const keys = [];

        const filePath = "/Users/jonathancen/Desktop/Images\ For\ Colab";
        const files = fs.readdirSync(filePath).slice(1);
        const bucketName = process.env.AWS_BUCKET_NAME;

        for (file of files) {
            const fileStream = fs.createReadStream(filePath + "/" + file);
            const s3UploadParams = {
                Bucket: bucketName, 
                Body: fileStream,
                Key: file
            };
            const uploadResults = await myS3Instance.upload(s3UploadParams).promise();
            keys.push(uploadResults.Key);
        }

        res.json(keys);
    } catch (err) {
        console.log(err.message);
        res.status(500).json("Error at populate-S3-with-images in utils.");
    }
});


module.exports = router;
