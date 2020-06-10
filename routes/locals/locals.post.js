let router = require('express').Router();
let Local = require('../../models/locals.model');

router.route('/').post((req, res)=>{
    const name = req.body.name;
    const date = req.body.date;
    const description = req.body.description;
    const address = req.body.address;
    const comments = req.body.comments;
    const hashtags = [name, ...req.body.hashtags];
    const rating = req.body.rating;
    const addressTags = [address.city.toLowerCase(), address.state.toLowerCase(), address.zip];
    const searchTags = [];
    hashtags.forEach(tag=>{
        var retag = tag.split(" ");
        retag.forEach(tag=>{
            tag = tag.toLowerCase();
            if(!searchTags.includes(tag))
                searchTags.push(tag.toLowerCase())
        });
    });
    console.log(searchTags);
    
    const newLocal = new Local({
        name, 
        date, 
        description,
        address, 
        comments, 
        hashtags,
        rating,
        addressTags,
        searchTags,
    });
    
    newLocal.save()
        .then(()=>{res.json(`new local {${newLocal.name}} has been saved to database`)})
        .catch(err=>{res.sendStatus(400).json(`Error adding local {${newLocal.name}} : ${err}`)});

});


module.exports = router;