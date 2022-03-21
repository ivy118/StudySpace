const router = require("express").Router();

// Community Middleware

/*
REQUESTS:
GET
- login/sign up
- GET subjects (for user)
- GET chatlogs
- GET events

POSTS
- POST create community/subject
- POST join community
- POST create chatroom
- POST create events

Probably should want some delete functionality
- DELETE events 
*/
/* GET Requests */

/* POST Requests */
/**
 * Creates a Community
 * @param communityName (string)
 */
router.post(
    "/create-community",
    validSubject,
    async (req, res, next) => {
        try {
            // 1. Destructure the req.body
            const { communityName } =  req.body;

            // 2. Create the community table

        } catch (err) {
            console.log(err.message);
            res.status(500).send("Server Error");
        }
    }
);

// Join a community

module.exports = router;
