let router = require('express').Router();
let Local = require('../../models/locals.model');
let abbrs = ["AL","AK","AZ","AR","CA","CO","CT","DE","FL","GA","HI","ID","IL","IN","IA","KS",
             "KY","LA","ME","MD","MA","MI","MN","MS","MO","MT","NE","NV","NH","NJ","NM","NY",
             "NC","ND","OH","OK","OR","PA","RI","SC","SD","TN","TX","UT","VT","VA","WA","WV",
             "WI","WY","DC"]
let states = ["Alabama","Alaska","Arizona","Arkansas","California","Colorado","Connecticut","Delaware",
                 "Florida","Georgia","Hawaii","Idaho","Illinois","Indiana","Iowa","Kansas","Kentucky","Louisiana",
                 "Maine","Maryland","Massachusetts","Michigan","Minnesota","Mississippi","Missouri","Montana",
                 "Nebraska","Nevada","New Hampshire","New Jersey","New Mexico","New York","North Carolina","North Dakota",
                 "Ohio","Oklahoma","Oregon","Pennsylvania","Rhode Island","South Carolina","South Dakota","Tennessee",
                 "Texas","Utah","Vermont","Virginia","Washington","West Virginia","Wisconsin","Wyoming","District of Columbia"  
                ]
let getAbbr = (state)=>{
    for (var i = 0; i < states.length; i++){
        if(state === states[i].toLowerCase())
            return abbrs[i].toLowerCase();
        else return state.toLowerCase();
    }
}
let getState = (abbr)=>{
    for (var i = 0; i < abbrs.length; i++){
        if(abbr === abbrs[i].toLowerCase())
            return state[i].toLowerCase();
        else return abbr.toLowerCase();
    }
}
router.route('/').post((req, res)=>{

    const name = req.body.name;
    const date = req.body.date;
    const description = req.body.description;
    const address = req.body.address;
    const abbr = getAbbr(address.state);
    address.state = getState(address.state);
    const comments = req.body.comments;
    const hashtags = [name, ...req.body.hashtags];
    const rating = req.body.rating;
    const addressTags = [
                            address.city.toLowerCase(), 
                            address.state.toLowerCase(), 
                            address.zip, 
                            getAbbr(address.state.toLowerCase())
                        ];
    const searchTags = [];
    hashtags.forEach(tag=>{
        var retag = tag.split(" ");
        retag.forEach(tag=>{
            tag = tag.toLowerCase();
            if(!searchTags.includes(tag))
                searchTags.push(tag.toLowerCase())
        });
    });
    
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
        .then(()=>{
            res.json(`new local {${newLocal.name}} has been saved to database`);
            console.log(`new local {${newLocal.name}} has been saved to database`);
        })
        .catch(err=>{res.sendStatus(400).json(`Error adding local {${newLocal.name}} : ${err}`)});

});


module.exports = router;