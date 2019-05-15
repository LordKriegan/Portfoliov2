const router = require('express').Router();

router.post("/", (req, res) => {
    if (req.body.user.toLowerCase() === process.env.admin.toLowerCase() && req.body.password.toLowerCase() === process.env.password.toLowerCase()) {
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