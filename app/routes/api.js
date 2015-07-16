var express = require('express');
var router = express.Router();

/* GET api. */
router.get('/playCards', function(req, res, next) {    
    res.send('success');       
});
  
module.exports = router;