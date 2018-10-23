const Mongoose = require('mongoose');

const UserSchema = new Mongoose.Schema({
    firstName: {type: String, default: ''},
    lastName: {type: String, default: ''},
    email: {type: String, unique: true,},
    phone: {type: String, unique: true,},
    role: {type: String, enum: ['consumer', 'agent'], default: 'consumer'},
    location: {
        lat: {type: Number, default: 0},
        long: {type: Number, default: 0}
    },
    isAvailable: {type: Number, default: 1},
    addedOn: {type: Number, default: 0},
    modifiedOn: {type: Number, default: 0},
    isActive: {type: Number, default: 1},
    isDeleted: {type: Number, default: 0}
});

UserSchema.method({
    saveUser: function () {
        return this.save();
    }
});

UserSchema.static({
    getUser: function (queryObj, selectionKey, offset, limit) {
        return this.find(queryObj, selectionKey).skip(parseInt(offset)).limit(parseInt(limit)).exec();
    },
    updateUser: function (queryObj, updateObj) {
        return this.update(queryObj, {$set: updateObj}, {multi: true}).exec();
    }
});

/**
 * Register schema
 */
Mongoose.model('User', UserSchema);