const mongoose = require('mongoose');

const cafewiseMenuSchema = new mongoose.Schema({
    hostel:{type:mongoose.Schema.Types.ObjectId,ref:"Hostel"},
    cafe:{type:mongoose.Schema.Types.ObjectId,ref:"CafeMaster"},
    item:{type:mongoose.Schema.Types.ObjectId,ref:"MasterMenu"},
    startTime:{type:Date},
    endTime:{type:Date},
    tat:{type:Number},
    seasonCharge:{type:Number},
    soldOut:{type:Boolean},
    active:{type:Boolean},
});

const CafewiseMenu = mongoose.model('CafewiseMenu', cafewiseMenuSchema);

module.exports = CafewiseMenu;