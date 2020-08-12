let router = require('express').Router();
let Local = require('../../models/locals.model');

router.route('/:id').delete((req, res)=>{
    let id = req.params.id;
    Local.deleteOne({_id:id})
        .then(()=>{res.json((`item ${id} deleted`))})
        .catch((err)=>{res.sendStatus(404).json(err)})
});

// router.route('deleteCity/:state/:id').delete((req,res)=>{
//     let STATE = req.params.state;
//     let ID = req.params.id;
//     State.updateOne({state:STATE}, {$pull:{cities:ID}})
//         .then(()=>res.json('done'))
//         .catch(err => res.sendStatus(400).json(err));
    
// });

// router.route('deleteLocal/:state/:city/:id').delete((req,res)=>{
//     let STATE = req.params.state;
//     let CITY = req.params.city;
//     let ID = req.params.id;
//     State.updateOne({state:STATE}, {$pull:{cities:{locals:ID}}})
//         .then(()=>res.json('done'))
//         .catch(err => res.sendStatus(400).json(err));
    
// });
module.exports = router;