const router = require('express').Router();
const controller = require('../controllers/prjController');
//get all
router.get("/all", controller.findAll)
//get one
router.get("/:id", controller.findOne)
//create
router.post("/", controller.create)
//update
router.put("/:id", controller.update) 
//delete
router.delete("/:id", controller.delete) 
module.exports = router;