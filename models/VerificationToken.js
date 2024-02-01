const mongoose = require('mongoose')

    //if i make a list of notes with the users that means that the whenever the user is called for even username or email the posts will be called to it might be smarter to put the user.id with posts

const VerificationTokenSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    token: {
        type: String,
        unique: true
    },
    expires: {
        type: Date
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }


})

//have to make users posts a subdoc so i dont go over the 16 mb limit or a populate
module.exports = mongoose.models.VerificationToken || mongoose.model('VerificationToken', VerificationTokenSchema)

// const Product = mongoose.models && "Product" in mongoose.models ? mongoose.models. Product : mongoose.model("Product", PostSchema);
// export default Product;