const Category = require('../models/category');
const Product = require('../models/product');

const async = require('async');
const validator = require('express-validator');

exports.category_list = (req, res) => {
	Category.find({}, 'name description').exec(function (err, list_categories) {
		if (err) {
			return next(err);
		}
		//Successful, so render
		res.render('category_list', {
			title: 'Category List',
			category_list: list_categories,
		});
	});
};

// Display detail page for a specific category.

exports.category_detail = function (req, res, next) {
	async.parallel(
		{
			category: function (callback) {
				Category.findById(req.params.id).exec(callback);
			},

			category_products: function (callback) {
				Product.find({ category: req.params.id }).exec(callback);
			},
		},
		function (err, results) {
			if (err) {
				return next(err);
			}
			if (results.category == null) {
				// No results.
				var err = new Error('category not found');
				err.status = 404;
				return next(err);
			}
			// Successful, so render
			res.render('category_detail', {
				title: 'category Detail',
				category: results.category,
				category_products: results.category_products,
			});
		}
	);
};

exports.category_create_get = (req, res, next) => {
	res.render('category_form', { title: 'Create Category' });
};

exports.category_create_post = [
	validator.body('name', 'Category name required').trim().isLength({ min: 1 }),
	validator.sanitizeBody('name').escape(),

	validator
		.body('description', 'Category description required')
		.trim()
		.isLength({ min: 3 }),
	validator.sanitizeBody('description').escape(),

	(req, res, next) => {
		const errors = validator.validationResult(req);
		const category = new Category({
			name: req.body.name,
			description: req.body.description,
		});
		if (!errors.isEmpty()) {
			res.render('category_form', {
				title: 'Create Category',
				category: category,
				errors: errors.array(),
			});
			return;
		} else {
			//form was valid so lets see if this exists
			Category.findOne({ name: req.body.name }).exec((err, found_category) => {
				if (err) return next(err);
				if (found_category) res.redirect(found_category.url);
				else {
					category.save((err) => {
						if (err) return next(err);
						res.redirect(category.url);
					});
				}
			});
		}
	},
];

exports.category_delete_get = (req, res) => {
	res.send('Not yet! category delete get');
};

exports.category_delete_post = (req, res) => {
	res.send('Not yet! category delete post');
};

exports.category_update_get = (req, res) => {
	res.send('Not yet! category update get');
};

exports.category_update_post = (req, res) => {
	res.send('Not yet! category update post');
};
