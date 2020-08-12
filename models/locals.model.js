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
        type: String,
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
    price : {
        type:Number,
        default:1,
        min:1,
        max:5
    },
    hours:{
        monday:{
            from:String,
            to:String,
            closed:Boolean
        },
        tuesday:{
            from:String,
            to:String,
            closed:Boolean
        },
        wednesday:{
            from:String,
            to:String,
            closed:Boolean
        },
        thursday:{
            from:String,
            to:String,
            closed:Boolean
        },
        friday:{
            from:String,
            to:String,
            closed:Boolean
        },
        saturday:{
            from:String,
            to:String,
            closed:Boolean
        },
        sunday:{
            from:String,
            to:String,
            closed:Boolean
        },
       
    },
    coors:{lat:String, lng:String},
    localsOnly:Boolean,
    images : [{type:String}],
    localTo: String,
    quick: {
        twentyOnePlus: Boolean,
        familyFriendly:Boolean,
        takeout:Boolean,
        dineIn:Boolean,
        delivery:Boolean,
        dogFriendly:Boolean
    },
    website:String,
    tel:String
},
    {
        timestamps: true,
    }
);

localSchema.index({ city: 1, state: 1, hashtags: -1 })
const Local = mongoose.model('Local', localSchema);

module.exports = Local;