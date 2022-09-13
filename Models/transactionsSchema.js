const mongoose=require('mongoose');


const transactionSchema = new mongoose.Schema ({
    from: {type :String ,required :true,trim: true},
    to: {type :String ,required :true,trim: true},
    amount: {type:Number ,required:true, trim:true},
    
    },{timestamps: true});


const Transaction= mongoose.model('Transaction',transactionSchema);
module.exports = Transaction;