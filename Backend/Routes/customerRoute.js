const express = require('express');
const router = express.Router();
const Customer = require("../Models/customerShema");
   

router.get("/", async(req,res,next) => {
    let Customers;
    try{
        Customers = await Customer.find();
    }
    catch(err){
        console.log(err);
    }
    if (!Customers){
        return res.status(404).json({message:"No Customers Found."});
    }
    return res.status(200).json({Customers});

});

router.get("/:customerId/others", async(req,res,next) => {
    let Customers;
    try{
        Customers = await Customer.find({ _id: {$ne: req.params.customerId}});
    }
    catch(err){
        console.log(err);
    }
    if (!Customers){
        return res.status(404).json({message:"No Customers Found."});
    }
    return res.status(200).json({Customers});

});

router.get("/:customerId",async(req,res,next)=>{
    let customer;
    try{
        customer= await Customer.findById(req.params.customerId);
    }catch(err){
        console.log(err);
    }
    if (!customer){
        return res.status(404).json({message:"No Customer Found."});
    }
    return res.status(200).json({customer});

});
module.exports = router;