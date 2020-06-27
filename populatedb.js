var userArgs = process.argv.slice(2);
//mongodb+srv://noshi:noshi@cluster0-lwz6c.azure.mongodb.net/inventory?retryWrites=true&w=majority
var async = require('async');
var Product = require('./models/product');
var Category = require('./models/category');
var Brand = require('./models/brand');

var mongoose = require('mongoose');
var mongoDB = userArgs[0];
mongoose.connect(mongoDB, { useNewUrlParser: true });
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

var products = [];
var categories = [];
var brands = [];

const productCreate = (name, description, price, category, brand, cb) => {
	const product = new Product({ name, description, price, category, brand });
	product.save((err) => {
		if (err) {
			cb(err, null);
			return;
		}
		console.log('New Product: ' + product);
		products.push(product);
		cb(null, product);
	});
};

const categoryCreate = (name, description, cb) => {
	const category = new Category({
		name,
		description,
	});
	category.save((err) => {
		if (err) {
			cb(err, null);
			return;
		}
		console.log('New Category ' + category);
		categories.push(category);
		cb(null, category);
	});
};

const brandCreate = (name, description, cb) => {
	const brand = new Brand({
		name,
		description,
	});
	brand.save((err) => {
		if (err) {
			cb(err, null);
			return;
		}
		console.log('New Brand ' + brand);
		brands.push(brand);
		cb(null, brand);
	});
};

const createCategories = (cb) => {
	async.series(
		[
			(callback) => {
				categoryCreate(
					'Botanical Supplements',
					'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
					callback
				);
			},
			(callback) => {
				categoryCreate(
					'Bath and Body',
					'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
					callback
				);
			},
			(callback) => {
				categoryCreate(
					'Digestion',
					'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
					callback
				);
			},
			(callback) => {
				categoryCreate(
					'Teas',
					'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
					callback
				);
			},
			(callback) => {
				categoryCreate(
					'Foods',
					'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
					callback
				);
			},
			(callback) => {
				categoryCreate(
					'Skin Care',
					'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
					callback
				);
			},
			(callback) => {
				categoryCreate(
					'Self Care',
					'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
					callback
				);
			},
		],
		cb
	);
};

const createBrands = (cb) => {
	async.series(
		[
			(callback) => {
				brandCreate(
					'Fasting Culture',
					'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
					callback
				);
			},
			(callback) => {
				brandCreate(
					'Surya',
					'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
					callback
				);
			},
			(callback) => {
				brandCreate(
					'VPK',
					'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
					callback
				);
			},
			(callback) => {
				brandCreate(
					'Young Living',
					'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
					callback
				);
			},
			(callback) => {
				brandCreate(
					'Omni Blue Minerals',
					'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
					callback
				);
			},
			(callback) => {
				brandCreate(
					'Bass',
					'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
					callback
				);
			},
			(callback) => {
				brandCreate(
					'Pure Synergy',
					'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
					callback
				);
			},
			(callback) => {
				brandCreate(
					'Alkolol Company',
					'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
					callback
				);
			},
		],
		cb
	);
};

const createProducts = (cb) => {
	async.series(
		[
			(callback) => {
				productCreate(
					'Fasting Culture Diagnostics',
					'Next-gen medical-grade wellness testing from the comfort of your home.',
					20,
					categories[0],
					brands[0],
					callback
				);
			},
			(callback) => {
				productCreate(
					'Abhyanga Body Oil',
					'Therapeutic Massage and Body Oils for the Mind, Body, and Soul.',
					35,
					categories[1],
					brands[1],
					callback
				);
			},
			(callback) => {
				productCreate(
					'Bath Soaks',
					'Restorative and High Quality Bath Salts',
					35,
					categories[1],
					brands[1],
					callback
				);
			},
			(callback) => {
				productCreate(
					'Triphala',
					'Potent Antioxidant. Detoxification. Purification. Flatulence. ',
					20,
					categories[2],
					brands[2],
					callback
				);
			},
			(callback) => {
				productCreate(
					'Thieves Oil',
					'Immunity Boosting Essential Oil ',
					45,
					categories[0],
					brands[3],
					callback
				);
			},
			(callback) => {
				productCreate(
					'Surya Digestive Tea',
					'Delicious Dosha Balancing Digestive Tea',
					15,
					categories[3],
					brands[1],
					callback
				);
			},
			(callback) => {
				productCreate(
					'Super Immunity Tea',
					'Restorative Immunity Boosting Herbal Tea (18 bags) ',
					20,
					categories[3],
					brands[1],
					callback
				);
			},
			(callback) => {
				productCreate(
					'Surya Bread',
					'Delicious Health Promoting Gluten-Free Bread',
					15,
					categories[2],
					brands[1],
					callback
				);
			},
			(callback) => {
				productCreate(
					'Vegan Apple Surya Bread',
					'Delicious Health Promoting Gluten-Free Bread',
					5,
					categories[4],
					brands[1],
					callback
				);
			},
			(callback) => {
				productCreate(
					'Liquid Gold',
					'Therapeutic Anti-Aging Face Oil',
					180,
					categories[5],
					brands[1],
					callback
				);
			},
			(callback) => {
				productCreate(
					'Immunity Herbs',
					'Antiviral Immune Boosting Herbal Blend (55 pills)',
					25,
					categories[0],
					brands[1],
					callback
				);
			},
			(callback) => {
				productCreate(
					'Collagen Cream',
					'All Natural Therapeutic Face Cream',
					185,
					categories[5],
					brands[1],
					callback
				);
			},
			(callback) => {
				productCreate(
					'Churnas',
					'Delicious Spice Blends ',
					13,
					categories[4],
					brands[1],
					callback
				);
			},
			(callback) => {
				productCreate(
					'Ocean Blue Minerals',
					'Essential Minerals to Boost Immunity, Digestion, Sleep and Overall Health ',
					27,
					categories[0],
					brands[4],
					callback
				);
			},
			(callback) => {
				productCreate(
					'Ghee',
					'Powerful Organic Clarified Butter for Consumption and Skincare 16 oz.  &nbsp;',
					23,
					categories[6],
					brands[4],
					callback
				);
			},
			(callback) => {
				productCreate(
					'Dry Brush',
					'Face or Body Brush to Remove Dead Cells and Increase Blood Flow ',
					12,
					categories[1],
					brands[5],
					callback
				);
			},
			(callback) => {
				productCreate(
					'Gua Sha',
					'Tension and Pain Relieving Chinese Massage Tool ',
					9,
					categories[1],
					brands[5],
					callback
				);
			},
			(callback) => {
				productCreate(
					'Pure Radiance C',
					'Powerful Immune Boosting Vitamin C ',
					25,
					categories[0],
					brands[6],
					callback
				);
			},
			(callback) => {
				productCreate(
					'Alkalol Nasal Wash',
					'All Natural Fast Acting Sinus Relief ',
					24,
					categories[1],
					brands[7],
					callback
				);
			},
		],
		cb
	);
};

async.series(
	[createCategories, createBrands, createProducts],
	// Optional callback
	function (err, results) {
		if (err) {
			console.log('FINAL ERR: ' + err);
		} else {
			console.log('PRODUCTS: ' + products);
		}
		// All done, disconnect from database
		mongoose.connection.close();
	}
);
