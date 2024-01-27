const mongoose = require('mongoose')
const User = require('../models/User')


const DisableUserSchema = new mongoose.Schema({

   userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User"
   },
   isDisable: {
    type: Boolean,
    default: true
   }
},{
    timestamps: false
})


module.exports = mongoose.models.DisableUser || mongoose.model('DisableUser', DisableUserSchema)