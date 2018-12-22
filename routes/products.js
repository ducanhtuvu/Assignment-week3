var express = require('express');
var router = express.Router();
const Product = require('../models/Product')

function wrapJson(body) {
	if (body instanceof Error) {
		return {
			header: {
				status: 400,
				errorMessage: `${body.name}: ${body.message}`,
				currentDate: new Date(),
			},
			body,
		}
	}

	return {
		header: {
			status: 200,
			errorMessage: '',
			currentDate: new Date(),
			count: Array.isArray(body) ? body.length : body ? 1 : 0,
		},
		body,
	}
}

// a middleware to enhance res object
router.use((req, res, next) => {
	// attach a new method `sendRest` to res object for later use
	res.sendRest = body => {
		if (body instanceof Error) {
			res.statusCode = 400
		}
		return res.json(wrapJson(body))
	}
	next()
})


// GET /api/products
router.get(`/`, (req, res) => {
	Product.find({})
		.exec()
		.then(products => {
			res.sendRest(products)
		})
		.catch(err => {
			res.sendRest(err)
		})
})

module.exports = router;
