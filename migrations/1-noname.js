'use strict';

var Sequelize = require('sequelize');

/**
 * Actions summary:
 *
 * createTable "Projects", deps: []
 * createTable "Images", deps: [Projects]
 *
 **/

var info = {
    "revision": 1,
    "name": "noname",
    "created": "2019-03-05T06:57:02.849Z",
    "comment": ""
};

var migrationCommands = [
    {
        fn: "createTable",
        params: [
            "Projects",
            {
                "id": {
                    "type": Sequelize.INTEGER,
                    "field": "id",
                    "autoIncrement": true,
                    "primaryKey": true,
                    "allowNull": false
                },
                "title": {
                    "type": Sequelize.STRING,
                    "field": "title",
                    "allowNull": false
                },
                "liveLink": {
                    "type": Sequelize.STRING,
                    "field": "liveLink",
                    "allowNull": false
                },
                "ghLink": {
                    "type": Sequelize.STRING,
                    "field": "ghLink",
                    "allowNull": false
                },
                "summary": {
                    "type": Sequelize.STRING(15000),
                    "field": "summary",
                    "allowNull": false
                },
                "tech": {
                    "type": Sequelize.STRING,
                    "field": "tech",
                    "allowNull": false
                },
                "role": {
                    "type": Sequelize.STRING,
                    "field": "role",
                    "allowNull": false
                },
                "createdAt": {
                    "type": Sequelize.DATE,
                    "field": "createdAt",
                    "allowNull": false
                },
                "updatedAt": {
                    "type": Sequelize.DATE,
                    "field": "updatedAt",
                    "allowNull": false
                }
            },
            {}
        ]
    },
    {
        fn: "createTable",
        params: [
            "Images",
            {
                "id": {
                    "type": Sequelize.INTEGER,
                    "field": "id",
                    "autoIncrement": true,
                    "primaryKey": true,
                    "allowNull": false
                },
                "imageLink": {
                    "type": Sequelize.STRING,
                    "field": "imageLink",
                    "allowNull": false
                },
                "createdAt": {
                    "type": Sequelize.DATE,
                    "field": "createdAt",
                    "allowNull": false
                },
                "updatedAt": {
                    "type": Sequelize.DATE,
                    "field": "updatedAt",
                    "allowNull": false
                },
                "ProjectId": {
                    "type": Sequelize.INTEGER,
                    "field": "ProjectId",
                    "onUpdate": "CASCADE",
                    "onDelete": "CASCADE",
                    "references": {
                        "model": "Projects",
                        "key": "id"
                    },
                    "allowNull": false
                }
            },
            {}
        ]
    }
];

module.exports = {
    pos: 0,
    up: function(queryInterface, Sequelize)
    {
        var index = this.pos;
        return new Promise(function(resolve, reject) {
            function next() {
                if (index < migrationCommands.length)
                {
                    let command = migrationCommands[index];
                    console.log("[#"+index+"] execute: " + command.fn);
                    index++;
                    queryInterface[command.fn].apply(queryInterface, command.params).then(next, reject);
                }
                else
                    resolve();
            }
            next();
        });
    },
    info: info
};
