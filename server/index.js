const express = require('express');
const { ApolloServer, gql } = require('apollo-server-express');
const mongoose = require('mongoose');
const { ObjectId } = mongoose.Types
const cors=require("cors")
const Destination = require('./models/destinationSchema');
const Hostel = require('./models/hostelSchema');
const dotenv=require("dotenv");
const MasterMenu = require('./models/masterMenuSchema');
const CafeMaster = require('./models/cafeMasterSchema');
const CafewiseMenu = require('./models/cafewiseMenuSchema');
const cafeOrder = require('./models/cafeOrders');

const app = express();
require('dotenv').config();
app.use(cors())
mongoose.connect(process.env.MONGO_URL);



 const typeDefs = gql`

 scalar Date

  type Destination {
    _id: ID!
    name: String!
    image: String
  }

  type Hostel {
    _id: ID!
    name: String!
    image: String
    destination: Destination!
  }

  # for practicing purpose
  type masterMenuType{
    _id:ID
    itemName:String
    itemCategory: String
  }

  input masterMenuInput{
    itemName: String
    itemCategory: String
  }

  type hostelData{
    _id:ID,
    name: String
  }

  type cafeData{
    _id:ID
    cafeName:String
  }

  type itemData {
    _id:ID
    itemName:String
    itemCategory:String
  }

  type cafeMasterType{
    _id:ID
    hostel: hostelData
    cafeName: String
  }

  input cafeMasterInput{
    hostel: ID
    cafeName: String
  }

  type cafewiseMenuType{
    _id:ID
    item:itemData
    hostel:hostelData
    cafe:cafeData
    startTime:Date
    endTime:Date
    tat:Int
    seasonCharge:Int
    soldOut:Boolean
    active:Boolean
  }

  input CafewiseMenuInput{
    item:ID
    hostel:ID
    cafe:ID
    startTime:Date
    endTime:Date
    tat:Int
    seasonCharge:Int
    soldOut:Boolean
    active:Boolean
  }
  
  type OutputType {
    _id:ID
    itemName:String
    itemCategory: String
    startTime: Date
    endTime: Date
    tat:Int
    seasonCharge:Int
    soldOut:Boolean
    active: Boolean
  }

#  till here 

  type Query {
    destinations: [Destination]
    hostelsByDestination(destinationId: ID!): [Hostel]
    hostelCountByDestination: [DestinationCount]
    getCafeMaster:[cafeMasterType]
    getMasterMenu:[masterMenuType]
    getCafewiseMenuBycafeId(cafeId:ID):[OutputType]
    getItemByArrayOfItemId(idlArray:[ID]):[cafewiseMenuType]
  }

  type DestinationCount {
    destination: Destination!
    count: Int!
  }

  input optionData {
    name:String
    price:Float
  }

  input itemDataInput {
    _id:ID
    itemName: String
    itemCategory:String
    quantity:Int
    price:Float,
    tax:Int
  }

  input orderInput {
    guestName:String
    mobileNo:String
    cafeId:ID
    reservationId:String
    item:[itemDataInput]
  }

  type orderOutput{
    totalPrice:Float
  }

  type Mutation {
    addDestination(name: String!, image: String): Destination
    addHostel(name: String!, image: String, destinationId: ID!): Hostel
    addMasterMenu(masterMenuInput:masterMenuInput) : masterMenuType
    addCafeMaster(cafeMasterInput:cafeMasterInput) : cafeMasterType
    addCafewiseMenu (cafewiseMenuInput:[CafewiseMenuInput]) : [cafewiseMenuType]
    createCafeOrder(orderInput:orderInput):orderOutput
  }
`



  
const resolvers = {
  Query: {
    destinations: async () => {
      return await Destination.find();
    },
    hostelsByDestination: async (_, { destinationId }) => {
      return await Hostel.find({ destination: destinationId });
    },
    hostelCountByDestination: async () => {
      const destinations = await Destination.find();
      const counts = [];

      for (const destination of destinations) {
        const count = await Hostel.countDocuments({ destination: destination._id });
        counts.push({
          destination,
          count,
        });
      }

      return counts;
    },

    getMasterMenu : async ()=>{
        return await MasterMenu.find()
    },

    getCafeMaster : async ()=>{
      return await CafeMaster.find().populate("hostel","_id name")
    },
    getCafewiseMenuBycafeId: async (_,{cafeId})=>{
      const data = await CafewiseMenu.find({cafe:cafeId}).populate("item","_id itemName itemCategory")
      const allItemData = await MasterMenu.find()

      console.log("data",data)
      const existingData= allItemData?.map((ele)=>{
        const findedData = data?.find((el)=>(ele?._id.toString()===el?.item?._id.toString()))

        return{ 
          _id:ele?._id,
          itemName:ele?.itemName,
          itemCategory:ele?.itemCategory,
          startTime: findedData?.startTime,
          endTime: findedData?.endTime,
          tat:findedData?.tat,
          seasonCharge:findedData?.seasonCharge,
          soldOut:findedData?.soldOut!==null ? findedData?.soldOut : false,
          active: findedData?.active!==null ? findedData?.active : false
        }
      })
       console.log(existingData)
      return existingData
    },
    getItemByArrayOfItemId:async(_,{idArray})=>{
      try {
        const data = await CafewiseMenu.find({item:{$in:idArray},active:true})
        return data
      } catch (error) {
        consolr.log(error)
      }
    }
  },

  Mutation: {
    addDestination: async (_, { name, image }) => {
      const newDestination = new Destination({ name, image });
      return await newDestination.save();
    },
    addHostel: async (_, { name, image, destinationId }) => {
      const newHostel = new Hostel({ name, image, destination: destinationId });
      return await newHostel.save();
    },

    addMasterMenu : async (_,{masterMenuInput})=>{
      const newMasterMenu =await MasterMenu.create(masterMenuInput)
      return newMasterMenu
    },

    addCafeMaster : async (_,{cafeMasterInput})=>{
      const cafeMasterData =await CafeMaster.create(cafeMasterInput)
      return cafeMasterData
    },

    addCafewiseMenu: async(_,{cafewiseMenuInput})=>{
      const addedData = await CafewiseMenu.insertMany(cafewiseMenuInput)
      return addedData
    },

    createCafeOrder: async(_,{orderInput})=>{
      try {
        const arrayOfIds = orderInput?.item?.map((el)=>(el?._id))
        console.log(arrayOfIds)
    //     reservationId:{type:String},
    // guestName:{type:String},
    // mobileNo:{type:String},
    // cafe:{type:mongoose.Schema.Types.ObjectId, ref:"CafeMaster"},
    // item:[{
    //     itemName:{type:String},
    //     itemCategory:{tye:String},
    //     price:{type:Number},
    //     quantity:{type:Number}
    // }],
    // totalPrice:{type:Number}
    let totalprice =0
    let totalTax=0
    let todayDate = new Date().toISOString()
        function generateOrderId(length) {
      var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
      var orderId = '';
      for (var i = 0; i < length; i++) {
        orderId += characters.charAt(Math.floor(Math.random() * characters.length));
      }
      return orderId;
    }
        const getArrayOfItems= async(cafeId,idArray)=>{
          const data = await CafewiseMenu.find({cafe:cafeId,item:{$in:idArray},active:true}).populate("item")
           const OutputArrayItem = orderInput?.item?.map((ele)=>{
            const filteredItem = data?.find((item)=>item?.item?._id==ele?._id)
            console.log(filteredItem)
            if(filteredItem){
            let Price= ele?.price * ele?.quantity
            let TaxPrice = Price * ele?.tax /100
            console.log(TaxPrice)
             totalprice+=Price+TaxPrice
             totalTax+=TaxPrice
             return {
             itemName:filteredItem?.item?.itemName,
             itemCategory:filteredItem?.item?.itemCategory,
             price:ele?.price,
             quantity:ele?.quantity,
             taxPercent:ele?.tax
             }}
           })

           return OutputArrayItem.filter(Boolean)
          
        }
        const itemArray = await getArrayOfItems(orderInput?.cafeId,arrayOfIds)

           await cafeOrder.create({orderId:generateOrderId(10),orderDate:todayDate,reservationId:orderInput?.reservationId,cafe:orderInput?.cafeId,guestName:orderInput?.guestName,mobileNo:orderInput?.mobileNo,item: itemArray,totalPrice:Number(totalprice),totalTax:totalTax})
          // console.log({orderId:generateOrderId(10),orderDate:todayDate,reservationId:orderInput?.reservationId,cafe:orderInput?.cafeId,guestName:orderInput?.guestName,mobileNo:orderInput?.mobileNo,item: itemArray,totalPrice:Number(totalprice),totalTax:totalTax})
        return {totalPrice:totalprice}

      } catch (error) {
        console.log(error)
      }
    }
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

async function startApolloServer() {
    await server.start();
  
    server.applyMiddleware({ app });
  
    const PORT = process.env.PORT || 4000;
  
    app.listen(PORT, () => {
      console.log(`Serer running at http://localhost:${PORT}${server.graphqlPath}`);
    });
  }
  
  startApolloServer();