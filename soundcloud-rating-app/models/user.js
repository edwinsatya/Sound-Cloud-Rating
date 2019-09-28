'use strict';
const hashPassword = require('../helpers/hashPassword')
// console.log(hashPassword('aldi', '1234'));

module.exports = (sequelize, DataTypes) => {
  const Model = sequelize.Sequelize.Model

  class User extends Model {

  }

  User.init({
    name: DataTypes.STRING,
    username: {
      type: DataTypes.STRING,
      validate: {
        isUnique() {
          return User.findOne({
            where: { username: this.username }
          })
            .then(usernameFound => {
              if (usernameFound) {
                throw('username already in used!')
              }
            })
        }
      }
    },

    password: DataTypes.STRING,
    salt: DataTypes.STRING,

    email: {
      type: DataTypes.STRING,
      validate: {
        isEmail: {
          args: true,
          msg: 'Invalid email!'
        },
        isUnique() {
          return User.findOne({
            where: { email: this.email }
          })
            .then(emailFound => {
              if (emailFound) {
                throw new Error('Email already in used!')
              }
            })
            // .catch(err => err.message))
        }
      }
    },
  },
    {
      sequelize,
      hooks: {
        beforeCreate(user, options) {
          // console.log(user.dataValues);
          let secret = String(Math.random() * 100)
          const password = hashPassword(user.password, secret)
          user.setDataValue('password', password)
          user.setDataValue('salt', secret)
        }
      }
    }
  
  );

  User.associate = function (models) {
    User.belongsToMany(models.Song, { through: models.Rating })
  };

  return User;
};