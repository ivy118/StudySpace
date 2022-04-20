const router = require("Express").Router();

router.get("/get", async (req, res) => {
    res.send("Hit");
});


module.exports = router;