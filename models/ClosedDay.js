const mongoose = require('mongoose')


const CloseDaySchema = new mongoose.Schema({

   date: {
    type: Date,
    required: true
   },
   teacher: {
    type: mongoose.Schema.Types.ObjectId,
    required: true 
   }

},{
    timestamps: false
})


module.exports = mongoose.models.CloseDay || mongoose.model('CloseDay', CloseDaySchema)