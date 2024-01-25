const mongoose=require('mongoose');

const medicineSchema=new mongoose.Schema({
    donor:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Donor',
        required: true
    },
    name:{
        type:String,
        required:true,
        trim:true
    },
    mf_date:{
        type:Date,
        required:true
    },
    exp_date:{
        type:Date,
        required:true
    },
    illness:{
        type:String,
        required:true,
        trim:true
    },
    quantity:{
        type:Number,
        required:true
    },
    approval:{
        type:Boolean,
        default:false
    },
},{timestamps:true});

module.exports=mongoose.model('Medicine',medicineSchema);