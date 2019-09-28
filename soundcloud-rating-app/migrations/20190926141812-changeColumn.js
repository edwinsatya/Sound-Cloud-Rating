'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.changeColumn('Ratings', 'rating', { type: Sequelize.FLOAT });
  },

  down: (queryInterface, Sequelize) => {
      
  }
};
