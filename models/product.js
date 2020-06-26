var moment = require('moment');
var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var ProductSchema = new Schema({
	name: { type: String, required: true },
	description: { type: String, required: true },
	price: { type: Number, required: true },
	category: { type: Schema.Types.ObjectId, ref: 'Category' },
	brand: { type: Schema.Types.ObjectId, ref: 'Brand' },
});

// Virtual for products's URL
ProductSchema.virtual('url').get(function () {
	return '/inventory/product/' + this._id;
});

module.exports = mongoose.model('Product', ProductSchema);
