const mongoose = require('mongoose');
const AdminSchema = new mongoose.Schema({
    name:{
        type:String,
        required : true,
    },
    lastname:{
        type:String,
        required : true,
    },
    email:{
        type:String,
        default:null,
        required : true,
        unique:true,
    },
    

    mdp:{
        type:String,
        required : true,
    },
    image:{
        type:String,
        
    },
    role:{
        type:String,
        required : true,
    }



});
module.exports=mongoose.model('admin',AdminSchema);
