const router = require('express').Router();

router.post("/", (req, res) => {
    if (req.body.user === process.env.admin && req.body.password === process.env.password) {
        res.json({
            success: true
        });
    } else {
        res.json({
            success: false
        });
    }
});

module.exports = router;