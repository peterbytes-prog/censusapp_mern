const express = require('express');
const router = express.Router();
const Census = require('../model/census');

router.get('/census', (req, res, next)=>{
  let q_city = req.query.search|| "";
    Census.find({city:{$regex: q_city, "$options":'i'}})
    .then(census=>{
        // console.log(census);
        res.send(census)
    })
    .catch(next)
});

module.exports = router;
