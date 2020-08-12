let router = require('express').Router();
let Local = require('../../models/locals.model');
let addressParser = require('parse-address-string');
let {getAbbr, getState} = require('../globals');
router.route('/').get((req,res)=>{
    Local.find()
        .then(locals => res.json(locals))
        .catch(err => res.status(400).json('Error: ' + err));
});
router.route('/card/:id').get((req, res) => {
    console.log("getting card id for page");

    var id = req.params.id;
    Local.findOne({ _id: id }).then(local => {
        res.json({
            name: local.name,
            desc: local.description,
            rating: local.rating,
            reviewCount: local.reviewCount,

        });
    }).catch(err => res.sendStatus(400).json(err));
});
router.route('/:id').get((req, res) => {
    console.log("getting id for page");

    var id = req.params.id;
    Local.findOne({ _id: id }).then(local => {
        res.json(local);
    }).catch(err => res.sendStatus(404).json(err));
});
let getIDs = (locals, localTo) => {
    let ids = [];
    
    console.log('A: '+locals[0].localTo);
        console.log('B: '+localTo);
    locals.forEach(local => {
        
            if(local.localsOnly){
                if(local.localTo === localTo){
                    ids.push({
                        id: local._id,
                        name: local.name,
                        description: local.description,
                        rating: local.rating,
                        reviewCount: local.reviewCount,
                        lat: local.coors.lat,
                        lng:local.coors.lng,
                        hours:local.hours,
                        address:local.address,
                        localTo:local.localTo,
                        localsOnly:local.localsOnly  
                    })
                }
            }else{
                ids.push({
                        id: local._id,
                        name: local.name,
                        description: local.description,
                        rating: local.rating,
                        reviewCount: local.reviewCount,
                        lat: local.coors.lat,
                        lng:local.coors.lng,
                        hours:local.hours,
                        address:local.address,
                        localTo:local.localTo,
                        localsOnly:local.localsOnly  
                    })
            }
        
        
    })
    return ids;
}

router.route('/h/:hashtags/a/:address/r/:role/l/:localTo').get((req,res)=>{
    console.log("getting in search");

    var address = []
    addressParser(req.params.address,(err, add)=>{
        if(!err){
            if(add.city !== null && add.city !== undefined)
            address = [...address, add.city.toLowerCase()];
        if(add.state !== null && add.state !== undefined){
            address = [...address, getState(add.state), getAbbr(add.state)];
        }
        if(add.postal_code !== null && add.postal_code !== undefined)
            address = [...address, add.postal_code];
    
    if(req.params.hashtags === 'all'){
        Local.find({addressTags:{$all:address}})
            .then(locals => {
                res.json(getIDs(locals, req.params.localTo))
            })
            .catch(err => res.sendStatus(404).json(err));
    }else{
        let hashtags = req.params.hashtags.toLowerCase().split(" ");
    
        Local.find({addressTags:{$all:address}, searchTags:{$elemMatch:{$in:hashtags}}})
            .then(locals => {
                res.json(getIDs(locals, req.params.localTo))
            })
            .catch(err => res.sendStatus(404).json(err));
    }
        }
     else{
         res.sendStatus(404).json(err);
     }  
    });
});


module.exports = router;