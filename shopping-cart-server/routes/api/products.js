const express = require("express");
const router = express.Router();
const Product = require("../../schemas/productSchema");

router.get("/", (req, res) => {
  Product.find().then(products => {
    res.json({
      products
    });
  });
});

router.post("/addproduct", (req, res) => {
  Product.create({
    imageURL: req.body.imageURL,
    title: req.body.title,
    description: req.body.description,
    price: req.body.price
  }).then(savedProduct => {
    //console.log(savedPost)
    res.json(savedProduct);
  });
});
module.exports = router;
