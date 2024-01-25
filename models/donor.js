const mongoose=require('mongoose');
const bcrypt=require('bcrypt');

const donorSchema=new mongoose.Schema({
    firstName:{
        type:String,
        required:true,
        trim:true
    },
    lastName:{
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
    medicinelist:{
        type: [{type:mongoose.Schema.Types.ObjectId,ref:'Medicine'}] 
    },
    hash_pass:{
        type:String,
        required:true
    },
    donorType:{
        type:String,
        required:true
    },
    role:{
        type:String,
        default:"donor"
    }
},{timestamps:true});

donorSchema.virtual('password').set(function(password){
    this.hash_pass=bcrypt.hashSync(password,10)
});

donorSchema.virtual('fullName').get(function(){
    return `${this.firstName} ${this.lastName}`;
})

donorSchema.methods={
    authenticate: function(password){
        return bcrypt.compareSync(password,this.hash_pass)
    }
}

module.exports=mongoose.model('Donor',donorSchema);