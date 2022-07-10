const express = require('express');
const router = express.Router();
const Census = require('../model/census');

router.get('/census', async (req, res, next)=>{
  const totalDocuments = await Census.countDocuments();
  let {page=0,search="", limit=10} = req.query;
  let q_city = req.query.search|| "";
    Census.find({
        city:{
              $regex: search,
              $options:'i'
            }
      },
      {},
      {
        skip: page*limit,
        limit: limit
      }
    )
    .then(census=>{
        res.send({
          'census':census,
          'totalPages':Math.ceil(totalDocuments/limit)})
    })
    .catch(next)
});

module.exports = router;
