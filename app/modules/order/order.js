const Mongoose = require('mongoose');

const OrderSchema = new Mongoose.Schema({
    product: {type: Mongoose.Schema.Types.ObjectId, ref: 'Product'},
    consumer: {type: Mongoose.Schema.Types.ObjectId, ref: 'User'},
    agent: {type: Mongoose.Schema.Types.ObjectId, ref: 'User'},
    status: {type: String, enum: ['placed', 'out_for_delivery', 'delivered'], default: 'placed'},
    addedOn: {type: Number, default: 0},
    modifiedOn: {type: Number, default: 0},
    isActive: {type: Number, default: 1},
    isDeleted: {type: Number, default: 0},
});

OrderSchema.method({
    saveOrder: function () {
        return this.save();
    }
});

OrderSchema.static({
    getOrder: function (queryObj, selectionKey, offset, limit) {
        return this.find(queryObj, selectionKey).skip(parseInt(offset)).limit(parseInt(limit)).exec();
    },
    updateOrder: function (queryObj, updateObj) {
        return this.update(queryObj, {$set: updateObj}, {multi: true}).exec();
    },
});

/**
 * Register schema
 */
Mongoose.model('Order', OrderSchema);