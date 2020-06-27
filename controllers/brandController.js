var Brand = require('../models/brand');
var Product = require('../models/product');

var async = require('async');
const validator = require('express-validator');

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

exports.brand_create_get = (req, res, next) => {
	res.render('brand_form', { title: 'Create Brand' });
};

exports.brand_create_post = [
	validator.body('name', 'Brand name required').trim().isLength({ min: 1 }),
	validator.sanitizeBody('name').escape(),

	validator
		.body('description', 'Brand description required')
		.trim()
		.isLength({ min: 3 }),
	validator.sanitizeBody('description').escape(),

	(req, res, next) => {
		const errors = validator.validationResult(req);
		const brand = new Brand({
			name: req.body.name,
			description: req.body.description,
		});
		if (!errors.isEmpty()) {
			res.render('brand_form', {
				title: 'Create Brand',
				brand: brand,
				errors: errors.array(),
			});
			return;
		} else {
			//form was valid so lets see if this exists
			Brand.findOne({ name: req.body.name }).exec((err, found_brand) => {
				if (err) return next(err);
				if (found_brand) res.redirect(found_brand.url);
				else {
					brand.save((err) => {
						if (err) return next(err);
						res.redirect(brand.url);
					});
				}
			});
		}
	},
];

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
