let router = require('express').Router();
let User = require('../../models/user.model');

router.route('/:id').get((req, res)=>{
    console.log(req.params.id);
    console.log('Getting User ID');
    User.find({authID:req.params.id}).then(user=>{
        console.log(`User details ${user}`);
        res.json(user);
    }).catch(err=>{
        error(err);
    })
})
module.exports = router;