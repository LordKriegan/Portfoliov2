'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {

        let Images = [];

        for (let i = 1; i < 11; i++) {
            let total = Math.floor((Math.random() * 5) + 1)
            for (let x = 1; x <= total; x++) {
                const image = {
                    imageLink: "https://loremflickr.com/320/240",
                    ProjectId: i,
                    createdAt: new Date(),
                    updatedAt: new Date()
                }
                Images.push(image);
            }
        }

        return queryInterface.bulkInsert('Images', Images, {});
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
        return queryInterface.bulkDelete('Images', null, {});
        /*
          Add reverting commands here.
          Return a promise to correctly handle asynchronicity.
          Example:
          return queryInterface.bulkDelete('People', null, {});
        */
    }
};