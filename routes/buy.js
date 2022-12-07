const express=require('express')
const router=express.Router()
const Buy=require('../models/Buy')


router.post('/buyitem',async(req,res,next)=>{
    try {

     const buy=new Buy({
        locknum:req.body.locknum,
        item:req.body.item,
        price:req.body.price,
        ammount:req.body.ammount
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
router.post('/customerrecord',async(req,res,next)=>{
    try {
        const {lockernum}=req.body
        const record=await Buy.find({
            locknum:lockernum
        })
        if(!record)
        {
          return  res.status(400).json({
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
router.get('/geteveryrecord', async (req, res)=> {
        var arr = [];
        Buy.find({}, function (err, docs) {
           
            if(err)
            {
            console.log(err);
            }
            else
            {
            for(var doc in docs)
            {

                return res.json({
                    docs:docs
                })
               
            }
            }
            
           
        });
   
});
router.delete('/delrecord',async(req,res,next)=>{


    try{
        const { lockernum } = req.body;
        const findrecord= await Buy.find({
            locknum:lockernum
        })
        if(!findrecord)
        {
            return res.status(200).json({
                msg:"Record Not Found",
                success:false,
            
            })
        }
        else
        {
            const delrecord = await Buy.deleteMany({ locknum: lockernum });
            if(!delrecord)
            {
                res.status(400).json({
                    msg:"Something went wrong",
                    success:false
                })
                
            }
            else
            {
                res.status(200).json({
                    msg:"Deleted Successfully",
                    success:true
                })
            }
        }

    }
    catch(error)
    {
        console.log(error);
    }
})
router.get('/getallrecord',async(req,res,next)=>{
    try {
        const findall=Buy.f
    } catch (error) {
        
    }
})
module.exports=router
