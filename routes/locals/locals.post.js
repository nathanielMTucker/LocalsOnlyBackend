let getAbbr = require('../globals').getAbbr;
let getState = require('../globals').getState;
let router = require('express').Router();
let Local = require('../../models/locals.model');

router.route('/').post((req, res)=>{
    console.log('Posting New Local');
    let {address, details, hours, coors} = req.body;
    let {
        description, 
        rating, 
        price, 
        tags, 
        imageName, 
        dinein, 
        takeout, 
        delivery, 
        family, 
        adult, 
        dog, 
        localsOnly
    } = details;
    const name = address.name;
    const tel = address.tel;
    const website = address.website;
    const quick = {
        twentyOnePlus: adult,
        familyFriendly: family,
        takeout: takeout,
        dineIn:dinein,
        delivery:delivery,
        dogFriendly:dog
    };
    
    // Local.findOne(
    //         { lat: }
    //     )
    const localTo = `${getAbbr(address.state)}:${address.city.toLowerCase().replace(' ', '_')}`;
    const hashtags = tags;
    const searchTags = [];
    hashtags.forEach(tag=>{
        var retag = tag.split(" ");
        retag.forEach(tag=>{
            tag = tag.toLowerCase();
            if(!searchTags.includes(tag))
                searchTags.push(tag.toLowerCase())
        });
    });
    const lat = coors.lat;
    const lng = coors.lng;
    const addressTags = [address.city.toLowerCase(), address.state.toLowerCase(), address.zip, getAbbr(address.state.toLowerCase())];
    console.log('Before: ' + [addressTags]);
    const newLocal = new Local({
        name,
        description,
        address, 
        hashtags,
        rating,
        price,
        addressTags,
        searchTags,
        lat,
        lng,
        hours,
        localTo,
        localsOnly,
        tel,
        website,
        quick
    });
    newLocal.save((err, local)=>{
        if(err){
            console.error(err);
            res.sendStatus(500)
        }else{
            console.log('After: ' + [local.addressTags]);
            res.json({id:local.id})
        }
    })
});
module.exports = router;