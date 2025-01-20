const mongoose = require('mongoose');


const productSchema = mongoose.Schema({
    name: {
        type: String,
        required: [ true, "Please enter product name"],
        trim: true
    },
    description:{
        type:String,
        required:[true,"Please enter product description"],
        trim:true
    },
    price:{
        type:Number,
        required:[true,"Please enter product price"],
        maxLength:[8 , "Price cannot exceed 8 characters"]
    },
    rating:{
        type:Number,
        default:0
    },
    image:[
        
        {
            public_id:{
                type:String,
                required:true
            },
            url:{
                type:String,
                required:true
            }
        }
    ],
    category:{
        type:String,
        required:[true,"Please select category"],

    },
    stock:{
        type:Number,
        required:[true,"Please enter products stock"],
        maxLength:[4,"Stock cannot exceed 4 characters"],
        default:1
    },
    numOfReviews:{
        type:Number,
        default:0
    },
    reviews:[
        {
            name:{
                type:String,
                required:[true,"Please enter your name"],
            },
            rating:{
                type:Number,
                required:true
            },
            comment:{
                type:String,
                required:[true,"Please enter review"],
            }
        }
    ],
    createdAt:{
        type:Date,
        default:Date.now
    }

})

module.exports = mongoose.model("Product", productSchema)