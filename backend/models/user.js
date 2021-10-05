const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize('sqlite::memory:');

const User = sequelize.define('User', {
  // Model attributes are defined here
  email:{
    type: DataTypes.STRING,
    required: true,
    unique: true,
    },
 password:{
        type: DataTypes.STRING,
        required: true,
    }
}, {
  // Other model options go here
});
console.log(User === sequelize.models.User); 