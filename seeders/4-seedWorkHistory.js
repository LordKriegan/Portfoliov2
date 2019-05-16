'use strict';

const faker = require("faker");
function getRand(min, max) {
    return Math.random() * (max - min) + min;
}
module.exports = {
    up: (queryInterface, Sequelize) => {

        let WorkHistory = [];

        for (let i = 0; i < 10; i++) { 
            const ed = {
                employer: faker.company.companyName(),
                yearStart: getRand(2000,2015),
                yearEnd: getRand(2016,2019),
                title: faker.hacker.noun(),
                createdAt: new Date(),
                updatedAt: new Date()
            }
            WorkHistory.push(ed);
        }

        return queryInterface.bulkInsert('WorkHistories', WorkHistory, {});
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