var express = require('express');
var router = express.Router();

var product_controller = require('../controllers/productController');
var category_controller = require('../controllers/categoryController');
var brand_controller = require('../controllers/brandController');

//PRODUCT ROUTES

router.get('/', product_controller.index);
// GET request for creating a product. NOTE This must come before routes that display product (uses id).
router.get('/product/create', product_controller.product_create_get);

// POST request for creating product.
router.post('/product/create', product_controller.product_create_post);

// GET request to delete product.
router.get('/product/:id/delete', product_controller.product_delete_get);

// POST request to delete product.
router.post('/product/:id/delete', product_controller.product_delete_post);

// GET request to update product.
router.get('/product/:id/update', product_controller.product_update_get);

// POST request to update product.
router.post('/product/:id/update', product_controller.product_update_post);

// GET request for one product.
router.get('/product/:id', product_controller.product_detail);

// GET request for list of all product items.
router.get('/products', product_controller.product_list);

//CATEGORY ROUTES
// GET request for creating a category. NOTE This must come before routes that display category (uses id).
router.get('/category/create', category_controller.category_create_get);

// POST request for creating category.
router.post('/category/create', category_controller.category_create_post);

// GET request to delete category.
router.get('/category/:id/delete', category_controller.category_delete_get);

// POST request to delete category.
router.post('/category/:id/delete', category_controller.category_delete_post);

// GET request to update category.
router.get('/category/:id/update', category_controller.category_update_get);

// POST request to update category.
router.post('/category/:id/update', category_controller.category_update_post);

// GET request for one category.
router.get('/category/:id', category_controller.category_detail);

// GET request for list of all category items.
router.get('/categories', category_controller.category_list);

//BRAND ROUTES

// GET request for creating a brand. NOTE This must come before route that displays brand (uses id).
router.get('/brand/create', brand_controller.brand_create_get);

//POST request for creating brand.
router.post('/brand/create', brand_controller.brand_create_post);

// GET request to delete brand.
router.get('/brand/:id/delete', brand_controller.brand_delete_get);

// POST request to delete brand.
router.post('/brand/:id/delete', brand_controller.brand_delete_post);

// GET request to update brand.
router.get('/brand/:id/update', brand_controller.brand_update_get);

// POST request to update brand.
router.post('/brand/:id/update', brand_controller.brand_update_post);

// GET request for one brand.
router.get('/brand/:id', brand_controller.brand_detail);

// GET request for list of all brand.
router.get('/brands', brand_controller.brand_list);

module.exports = router;
