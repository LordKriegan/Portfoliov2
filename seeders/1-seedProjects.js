'use strict';

const faker = require("faker");

module.exports = {
    up: (queryInterface, Sequelize) => {

        let Projects = [];

        for (let i = 0; i < 10; i++) {
            const project = {
                title: faker.name.title(),
                liveLink: faker.internet.domainName(),
                ghLink: faker.internet.domainName(),
                summary: faker.lorem.paragraph(),
                tech: Array.from({ length: 5 }, () => faker.hacker.noun()).join(","),
                role: faker.lorem.sentence(),
                createdAt: new Date(),
                updatedAt: new Date()
            }
            Projects.push(project);
        }

        return queryInterface.bulkInsert('Projects', Projects, {});
        /*
          Add altering commands here.
          Return a promise to correctly handle asynchronicity.
          Example:
          return queryInterface.bulkInsert('People', [{
            name: 'John Doe',
            isBetaMember: false
          }], {});
        */
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('Projects', null, {});
        /*
          Add reverting commands here.
          Return a promise to correctly handle asynchronicity.
          Example:
          return queryInterface.bulkDelete('People', null, {});
        */
    }
};