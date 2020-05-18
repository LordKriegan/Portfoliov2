const db = require('../models');

createProject = (params) => {
    return db.Project.create(params);
}

createImages = (images, id) => {
    return db.Images.bulkCreate(images.map((elem) => {
        return {
            imageLink: elem,
            ProjectId: id
        }
    }))
}

deleteProject = (id) => {
    return db.Project.destroy({
        where: {
            id: id
        }
    })
}

const projectController = {
    findAll: (req, res) => {
        db.Project
            .findAll({
                include: [{ model: db.Images }]
            })
            .then((response) => {
                res.json(response);
            })
            .catch((error) => {
                console.error(error.message);
                res.status(500).json(error.message);
            });
    },
    findOne: (req, res) => {
        db.Project
            .findAll({
                where: {
                    id: req.params.id
                },
                include: [{ model: db.Images }]
            })
            .then((response) => {
                res.json(response);
            })
            .catch((error) => {
                console.error(error.message);
                res.status(500).json(error.message);
            })
    },
    create: (req, res) => {
        createProject({
            title: req.body.title,
            liveLink: req.body.liveLink,
            ghLink: req.body.ghLink,
            summary: req.body.summary,
            tech: req.body.tech,
            role: req.body.role
        })
            .then((prjResponse) => {
                createImages(req.body.images, prjResponse.id)
                    .then((imgResponse) => {
                        res.json({ prjResponse, imgResponse })
                    })
                    .catch((error) => {
                        console.error(error.message);
                        res.status(500).json({ msg: "error while creating project images", error: error.message });
                    })
            })
            .catch((error) => {
                console.error(error.message);
                res.status(500).json({ msg: "error while creating project", error: error.message });
            })
    },
    update: (req, res) => {
        createProject({
            title: req.body.title,
            liveLink: req.body.liveLink,
            ghLink: req.body.ghLink,
            summary: req.body.summary,
            tech: req.body.tech,
            role: req.body.role
        })
            .then((prjResponse) => {
                createImages(req.body.images, prjResponse.id)
                    .then((imgResponse) => {
                        deleteProject(req.params.id)
                            .then((deleteResponse) => {
                                res.json({
                                    prjResponse: prjResponse,
                                    imgResponse: imgResponse,
                                    deleteResponse: deleteResponse
                                })
                            })
                            .catch((error) => {
                                console.error(error.message);
                                res.status(500).json({ msg: "Error while deleting old project", error: error.message })
                            })
                    })
                    .catch((error) => {
                        console.error(error.message);
                        res.status(500).json({ msg: "error while creating updated project images", error: error.message });
                    })
            })
            .catch((error) => {
                console.error(error.message);
                res.status(500).json({ msg: "error while creating updated project", error: error.message });
            })
    },
    delete: (req, res) => {
        return deleteProject(req.params.id)
            .then((response) => {
                res.json(response)
            })
            .catch((error) => {
                console.error(error.message);
                res.status(500).json(error.message);
            })
    }
}

module.exports = projectController;