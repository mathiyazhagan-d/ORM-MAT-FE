import mongoose from 'mongoose';

const ReviewSchema = new mongoose.Schema({
    name: {
        type:String,
        required: true
    },
    rating: {
        type: Number,
        required: true
    },
    comment: {
        type: String,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User '
    },
}, {timestamps: true})

const ProductSchema = new mongoose.Schema({
     
    name: {
        type: String,
       
    }, 
    image: {
        type: String,
        
    },
    category: {
        type: String,
       
    },
    description: {
        type: String,
       
    },
    ingredients: {
        type: String,
       
    },
    reviews: [ReviewSchema],
    rating: {
        type: Number,
        required: true,
        default: 0
    },
    numReviews: {
        type: Number,
        required: true,
        default: 0
    },
    price: {
        type: Number,
      
        default: 0
    },
    countInStock:{
        type: Number,
        
        default: 0
    }
})

const Product = mongoose.model('Product', ProductSchema);

export default Product;