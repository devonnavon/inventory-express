var Product = require('../models/product');
var Brand = require('../models/brand');
var Category = require('../models/category');

const { body, validationResult } = require('express-validator/check');
const { sanitizeBody } = require('express-validator/filter');

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

exports.product_create_get = (req, res, next) => {
	async.parallel(
		{
			brands: function (callback) {
				Brand.find(callback);
			},
			categories: function (callback) {
				Category.find(callback);
			},
		},
		function (err, results) {
			if (err) {
				return next(err);
			}
			res.render('product_form', {
				title: 'Add Product',
				brands: results.brands,
				categories: results.categories,
			});
		}
	);
};

exports.product_create_post = [
	// Validate fields.
	body('name', 'name must not be empty.').trim().isLength({ min: 1 }),
	body('price', 'Price must not be empty.').trim().isLength({ min: 1 }),
	body('description', 'Description must not be empty.')
		.trim()
		.isLength({ min: 1 }),

	// Sanitize fields (using wildcard).
	sanitizeBody('*').escape(),

	// Process request after validation and sanitization.
	(req, res, next) => {
		// Extract the validation errors from a request.
		const errors = validationResult(req);

		// Create a Book object with escaped and trimmed data.
		var product = new Product({
			name: req.body.name,
			description: req.body.description,
			price: req.body.price,
			brand: req.body.brand,
			category: req.body.category,
		});

		if (!errors.isEmpty()) {
			// There are errors. Render form again with sanitized values/error messages.

			// Get all authors and genres for form.
			async.parallel(
				{
					brands: function (callback) {
						Brand.find(callback);
					},
					categories: function (callback) {
						Category.find(callback);
					},
				},
				function (err, results) {
					if (err) {
						return next(err);
					}

					// Mark our selected genres as checked.

					res.render('product_form', {
						title: 'Create Product',
						brands: results.brands,
						categories: results.categories,
						product: product,
						errors: errors.array(),
					});
				}
			);
			return;
		} else {
			// Data from form is valid. Save book.
			product.save(function (err) {
				if (err) {
					return next(err);
				}
				//successful - redirect to new book record.
				res.redirect(product.url);
			});
		}
	},
];

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
