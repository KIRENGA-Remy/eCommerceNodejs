const router = require('express').Router();
const Products = require('../model/products.js');

router.get("/", async (req,res) => {
    const data = await Products.find({});
    res.send(JSON.stringify(data));
})

module.exports = router;