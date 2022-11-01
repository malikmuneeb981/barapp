const express = require("express");

const Item = require("../models/Item");
const router = express.Router();

const auth = require("../middleware/user_jwt");
const fs = require("fs");
const multer = require("multer");
const path = require("path");
const jwt = require("jsonwebtoken");
const Category = require("../models/Category");



const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage: storage });


router.post("/additem",upload.single("image"),async(req,res,next)=>{
  try{
    //const {title}=req.body
    const findcategory=await Category.findOne({
      title:req.body.category
    })
    if(!findcategory)
    {
      return res.status(400).json({
        msg:"Category not found",
        success:false,
        category:null,
        item:null
      })

    }
    else
    {
      const finditem=await Item.findOne({
        title:req.body.title
      })
      if(finditem)
      {
        return res.status(400).json({
          msg: "Item Already exists",
          success: false,
          item: null,
        });
      }
      else{
      
       
      
      const item=await Item.create({
        title:req.body.title,
        price:req.body.price,
        img:req.file.path,
        category:findcategory.title
      })
      if(item)
      {
        return res.status(200).json({
          msg:"Item Added Successfully",
          success:true,
         
          item:item
        })
      }
      else
      {
        return res.status(400).json({
          msg: "Item Not Added",
          success: false,
          item: null,
        });
      }
    }
    }
  

  }
  catch(err)
  {
    console.log(err);
    next()
  }
})
router.post("/getitems",async(req,res,next)=>{
  try {
 
    const {title}=req.body
    const finditem= await Item.find({
      category:title
    })
    if(!finditem)
    {
      res.status(400).json({
        msg:"Something went wrong",
        success:false,
        item:null
      })
    }
    else
    {
      res.status(200).json({
        msg: "Items Found",
        success: true,
        item: finditem,
      });
    }




    
  } catch (error) {
    console.log(error);
    next
  }
})
router.get("/getallitems", async (req, res, next) => {
  try {
    
    const finditem = await Item.find({});
    if (!finditem) {
      res.status(400).json({
        msg: "Something went wrong",
        success: false,
        item: null,
      });
    } else {
      res.status(200).json({
        msg: "Items Found",
        success: true,
        item: finditem,
      });
    }
  } catch (error) {
    console.log(error);
    next;
  }
});
router.put("/updateitem/:id", upload.single("image"), async (req, res, next) => {
  try {
    const finditem = await Item.findById(req.params.id);
    if (!finditem) {
      return res.status(400).json({
        msg: "No Item",
        success: false,
        item: null,
      });
    } else {
      const updateitem = await Item.findByIdAndUpdate(
        req.params.id,
        {
          title: req.body.title,
          img: req.file.path,
          price:req.body.price
        },
        {
          new: true,
          runValidators: true,
        }
      );
      if (!updateitem) {
        return res.status(400).json({
          msg: "Something went wrong",
          success: false,
          item: null,
        });
      }
      return res.status(200).json({
        msg: "Successfully updated",
        success: true,
        item: updateitem,
      });
    }
  } catch (err) {
    console.log(err);
    next();
  }
});
router.delete("/delitem/:id", async (req, res, next) => {
  try {
    const finditem = await Item.findById(req.params.id);
    if (!finditem) {
      res.status(400).json({
        msg: "Item not found",
        success: false,
      });
    } else {
      const delcat = await Item.findByIdAndDelete(req.params.id);
      if (!delcat) {
        res.status(400).json({
          msg: "Something went wrong",
          success: false,
        });
      } else {
        res.status(200).json({
          msg: "Item Deleted successfully",
          success: true,
        });
      }
    }
  } catch (error) {
    console.log(error);
    next();
  }
});
//router.put("")















// router.post(
//   "/additem",
//   auth,
//   upload.single("image"),
//   async (req, res, next) => {
//     try {
//       const { title } = req.body;
//       const istitle = await Item.findOne({
//         title: title,
//       });
//       if (istitle) {
//         return res.json({
//           success: false,
//           msg: "Item already exists",
//           item: null,
//         });
//         //console.log("user exists");
//       } else {
//         // const password =

//         const item = await Item.create({
//           title: req.body.title,
//           price: req.body.price,
//           img: req.file.path,
//           category: req.category.id
//         });
//         if (!item) {
//           return res.status(400).json({
//             success: false,
//             msg: "Item Not Created",
//             item: null,
//           });
          
//         } else {
//           return res.status(200).json({
//             success: true,
//             msg: "Item Added Successfully",
//             item: item,

//           });
//         }
//       }
//     } catch (err) {
//       console.log(err);
//     }
//   }
// );
module.exports = router;
