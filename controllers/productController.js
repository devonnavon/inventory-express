var Product = require('../models/product');

exports.index = (req, res) => {
	res.send('NOT IMPLEMENTED: Site Home Page');
};

exports.product_list = (req, res) => {
	res.send('Not yet! product list');
};

exports.product_detail = (req, res) => {
	res.send('Not yet! product detail' + req.params.id);
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
