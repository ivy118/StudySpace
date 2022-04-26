const pool = require("../db/db");
const router = require("express").Router();

// Random Community Data
const allCommunities = ['algorithms', 'artificial_intelligence', 'calculus', 'computer_architecture', 'computer_science_theory', 'computer_theory', 'data_logic', 'data_management', 'design_physics', 'device_utilization', 'electronic_design', 'files_and_databases', 'information_management', 'logic_design', 'machine_language', 'network_fundamentals', 'operating_systems', 'programming_languages', 'statistics'];

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
            let numberOfCommunities = Math.floor(Math.random() * allCommunities.length);
            let communities = [];
            const userId = users.rows[i].user_id;
            const setSeenIndices = new Set();
            
            // Iterate through the random number of communities this user will have
            for (let j = 0; j < numberOfCommunities; j++) {
                // Generate a random index that has not been seen yet
                let randomIndex = Math.floor(Math.random() * allCommunities.length);
                while (setSeenIndices.has(randomIndex)) {
                    randomIndex = Math.floor(Math.random() * allCommunities.length);
                }

                // Add the index and the community it index's into to the communities array
                setSeenIndices.add(randomIndex);
                communities.push(allCommunities[randomIndex]);
            }
            const userCommunities = "{" + communities.map((community) => `\"${community}\"`).toString() + "}";

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
                    created_on TIMESTAMPTZ NOT NULL DEFAULT NOW(),\
                    replies TEXT[],\
                    FOREIGN KEY(user_id)\
                    REFERENCES users(user_id)\
                )`);
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
            }
        }
        res.send("Successfully deleted all community tables.");
    } catch (err) {
        console.log(err.message);
        res.status(500).json("Server Error");
    }
});

module.exports = router;
