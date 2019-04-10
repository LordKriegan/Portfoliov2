'use strict';

const faker = require("faker");
function getRand(min, max) {
    return Math.random() * (max - min) + min;
}
module.exports = {
    up: (queryInterface, Sequelize) => {

        let Education = [];

        for (let i = 0; i < 10; i++) { 
            const ed = {
                school: faker.company.companyName(),
                yearStart: getRand(2000,2015),
                yearEnd: getRand(2016,2019),
                degree: faker.hacker.noun(),
                createdAt: new Date(),
                updatedAt: new Date()
            }
            Education.push(ed);
        }

        return queryInterface.bulkInsert('Education', Education, {});
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