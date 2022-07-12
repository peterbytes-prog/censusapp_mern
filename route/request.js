const express = require('express');
const router = express.Router();
const Census = require('../model/census');

router.get('/census', async (req, res, next)=>{
  const totalDocuments = await Census.countDocuments();
  let {page=0,search="", limit=10, min=-1*Infinity, max=Infinity} = req.query;
<<<<<<< HEAD
=======
  console.log(max, min)
>>>>>>> a96aa224feaf5fa76ab184817da8ab938e902bf2
  let q_city = req.query.search|| "";
    Census.find({
        city:{
              $regex: search,
              $options:'i'
            },
        census:{$gte:parseInt(min,10),$lte:parseInt(max, 10)}
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
