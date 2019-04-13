const db = require('../models');

const educationController = {
    create: (req, res) => {
        const params = {
            school: req.body.school,
            yearStart: req.body.yearStart
        };
        if (req.body.yearEnd) params.yearEnd = req.body.yearEnd;
        if (req.body.degree) params.degree = req.body.degree;
        db.Education
            .create(params)
            .then((response) => {
                res.json(response);
            })
            .catch((error) => {
                console.error(error);
                res.status(500).json({
                    msg: "Error while trying to create education row!",
                    error: error.message
                });
            });
    },
    findAll: (req, res) => {
        db.Education
            .findAll({})
            .then((response) => {
                res.json(response);
            })
            .catch((error) => {
                console.error(error);
                res.status(500).json({
                    msg: "Error while trying to fetch education!",
                    error: error.message
                });
            });
    },
    update: (req, res) => {
        const params = {};
        const {school, degree, yearStart, yearEnd} = req.body;
        if (school) params.school = school;
        if (degree) params.degree = degree;
        if (yearStart) params.yearStart = yearStart;
        if (yearEnd) params.yearEnd = yearEnd;
        db.Education
            .update(params, {
                where: {
                    id: req.params.id
                },
                returning: true
            })
            .then((response) => {
                res.json(response);
            })
            .then((error) => {
                res.status(500).json({
                    msg: "Error while updating education!",
                    error: error.message
                })
            })
    },
    delete: (req, res) => {
        db.Education
            .destroy({
                where: {
                    id: req.params.id
                }
            })
            .then((response) => {
                res.json(response)
            })
            .catch((error) => {
                console.error(error);
                res.status(500).json({
                    msg: "Error while deleting education!",
                    error: error.message
                });
            });
    }
}

module.exports = educationController;