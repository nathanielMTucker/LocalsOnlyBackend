
let router = require('express').Router();
let parseAddress = require('parse-address-string');
const KEY='AIzaSyAzL6UpXmTecGIQBO0HHMvFScNhiSmlzfM';



router.route('/parse_address/:address').get((req, res)=>{
    console.log('Parsing address');
    
    parseAddress(req.params.address, (err, addr)=>{
        res.json({
            city:  addr.city,
            state:  addr.state,
            zip:  addr.postal_code,
        })
    })
})
module.exports = router;