module.exports = function() {
  try {
    require("dotenv").config();
  } catch (err) {
    console.log("Dotenv not found. Using system environment variables.");
  }
};
