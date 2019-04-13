const router  = require('express').Router();
const controller = require('../controllers/educationController');
//get all
router.get("/all", controller.findAll);
//create
router.post("/", controller.create);
//update
router.put("/:id", controller.update);
//delete
router.delete("/:id", controller.delete);
module.exports = router;