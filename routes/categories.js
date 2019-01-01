var express = require('express');
var router = express.Router();
const Categories = require('../models/Category')

	// GET (get all)
	router.get(`/`, (req, res) => {
		Categories.find({})
		.exec()
		.then(categories => {
			// res.index.sendRest(products)
			res.render("categories" ,{
				categoriesList : categories
			})
		})
		.catch(err => {
			res.index.sendRest(err)
		})
	});
  
	// POST (create)
	router.post(`/`, (req, res) => {
		Categories.create(req.body)
	    .then((categories) =>{
		  res.sendRest(categories);
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
	    Categories.findByIdAndUpdate(id, updateBody, {runValidators: true})
	    .exec()
	    .then((categories)=>{
		  res.sendRest({...categories.toObject() , ...updateBody});
	    })
	    .catch((err)=>{
		  res.sendRest(err);
	    })
  
	});
  
	// DELETE (delete one)
	router.delete(`/:id`, (req, res) => {
	    // delete one document
	    const id = req.params.id;
	    Categories.findByIdAndRemove(id)
	    .exec()
	    .then((categories) =>{
		  res.sendRest(categories);        
	    })
	    .catch((err)=>{
		  res.sendRest(err);
	    })
	});


  module.exports = router;

