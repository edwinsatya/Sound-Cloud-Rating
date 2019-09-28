'use strict';
module.exports = (sequelize, DataTypes) => {
  const Rating = sequelize.define('Rating', {
    UserId: DataTypes.INTEGER,
    SongId: DataTypes.INTEGER,
    rating: DataTypes.INTEGER
  }, {});
  Rating.associate = function(models) {
    // associations can be defined here
  };
  return Rating;
};