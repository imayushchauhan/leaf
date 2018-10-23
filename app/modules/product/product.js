const Mongoose = require('mongoose');

const ProductSchema = new Mongoose.Schema({
    name: {type: String, default: ''},
    price: {type: String, default: ''},
    addedOn: {type: Number, default: 0},
    modifiedOn: {type: Number, default: 0},
    isActive: {type: Number, default: 1},
    isDeleted: {type: Number, default: 0},
});

ProductSchema.method({
    saveProduct: function() {
        return this.save();
    }
});

ProductSchema.static({
    getProduct: function(queryObj, selectionKey, offset, limit){
        return this.find(queryObj, selectionKey).skip(parseInt(offset)).limit(parseInt(limit)).exec();
    },
    updateProduct: function (queryObj, updateObj) {
        return this.update(queryObj, {$set: updateObj}, {multi: true}).exec();
    },
});

/**
 * Register schema
 */
Mongoose.model('Product', ProductSchema);