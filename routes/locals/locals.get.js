let router = require('express').Router();
let Local = require('../../models/locals.model');
let addressParser = require('parse-address-string');

router.route('/').get((req,res)=>{
    Local.find()
        .then(locals => res.json(locals))
        .catch(err => res.status(400).json('Error: ' + err));
});
router.route('/card/:id').get((req, res)=>{
    console.log("getting card id for page");
    
    var id = req.params.id;
    Local.findOne({_id: id}).then(local => {
        res.json({
            name: local.name,
            desc: local.description,
            rating: local.rating,
            reviewCount: local.reviewCount,
            
        });
    }).catch(err => res.sendStatus(400).json(err));
});
router.route('/:id').get((req, res)=>{
    console.log("getting id for page");
    
    var id = req.params.id;
    Local.findOne({_id: id}).then(local => {
        res.json(local);
    }).catch(err => res.sendStatus(404).json(err));
});
let getIDs = (locals) => {
    let ids = [];
    locals.forEach(local => {
        ids.push({
            id: local._id,
            name: local.name,
            description: local.description,
            rating: local.rating,
            reviewCount: local.reviewCount,
            lat: local.lat,
            lng:local.lng
        })
    })
    return ids;
}
router.route('/hashtags/:hashtags/address/:address').get((req,res)=>{
    console.log("getting in search");
    
    var address = []
    addressParser(req.params.address,(err, add)=>{

        if(add.city !== null && add.city !== undefined)
            address = [...address, add.city.toLowerCase()];
        if(add.state !== null && add.state !== undefined)
            address = [...address, add.state.toLowerCase()];
        if(add.postal_code !== null && add.postal_code !== undefined)
            address = [...address, add.postal_code.toLowerCase()];
    
    if(req.params.hashtags === 'all'){
        Local.find({addressTags:{$all:{$in:address}}})
            .then(locals => {
                res.json(getIDs(locals))
            })
            .catch(err => res.sendStatus(404).json(err));
    }else{
        let hashtags = req.params.hashtags.toLowerCase().split(" ");
    
        Local.find({addressTags:{$all:{$in:address}}, searchTags:{$elemMatch:{$in:hashtags}}})
            .then(locals => {
                res.json(getIDs(locals))
            })
            .catch(err => res.sendStatus(404).json(err));
    }
    });
});


module.exports = router;