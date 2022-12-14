const express = require("express");

const Category = require("../models/Category");

const Item = require("../models/Item");
const router = express.Router();
const fs = require("fs");
const multer = require("multer");
const path = require("path");
const jwt = require("jsonwebtoken");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage: storage });

router.post("/addcategory", upload.single("image"), async (req, res, next) => {
  try {
    const { title } = req.body;
    const istitle = await Category.findOne({
      title: title,
    });
    if (istitle) {
      return res.json({
        success: false,
        msg: "Category already exists",
        category: null,
      });
      //console.log("user exists");
    } else {
      // const password =
      const category = new Category({
        title: req.body.title,
        img: req.file.path,
      });

      await category.save(function (err) {
        if (err) {
          console.log(err);
          //console.log(req.file);
        } else {
          return res.status(200).json({
            success: true,
            msg: "Category Added Successfully",
            category: category,
          });
        }
      });
    }
  } catch (err) {
    console.log(err);
  }
});
router.get("/getcategories", async (req, res, next) => {
  try {
    const category = await Category.find({});

    if (!category) {
      return res.status(400).json({
        msg: "Something Went Wrong",
        success: false,
        categories: null,
      });
    } else {
      return res.status(200).json({
        msg: "Successfully Retrieved",
        success: true,
        categories: category,
      });
    }
  } catch (error) {
    console.log(error);
    next();
  }
});
router.post("/", async (req, res, next) => {
  const { title } = req.body;
  try {
    const findcategory = await Category.findOne({
      title: title,
    });
    if (!findcategory) {
      return res.status(400).json({
        success: false,
        msg: "Category does not not exists",
        token: null,
        user: null,
      });
    }
    const payload = {
      user: {
        id: findcategory.id,
      },
    };
    jwt.sign(
      payload,
      process.env.jwtusersecret,
      { expiresIn: 360000 },
      (err, token) => {
        if (err) throw err;
        else {
          return res.status(200).json({
            success: true,
            msg: "Correct Category",
            token: token,
            category: findcategory,
          });
        }
      }
    );
  } catch (err) {
    console.log(err);
  }
});
router.delete("/delcategory/:id", async (req, res, next) => {
  try {
    const findcat = await Category.findById(req.params.id);
    if (!findcat) {
      res.status(400).json({
        msg: "Category not found",
        success: false,
      });
    } else {
      const delcat = await Category.findByIdAndDelete(req.params.id);
      if (!delcat) {
        res.status(400).json({
          msg: "Something went wrong",
          success: false,
        });
      } else {
        res.status(200).json({
          msg: "Category Deleted successfully",
          success: true,
        });
      }
    }
  } catch (error) {
    console.log(error);
    next();
  }
});
router.put("/updatecategory/:id", upload.single("image"), async (req, res, next) => {
  try {
    const findcat = await Category.findById(req.params.id);
    if (!findcat) {
      return res.status(400).json({
        msg: "No category",
        success: false,
        category: null,
      });
    } else {
      // const category = Category({
      //   title: req.body.title,
      //   img: req.file.path,
      // });
      const updatecat = await Category.findByIdAndUpdate(
        req.params.id,{
        title: req.body.title,
        img: req.file.path,
      },
        {
          new: true,
          runValidators: true,
        }
      );
      if (!updatecat) {
        return res.status(200).json({
          msg: "Something went wrong",
          success: false,
          category: null,
        });
      }
      return res.status(200).json({
        msg: "Success",
        success: true,
        category: updatecat,
      });
    }
  } catch (err) {
    console.log(err);
    next();
  }
});
module.exports = router;
