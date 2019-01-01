var express = require('express');
var router = express.Router();
const users = require('../models/User')


	// GET (get all)
	router.get(`/`, (req, res) => {
		users.find({})
		.exec()
		.then(user => {
			// res.index.sendRest(products)
			res.render("users" ,{
				userList: user
			})
		})
		.catch(err => {
			res.index.sendRest(err)
		})
	});
  
	// POST (create)
	router.post(`/`, (req, res) => {
		users.create(req.body)
	    .then((user) =>{
		  res.sendRest(user);
	    })
	    .catch((err)=>{
		  res.sendRest(err);
	    })
	});
	// GET (get one)
	router.get(`/:id`, (req, res) => {
		const id = req.params.id;
		users.findById(id)
		.exec()
		.then((user) =>{
			res.render("userDetail" ,{
				userdetail: user
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
	    users.findByIdAndUpdate(id, updateBody, {runValidators: true})
	    .exec()
	    .then((user)=>{
		  res.sendRest({...user.toObject() , ...updateBody});
	    })
	    .catch((err)=>{
		  res.sendRest(err);
	    })
  
	});
  
	// DELETE (delete one)
	router.delete(`/:id`, (req, res) => {
	    // delete one document
	    const id = req.params.id;
	    users.findByIdAndRemove(id)
	    .exec()
	    .then((product) =>{
		  res.sendRest(product);        
	    })
	    .catch((err)=>{
		  res.sendRest(err);
	    })
	});


  module.exports = router;

