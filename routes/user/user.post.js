let router = require('express').Router();
let User = require('../../models/user.model');

router.route('/').post((req, res)=>{
    let name = req.body.name;
    let authID = req.body.authID;
    let homeLocation = req.body.homeLocation;
    let address = req.body.address;

    const newUser = new User({
        name, 
        address,
        authID,
        homeLocation
    });
    
    newUser.save()
        .then(()=>{
            res.json(`new user {${newUser.name}} has been saved to database`);
            console.log(`new user {${newUser.name}} has been saved to database`);
        })
        .catch(err=>{res.sendStatus(400).json(`Error adding local {${newUser.name}} : ${err}`)});

})

module.exports = router;