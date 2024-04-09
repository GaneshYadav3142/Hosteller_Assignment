const mongoose = require('mongoose');

const masterMenuSchema = new mongoose.Schema({
  itemName: String,
  itemCategory: String,
});

const MasterMenu = mongoose.model('MasterMenu', masterMenuSchema);

module.exports = MasterMenu;