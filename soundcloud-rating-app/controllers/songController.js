const Song = require("../models").Song;
const Rating = require("../models").Rating;
const User = require("../models").User;

class SongController {
  static library(req, res) {
    Song.findAll({
      include: [
        {
          model: User
        }
      ]
    })
      .then(songs => {
        songs.forEach(song => {
          let totalRating = 0,
            sum = 0;
          song.dataValues.Users.forEach(user => {
            totalRating += user.Rating.rating;
            sum++;
            // console.log(user.Rating.rating, totalRating, 'loop average rating')
          });
          let avgRating;
          if (totalRating === 0 && sum === 0) avgRating = 0;
          else avgRating = totalRating / sum;
          // if(typeof avgRating !== 'Number')avgRating = 0
          // console.log(avgRating , 'avg', typeof avgRating)
          // console.log('--------------')

          song.setDataValue("avgRating", avgRating);
          // console.log('ini udah masuk data', song.dataValues.avgRating, typeof song.dataValues.avgRating)
          // console.log(song.dataValues)
        });
        // res.send(songs)
        // console.log("==============");

        // console.log(songs,'ini song=========');
        // console.log("==============");
        res.render("main", { songs });
      })
      .catch(err => res.send(err));
  }

  static getRating(req, res) {
    let song = {};
    Song.findByPk(req)
      .then(Song => {
        song = Song;
        return Song.getAverageRating();
      })
      .then(avgRating => {
        song.setDataValue();
        // console.log(Song.avgRating)
      })
      .catch(err => err);
  }
}

SongController.getRating(1, 0);

module.exports = SongController;
