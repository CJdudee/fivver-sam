const mongoose = require('mongoose')

    //if i make a list of notes with the users that means that the whenever the user is called for even username or email the posts will be called to it might be smarter to put the user.id with posts

const PackageSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true
    },
    price: {
        type: Number,
        required: true
    },
    
    // email: {
    //     type: String,
        
    // },
    individual: {
        type: Boolean,
        required: true
    },
    
})

//have to make users posts a subdoc so i dont go over the 16 mb limit or a populate
module.exports = mongoose.models.Package || mongoose.model('Package', PackageSchema)

// const Product = mongoose.models && "Product" in mongoose.models ? mongoose.models. Product : mongoose.model("Product", PostSchema);
// export default Product;