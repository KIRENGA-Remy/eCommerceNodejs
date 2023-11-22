const productModel = require('../model/products.js');
const router = require('express').Router();
router.post("/", async (req,res) => {
    try {
        const newProduct = new productModel({
            name: req.body.name,
            category: req.body.category,
            image: req.body.image,
            price: req.body.price,
            description: req.body.description
        })
        const savedProducts = await newProduct.save();
        console.log(savedProducts);
        res.status(201).json({ message: "Product successfully created",alert: true , data: savedProducts})
    } catch (err) {
        res.status(500).json({message: "Failed to create any product", alert: false})
    }
})

module.exports = router;