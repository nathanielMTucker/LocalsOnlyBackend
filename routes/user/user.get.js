let router = require('express').Router();
let User = require('../../models/locals.model');

router.route('/:id').get((req, res)=>{
    User.findOne({authID:req.params.id}).then(user=>{
        res.json(user);
    }).catch(err=>{
        error(err);
    })
})
module.exports = router;