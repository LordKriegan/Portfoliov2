const db = require('../models');

const workHistoryController = {
    create: (req, res) => {
        const params = {
            employer: req.body.employer,
            yearStart: req.body.yearStart
        };
        if (req.body.yearEnd) params.yearEnd = req.body.yearEnd;
        if (req.body.title) params.title = req.body.title;
        db.WorkHistory
            .create(params)
            .then((response) => {
                res.json(response);
            })
            .catch((error) => {
                console.error(error);
                res.status(500).json({
                    msg: "Error while creating work history!",
                    error: error.message
                })
            })
    },
    findAll: (req, res) => {
        db.WorkHistory
            .findAll({})
            .then((response) => {
                res.json(response);
            })
            .catch((error) => {
                console.error(error);
                res.status(500).json({
                    msg: "Error while trying to retrieve work history!",
                    error: error.messsage
                });
            });
    },
    update: (req, res) => {
        const params = {};
        const { employer, title, yearStart, yearEnd } = req.body;
        if (employer) params.employer = employer;
        if (title) params.title = title;
        if (yearStart) params.yearStart = yearStart;
        if (yearEnd) params.yearEnd = yearEnd;
        db.WorkHistory
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
                    msg: "Error while updating work history!",
                    error: error.message
                });
            });
    },
    delete: (req, res) => {
        db.WorkHistory
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
                    msg: "Error while deleting work history!",
                    error: error.message
                });
            });
    }
}

module.exports = workHistoryController;