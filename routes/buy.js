const express=require('express')
const router=express.Router()
const Buy=require('../models/Buy')


router.post('/buyitem',async(req,res,next)=>{
    try {

     const buy=new Buy({
        locknum:req.body.locknum,
        item:req.body.item,
        price:req.body.price
     })
     await buy.save(function (err){
        if(err)
        {
            console.log(err);
             return res.status(200).json({
               msg: "Something went wrong",
               success: false,
               buyinfo: null,
             });
        }
        else
        {
            return res.status(200).json({
                msg:"Bought Successfully",
                success:true,
                buyinfo:buy
            })
        }

     })
        
    } catch (error) {
        console.log(error);
    }
})
router.get('/customerrecord',async(req,res,next)=>{
    try {
        const {lockernum}=req.body
        const record=await Buy.find({
            locknum:lockernum
        })
        if(!record)
        {
          return  res.status(200).json({
                msg:"Record Not Found",
                success:false,
                record:null

            })
        }
        else
        {
            return res.status(200).json({
                msg:"Record Found",
                success:true,
                record:record
            })
        }
        
    } catch (error) {
        console.log(error);
    }
})
module.exports=router