const express = require('express');
const router = express.Router();
const billingCycleModel = require('../api/billingCycle')

router.get('/api', async (req, res, next) => {
  const results = await billingCycleModel.find({})
  res.send(results)
})

router.post('/api', async (req, res, next) => {

  try{

    const newBillingCycle = new billingCycleModel({
      ...req.body
    })
    await newBillingCycle.save()
  
    res.status(200).send('User created')

  }
  catch(error){
    res.status(400).send(`User not created because: ${error.message}`)
  }
  
})

router.put('/api/:id', async (req, res, next) => {
  console.log('Ok')
  console.log('Req headers', req.headers)
  console.log('req.body', req.body)
  try{
    const selected = await billingCycleModel.updateOne({_id: req.headers.id}, {...req.body});

    

    res.json(selected)  
  }
  catch(error){
    console.log('eRROR:', error)
    res.send(error)
  }
})

router.delete('/api/:id', async (req, res, next) => {
  try{
    const result = await billingCycleModel.deleteOne({ _id: req.headers.id  });
    res.send(result)
  }
  catch(error){
    res.send(error);
  }
  
  
})

module.exports = router