'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.addColumn('Songs', 'link', Sequelize.STRING );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('Songs', 'link');
  }
};
