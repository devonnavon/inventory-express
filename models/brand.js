//var moment = require('moment');
var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var BrandSchema = new Schema({
	name: { type: String, required: true },
	description: { type: String, required: true },
});

// Virtual for brand's URL
BrandSchema.virtual('url').get(function () {
	return '/inventory/brand/' + this._id;
});

module.exports = mongoose.model('Brand', BrandSchema);
