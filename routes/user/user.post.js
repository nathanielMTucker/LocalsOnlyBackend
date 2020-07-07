let router = require('express').Router();
let User = require('../../models/user.model');

router.route('/').post((req, res)=>{
    let name = req.body.name;
    let authID = req.body.authID;
    let localTo = req.body.localTo;
    let email = req.body.email;

    const newUser = new User({
        authID: authID,
        email:email,
        name: name,
        localTo: localTo,
        role : 'user',
    });
    
    newUser.save()
        .then(()=>{
            res.json(`new user {${newUser.name}} has been saved to database`);
            console.log(`new user {${newUser.name}} has been saved to database`);
        })
        .catch(err=>{res.sendStatus(400).json(`Error adding local {${newUser.name}} : ${err}`)});

})

module.exports = router;