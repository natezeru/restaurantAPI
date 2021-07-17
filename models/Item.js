const {sequelize} = require('../db');
const { DataTypes, Model } = require('sequelize');

class Item extends Model {}

Item.init({
  name: DataTypes.STRING,
  image: DataTypes.STRING,
  price: DataTypes.NUMBER
  
}, {
  sequelize,
  timestamps: false
})

module.exports = {Item};
