const db = require('../models');

const skillsController = {
    create: (req, res) => {
        const params = {
            name: req.body.name,
            rating: req.body.rating
        }
        db.Skill
            .create(params)
            .then((response) => {
                res.json(response)
            })
            .catch((error) => {
                console.error(error);
                res.status(500).json({
                    msg: "Error while creating skill!",
                    error: error.message
                })
            })
    },
    findAll: (req, res) => {
        db.Skill
        .findAll({})
        .then((response) => {
            res.json(response);
        })
        .catch((error) => {
            console.error(error);
            res.status(500).json({
                msg: "Error while trying to retrieve skills!",
                error: error.messsage
            });
        });
    },
    update: (req, res) => {
        const params = {
            name: req.body.name,
            rating: req.body.rating
        };

        db.Skill
            .update(params, {
                where: {
                    id: req.params.id
                },
                returning: true
            })
            .then((response) => {
                res.json(response);
            })
            .catch((error) => {
                console.error(error);
                res.status(500).json({
                    msg: "Error while updating skill!",
                    error: error.message
                });
            });
    },
    delete: (req, res) => {
        db.Skill
            .destroy({
                where: {
                    id: req.params.id
                }
            })
            .then((response) => {
                res.json(response);
            })
            .catch((error) => {
                console.error(error);
                res.status(500).json({
                    msg: "Error while deleting skills!",
                    error: error.message
                });
            });
    }
}

module.exports = skillsController;