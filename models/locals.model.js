const mongoose = require('mongoose');
const S = mongoose.Schema;

const localSchema = new S({
    name: {
        type: String,
        required: true
    },

    description: {
        type: String,
        required: true
    },

    reviews: [{
        user: String,
        rating: {
            type: Number,
            required: true,
            min: 1,
            max: 5
        },
        body: String,
        date: {
            type: Date,
            default: Date.now
        },
        required: false
    }],

    reviewCount: {
        type: Number,
        default: 1
    },

    date: {
        type: Date,
        default: Date.now,
        required: false
    },

    hashtags: [{
        type: String,
        required: false,
    }],
    addressTags: [{
        type: Array,
        required: false
    }],
    searchTags: [{
        type: String,
        required: false
    }],
    address: {
        street: String,
        apt: {
            type: String,
            required: false,
        },
        city: String,
        state: String,
        zip: String,
    },

    rating: {
        type: Number,
        default: 1,
        min: 1,
        max: 5
    },
    lat: String,
    lng: String,

    // image : {
    //     required: false,
    //     data:Buffer,
    //     contentType: String
    // }
},
    {
        timestamps: true,
    }
);

localSchema.index({ city: 1, state: 1, hashtags: -1 })
const Local = mongoose.model('Local', localSchema);

module.exports = Local;