const mongoose = require('mongoose');
const { Schema } = mongoose;
const creditSchema = new Schema({
    name: {type: String, required: true }, 
    value: {type: Number, min: 0, required: true}
});

const debitSchema = new Schema({
    name: {type: String, required: true }, 
    value: {type: Number, min: 0, required: true},
    status: {type: String, required: false, uppercase: true, enum: ['PAGO', 'PENDENTE', 'AGENDADO'] }
})

const billingCycleSchema = new Schema({
    name: {type: String, required: true },
    mont: {type: Number, min:1, max:12, required: true}
})

const creditModel = mongoose.model('creditModel', creditSchema)
const debitModel = mongoose.model('debitModel', debitSchema)
const billingCycleModel = mongoose.model('billingCycleModel', billingCycleSchema)