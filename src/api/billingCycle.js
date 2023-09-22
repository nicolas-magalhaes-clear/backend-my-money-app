const mongoose = require('mongoose');
const { Schema } = mongoose;
const creditSchema = new Schema({
    name: {type: String, required: true }, 
    value: {type: Number, min: 0, required: true}
});

const debitSchema = new Schema({
    name: {type: String, required: true }, 
    value: {type: Number, min: 0, required: true},
    status: {type: String, required: false, uppercase: true, enum: ["PAGO", 'PENDENTE', 'AGENDADO'] }
});

const billingCycleSchema = new Schema({
    name: {type: String, required: true },
    month: {type: Number, min:1, max:12, required: true},
    year: {type: Number, min: 1970, max:2100, required: true},
    credits: [creditSchema],
    debts: [debitSchema]
});

const creditModel = mongoose.model('creditModel', creditSchema);
const debitModel = mongoose.model('debitModel', debitSchema);
const billingCycleModel = mongoose.model('billingCycleModel', billingCycleSchema);

module.exports = billingCycleModel;