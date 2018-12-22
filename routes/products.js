var express = require('express');
var router = express.Router();
const Product = require('../models/Product')

// GET /api/products
router.get('/', (req, res) => {
	Product.find({})
		.exec()
		.then(products => {
			// res.index.sendRest(products)
			res.render("products" ,{
				productsList: products
			})
		})
		.catch(err => {
			res.index.sendRest(err)
		})
})

router.get(`/products/:id`, (req, res) => {
	const id = req.params.id;
	Product.findById(id)
	.exec()
	.then((Product) =>{
		res.index.sendRest(products)
		/*
		res.render("productDetail" ,{
			productdetail: Product
		}) */      
	})
	.catch((err)=>{
	    res.sendRest(err);
	})
  });

module.exports = router;
