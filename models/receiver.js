const mongoose=require('mongoose');
const bcrypt=require('bcrypt');

const receiverSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true
    },
    email:{
        type:String,
        unique:true,
        required:true,
        trim:true,
        lowercase:true
    },
    location:{
        type:String,
        required:true
    },
    hash_pass:{
        type:String,
        required:true
    },
    receiverType:{
        type:String,
        required:true
    },
    requestlist:{
        type: [{type:mongoose.Schema.Types.ObjectId,ref:'Request'}] 
    },
    role:{
        type:String,
        default:"receiver"
    }
},{timestamps:true});

receiverSchema.virtual('password').set(function(password){
    this.hash_pass=bcrypt.hashSync(password,10)
});

receiverSchema.methods={
    authenticate: function(password){
        return bcrypt.compareSync(password,this.hash_pass)
    }
}

module.exports=mongoose.model('Receiver',receiverSchema);