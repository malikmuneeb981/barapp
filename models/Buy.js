const mongoose=require('mongoose')

const BuySchema= new mongoose.Schema({
    locknum:{
        type:Number,
        required:true
    },
    item:{
        type:String,
        required:true
    },
    ammount:{
        type:Number,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    Boughtdate:{
        type:Date,
        default:Date.now
    },

});
module.exports = Buy = mongoose.model("buy", BuySchema);