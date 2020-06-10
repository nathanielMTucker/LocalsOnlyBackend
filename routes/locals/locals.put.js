let router = require('express').Router();
let Local = require('../../models/locals.model');

router.route('/:id/name/:name').put((req,res)=>{
    Local.updateOne({_id:req.params.id},{name:req.params.name},(error, success)=>{})
        .then(() => res.json("name updated"))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id/address/:address').put((req,res)=>{
    Local.updateOne({_id:req.params.id},{address:req.params.address},(error, success)=>{})
        .then(() => res.json("address updated"))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id/hashtag/:hashtag').put((req,res)=>{
    Local.findById(req.params.id,(err,res)=>{
        if(!err){
            res.hashtags.push(req.params.hashtag);
            res.save();
        }
    }).then(()=> res.json("hashtags updated"))
    .catch(err => res.status(400).json("Error: " + err));
});

router.route('/:id/comment/:comment').put((req,res)=>{
    Local.findById(req.params.id,(err,res)=>{
        if(!err){
            res.comments.push(req.params.comment);
            res.save();
        }
    }).then(()=> res.json("hashtags updated"))
    .catch(err => res.status(400).json("Error: " + err));
});

module.exports = router;