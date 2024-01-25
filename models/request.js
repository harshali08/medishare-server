const mongoose=require('mongoose');

const requestSchema=new mongoose.Schema({
    receiver:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Receiver',
        required: true
    },
    medicine:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Medicine',
        required: true
    },
    quantity:{
        type:Number,
        required:true
    },
    accept:{
        type:Boolean,
        default:false
    },
},{timestamps:true});

module.exports=mongoose.model('Request',requestSchema);