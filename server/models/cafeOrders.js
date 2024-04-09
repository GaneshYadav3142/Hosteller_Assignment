const mongoose = require("mongoose")


const cafeOrderSchema = new mongoose.Schema({
    orderId:{type:String},
    orderDate:{type:Date},
    reservationId:{type:String},
    guestName:{type:String},
    mobileNo:{type:String},
    cafe:{type:mongoose.Schema.Types.ObjectId, ref:"CafeMaster"},
    item:[{
        itemName:{type:String},
        itemCategory:{type:String},
        price:{type:Number},
        quantity:{type:Number},
        taxPercent:{type:Number}
    }],
    totalPrice:{type:Number},
    totalTax:{type:Number},
    orderStatus:{type:String,default:"Pending"},
    paymentStatus:{type:String,default:"init"}
})

const cafeOrder= mongoose.model("CafeOrder",cafeOrderSchema)

module.exports= cafeOrder