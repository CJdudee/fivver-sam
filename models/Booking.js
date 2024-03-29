const mongoose = require('mongoose')
const Teacher = require('@/models/Teacher')

    //if i make a list of notes with the users that means that the whenever the user is called for even username or email the posts will be called to it might be smarter to put the user.id with posts

const BookingSchema = new mongoose.Schema({
    student: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    teacher: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Teacher'
    },
    date: {
        type: Date,
        required: true
    },
    time: {
        type: String,
        required: true
    },
    status: {
        type: String
    },
    tokenId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Token'
    },
    groupSize: {
        type: Number,
        default: 1
    }
})

//have to make users posts a subdoc so i dont go over the 16 mb limit or a populate
module.exports = mongoose.models.Booking || mongoose.model('Booking', BookingSchema)

// const Product = mongoose.models && "Product" in mongoose.models ? mongoose.models. Product : mongoose.model("Product", PostSchema);
// export default Product;