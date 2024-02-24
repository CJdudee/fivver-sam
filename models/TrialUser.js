const mongoose = require('mongoose')

    //if i make a list of notes with the users that means that the whenever the user is called for even username or email the posts will be called to it might be smarter to put the user.id with posts

const TrialUserSchema = new mongoose.Schema({
    weekArray: {
        monday: {
            type: Boolean,
            required: true
        },
        tuesday: {
            type: Boolean,
            required: true
        },
        wednesday: {
            type: Boolean,
            required: true
        },
        thursday: {
            type: Boolean,
            required: true
        },
        friday: {
            type: Boolean,
            required: true
        },
        saturday: {
            type: Boolean,
            required: true
        },
        sunday: {
            type: Boolean,
            required: true
        },
    },
    info: {
        type: String,

    },
    
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }


})

//have to make users posts a subdoc so i dont go over the 16 mb limit or a populate
module.exports = mongoose.models.TrialUser || mongoose.model('TrialUser', TrialUserSchema)

// const Product = mongoose.models && "Product" in mongoose.models ? mongoose.models. Product : mongoose.model("Product", PostSchema);
// export default Product;