const mongoose=require('mongoose');
const prodSchema=mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectID,
    name:String,
    country:String
});

module.exports=mongoose.model('Product',prodSchema);