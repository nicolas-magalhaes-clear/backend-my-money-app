const express = require('express');
const router = express.Router();
const billingCycleModel = require('../api/billingCycle')
const userModel = require('../api/user')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')


router.get('/api', async (req, res, next) => {
  console.log('chegou na rota meu bom')
  const results = await billingCycleModel.find({})
  res.send(results)
})

router.post('/api', async (req, res, next) => {
  console.log('chegou na rota')
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
  console.log('Req params', req.params)
  console.log('req.body data', req.body.data)
  try{
    const selected = await billingCycleModel.updateOne({_id: req.params.id}, {...req.body.data});

  

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
    rnes.send(result)
  }
  catch(error){
    res.send(error);
  }
  
  
})

router.post('/api/login', async(req,res,next)=>{
  
    const email = req.body.email;
    const password = req.body.password
    const authSecret = process.env.AUTH_SECRET
    console.log('auth secret:', authSecret)
    const result = await userModel.findOne({email: email})

    if(result !== null){
      console.log('result:', result)

      const payload = {
        _id: result._id,
        email: result.email,
        name: result.name,
        password: result.password
      }
      console.log('payload', payload)
      console.log('req.body:', req.body)
      if(bcrypt.compareSync(password, result.password)){
        console.log('condição login true')
        const token = jwt.sign(payload, authSecret, {
          expiresIn: "1 day"
        })
        const {name, email} = payload
        res.json({name,email, token})
      }
      else{
        console.log('condição login false:')
        res.status(400).send({errors: ['Usuario ou senha invalidos']})
      }
    }

    

})

router.post('/api/register', async(req,res,next)=>{
  
  req.body.password = bcrypt.hashSync(req.body.password, 10)
  const newUser = new userModel({
    ...req.body
  })
  await newUser.save()

  res.status(200).send('User registered')
})

module.exports = router