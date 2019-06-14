'use strict';

const faker = require("faker");
function getRand(min, max) {
    return Math.random() * (max - min) + min;
}
module.exports = {
    up: (queryInterface, Sequelize) => {

        let Skills = [];

        for (let i = 0; i < 10; i++) { 
            const skill = {
                name: faker.hacker.verb(),
                rating: getRand(1, 5),
                createdAt: new Date(),
                updatedAt: new Date()
            }
            Skills.push(skill);
        }

        return queryInterface.bulkInsert('Skills', Skills, {});
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