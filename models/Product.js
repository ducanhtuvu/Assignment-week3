const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema({
	id: { type: String} ,
	name: { type: String , text : true},
	image: String,
	thumbnail: String,
	shortDescription: { type: String, text : true },
	categoryId: {
		type: String,
		ref: 'Category'
	},
	salePrice: Number,
	originalPrice: Number,
	images: [String],
	thumbnails: [String],
});

const products = mongoose.model('products', productSchema);

module.exports = products;
