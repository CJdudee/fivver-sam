const mongoose = require('mongoose')

    //if i make a list of notes with the users that means that the whenever the user is called for even username or email the posts will be called to it might be smarter to put the user.id with posts

const TokenHistorySchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    tokens: {
        type: Number,
        immutable: true
    },
    groupSize: {
        type: Number,
        default: 1
    },
    expire: {
        type: Date,
        required: true
    },
    packageName: {
        type: String
    }
})

//have to make users posts a subdoc so i dont go over the 16 mb limit or a populate
module.exports = mongoose.models.TokenHistory || mongoose.model('TokenHistory', TokenHistorySchema)

// const Product = mongoose.models && "Product" in mongoose.models ? mongoose.models. Product : mongoose.model("Product", PostSchema);
// export default Product;