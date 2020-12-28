const mongoose=require('mongoose');
const prodSchema=mongoose.Schema({
    
    name:String,
    country:String
});

module.exports=mongoose.model('Product',prodSchema);