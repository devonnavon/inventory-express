var Brand = require('../models/brand');
var Product = require('../models/product');

var async = require('async');

exports.brand_list = function (req, res, next) {
	Brand.find({}, 'name description').exec(function (err, list_brands) {
		if (err) {
			return next(err);
		}
		//Successful, so render
		res.render('brand_list', {
			title: 'Brand List',
			brand_list: list_brands,
		});
	});
};

exports.brand_detail = (req, res) => {
	async.parallel(
		{
			brand: function (callback) {
				Brand.findById(req.params.id).exec(callback);
			},

			brand_products: function (callback) {
				Product.find({ brand: req.params.id }).exec(callback);
			},
		},
		function (err, results) {
			if (err) {
				return next(err);
			}
			if (results.brand == null) {
				// No results.
				var err = new Error('brand not found');
				err.status = 404;
				return next(err);
			}
			// Successful, so render
			res.render('brand_detail', {
				title: 'Brand Detail',
				brand: results.brand,
				brand_products: results.brand_products,
			});
		}
	);
};

exports.brand_create_get = (req, res) => {
	res.send('Not yet! brand create get');
};

exports.brand_create_post = (req, res) => {
	res.send('Not yet! brand create post');
};

exports.brand_delete_get = (req, res) => {
	res.send('Not yet! brand delete get');
};

exports.brand_delete_post = (req, res) => {
	res.send('Not yet! brand delete post');
};

exports.brand_update_get = (req, res) => {
	res.send('Not yet! brand update get');
};

exports.brand_update_post = (req, res) => {
	res.send('Not yet! brand update post');
};
