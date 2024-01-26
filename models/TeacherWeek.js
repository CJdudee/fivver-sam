const mongoose = require('mongoose')

    //if i make a list of notes with the users that means that the whenever the user is called for even username or email the posts will be called to it might be smarter to put the user.id with posts

const TeacherWeekSchema = new mongoose.Schema({
    teacher: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Teacher'
    },
    weekdays: {
        type: Array,
        default: [
            {
                index: 0,
                name: 'sunday',
                openTime: "8:00",
                closeTime: "22:00",
                isOpen: false

            },
            {
                index: 1,
                name: 'monday',
                openTime: "8:00",
                closeTime: "22:00",
                isOpen: false

            },
            {
                index: 2,
                name: 'tuesday',
                openTime: "8:00",
                closeTime: "22:00",
                isOpen: false

            },
            {
                index: 3,
                name: 'wednesday',
                openTime: "8:00",
                closeTime: "22:00",
                isOpen: false

            },
            {
                index: 4,
                name: 'thursday',
                openTime: "8:00",
                closeTime: "22:00",
                isOpen: false

            },
            {
                index: 5,
                name: 'friday',
                openTime: "8:00",
                closeTime: "22:00",
                isOpen: false

            },
            {
                index: 6,
                name: 'saturday',
                openTime: "8:00",
                closeTime: "22:00",
                isOpen: false

            },
        ]
    },
   
  
})

//have to make users posts a subdoc so i dont go over the 16 mb limit or a populate
module.exports = mongoose.models.TeacherWeek || mongoose.model('TeacherWeek', TeacherWeekSchema)

// const Product = mongoose.models && "Product" in mongoose.models ? mongoose.models. Product : mongoose.model("Product", PostSchema);
// export default Product;