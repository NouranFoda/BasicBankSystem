const express = require('express');
const router = express.Router();
const Transaction = require("../Models/transactionsSchema");
const Customer = require("../Models/customerShema");

router.get("/", async(req,res,next) => {
    let Transactions ;
    try{
        Transactions = await Transaction.find();
    }
    catch (err){
        console.log(err);
    }
    if (!Transactions){
        return res.status(404).json({Message:"No Previous Transactions Found."});
    }
    return res.status(200).json({Transactions});

});
router.post("/add",async(req,res,next)=>{
    const { to , from , amount} = req.body;
    if (!to || !from || !amount)
        return res.status(400).json({Message:"Invalid body"});

    ///////////////////
    let toCustomer,fromCustomer;
    try{
        toCustomer = await Customer.findOne({"username":to});
        fromCustomer = await Customer.findOne({"username":from});
        if (!toCustomer || !fromCustomer || fromCustomer.balance < amount)
            return res.status(500).json({message:"Unable to process Transaction. Transfer amount exceeds your current bank balance"});
    }catch(err){
        console.log(err);
    }
    /////////////////////
    let fromBalance = fromCustomer.balance - parseInt(amount) ;
    let toBalance= toCustomer.balance + parseInt(amount);
    try{
        await Customer.updateOne({"username":to},{balance:toBalance});
        await Customer.updateOne({"username":from},{balance:fromBalance});

    }catch(err){
        console.log(err);
    }
    /////////////////////
    let transaction;
    try{
        transaction = new Transaction({
            to,
            from,
            amount,
        });
        await transaction.save();
    }
    catch(err){
        console.log(err);
    }
    if (!transaction){
        return res.status(500).json({message:"Unable to process Transaction"})
    }
    return res.status(201).json({transaction});
    

});

module.exports = router;