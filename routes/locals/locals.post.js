let getAbbr = require('../globals').getAbbr;
let getState = require('../globals').getState;
let router = require('express').Router();
let Local = require('../../models/locals.model');

router.route('/').post((req, res)=>{
    let {name, description, address, hashtags, rating, lat, lng, hours, localsOnly, } = req.body;
    // Local.findOne(
    //         { lat: }
    //     )
    hashtags = [name, ...hashtags];
    const searchTags = [];
    hashtags.forEach(tag=>{
        var retag = tag.split(" ");
        retag.forEach(tag=>{
            tag = tag.toLowerCase();
            if(!searchTags.includes(tag))
                searchTags.push(tag.toLowerCase())
        });
    });
    const addressTags = [address.city.toLowerCase(), address.state.toLowerCase(), address.zip, getAbbr(address.state)];
    const newLocal = new Local({
        name,
        description,
        address, 
        hashtags,
        rating,
        addressTags,
        searchTags,
        lat,
        lng,
        hours,
        localsOnly
    });
    newLocal.save((err, local)=>{
        if(err){
            console.error(err);
            res.sendStatus(500)
        }else{
            res.json({id:local.id})
        }
    })
});
module.exports = router;