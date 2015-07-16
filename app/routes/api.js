var express = require('express');
var router = express.Router();
var repoCache = require('../bin/repoCache');

/* GET api. */
router.get('/playCards', function(req, res, next) {
    var repos = repoCache();    
    res.send(repos);       
});
  
module.exports = router;