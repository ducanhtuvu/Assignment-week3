var express = require('express');
var router = express.Router();
const Product = require('../models/Product')

router.get('/create', function(req, res) {
	res.render('productform');
});
router.get(`:`, (req, res) => {
	const searchString = JSON.parse(req.query.filter);
	const salePrices = JSON.stringify(searchString['where']['salePrice']);
	const offset = searchString['offset'];
	const limit = searchString['limit'];
	console.log(`${offset}`);
	Product.find({
		"salePrice":salePrices,
	})
	.limit(limit)
	.skip(offset)
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
});
	// GET (get all)
	router.get(`/`, (req, res) => {
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
	});
  
	// POST (create)
	router.post(`/`, (req, res) => {
	    Product.create(req.body)
	    .then((product) =>{
		res.render("productDetail" ,{
			productdetail: product
		})
	})      
	    .catch((err)=>{
		  res.sendRest(err);
	    })
	});
	// GET (get one)
	router.get(`/:id`, (req, res) => {
		const id = req.params.id;
		Product.findById(id)
		.exec()
		.then((product) =>{
			res.render("productDetail" ,{
				productdetail: product
			})      
		})
		.catch((err)=>{
		    res.sendRest(err);
		})
	});
  
	// PATCH (update one)
	router.patch(`/:id`, (req, res) => {
	    const id = req.params.id;
	    // update one document
  
	    const updateBody = req.body;
	    Product.findByIdAndUpdate(id, updateBody, {runValidators: true})
	    .exec()
	    .then((product)=>{
		  res.sendRest({...product.toObject() , ...updateBody});
	    })
	    .catch((err)=>{
		  res.sendRest(err);
	    })
  
	});
  
	// DELETE (delete one)
	router.delete(`/:id`, (req, res) => {
	    // delete one document
	    const id = req.params.id;
	    Product.findByIdAndRemove(id)
	    .exec()
	    .then((product) =>{
		  res.sendRest(product);        
	    })
	    .catch((err)=>{
		  res.sendRest(err);
	    })
	});

	

  module.exports = router;

