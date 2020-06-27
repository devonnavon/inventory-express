var Product = require('../models/product');
var Brand = require('../models/brand');
var Category = require('../models/category');

var async = require('async');

exports.index = (req, res) => {
	async.parallel(
		{
			product_count: (callback) => {
				Product.countDocuments({}, callback); // Pass an empty object as match condition to find all documents of this collection
			},
			brand_count: (callback) => {
				Brand.countDocuments({}, callback);
			},
			category_count: function (callback) {
				Category.countDocuments({}, callback);
			},
		},
		function (err, results) {
			res.render('index', {
				title: 'Inventory Home',
				error: err,
				data: results,
			});
		}
	);
};

exports.product_list = function (req, res, next) {
	Product.find({}, 'name')
		.populate('brand category')
		.exec(function (err, list_products) {
			if (err) {
				return next(err);
			}
			//Successful, so render
			res.render('product_list', {
				title: 'Product List',
				product_list: list_products,
			});
		});
};

exports.product_detail = (req, res, next) => {
	Product.findById(req.params.id)
		.populate('category brand')
		.exec((err, product_details) => {
			if (err) {
				return next(err);
			}
			res.render('product_detail', {
				title: product_details.name,
				details: product_details,
			});
		});
};

exports.product_create_get = (req, res) => {
	res.send('Not yet! product create get');
};

exports.product_create_post = (req, res) => {
	res.send('Not yet! product create post');
};

exports.product_delete_get = (req, res) => {
	res.send('Not yet! product delete get');
};

exports.product_delete_post = (req, res) => {
	res.send('Not yet! product delete post');
};

exports.product_update_get = (req, res) => {
	res.send('Not yet! product update get');
};

exports.product_update_post = (req, res) => {
	res.send('Not yet! product update post');
};
