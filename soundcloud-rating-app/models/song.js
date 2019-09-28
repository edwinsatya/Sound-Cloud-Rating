'use strict';
// const Rating = require('../models').Rating

module.exports = (sequelize, DataTypes) => {
  
  const ClassModel = sequelize.models //ClassModel.Rating
  const Model = sequelize.Sequelize.Model


  class Song extends Model {

    //  AverageRating(){
    //     return ClassModel.Rating
    //       .findAll({
    //         where: {
    //           SongId : this.id
    //         }
    //       })
    //       .then(songRatings=>{
    //         let totalRating = 0 , avgRating = 0
    //         if(songRatings.length !== 0){
    //           songRatings.forEach(rate => {
    //               totalRating += rate.rating
    //           });
    //           avgRating = Math.ceil((totalRating/20)/songRatings.length)
    //         }
    //         return ({avgRating})
    //       })
    // }

  }


  Song.init({
    title: DataTypes.STRING,
    genre: DataTypes.STRING,
    artist: DataTypes.STRING,
    link: DataTypes.STRING
  }, {
    sequelize, modelName: 'Song'
  });
  Song.associate = function(models) {
    Song.belongsToMany(models.User, {through: models.Rating})
  };
  return Song;
};