const { Model, DataTypes } = require("sequelize");
var sequelize = require("../config/connection.js");
var bcrypt = require("bcrypt");

// setup User model and its fields.
var UserSchema = sequelize.define("users", {
  id: {
    type: DataTypes.INTEGER,
    unique: true,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

UserSchema.beforeCreate((user, options) => {
  const salt = bcrypt.genSaltSync(); //genSaltSync(It generates random bits of numbers and characters)
  user.password = bcrypt.hashSync(user.password, salt); //hashSync(Joins the random bits generated earlier
  // on with our passowrd to make it encrypted and more secured)
});

UserSchema.prototype.validPassword = function (password) {
  return bcrypt.compareSync(password, this.password); //compareSync(Compares the password the user entetered
  //while loggin in to see if its a match with the password in our database)
};

// export User model for use in other files.
module.exports = UserSchema;