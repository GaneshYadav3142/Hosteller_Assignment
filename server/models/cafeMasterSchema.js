const mongoose = require('mongoose');

const cafeMasterSchema = new mongoose.Schema({
  cafeName: String,
  hostel: { type: mongoose.Schema.Types.ObjectId, ref: 'Hostel' },
});

const CafeMaster = mongoose.model('CafeMaster', cafeMasterSchema);

module.exports = CafeMaster;