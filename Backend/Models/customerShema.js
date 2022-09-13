const mongoose=require('mongoose');


const userSchema = new mongoose.Schema ({
    name: {type :String ,required :true,trim: true},
    username: { type :String ,trim: true, unique: true},
    email: { type :String ,required :true,trim: true, unique: true},
    description: {type: String},
    profilePic: {
        type:String,
        default:'https://cdn-icons-png.flaticon.com/512/1946/1946429.png'
    }, 
    balance:{type :Number, required :true},
    },{timestamps: true});


const Customer= mongoose.model('Customer',userSchema);
module.exports = Customer;