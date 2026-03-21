import mongoose, { model } from "mongoose";

const productSchema = new mongoose.Schema({
    productId: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    altNames: {
        type: [String],
        default: []
    },
    price: {
        type: Number,
        required: true
    },
    labelledPrice: {
        type: String,
    },
    category: {
        type: String,
        default:"others"
    },
    images: {
        type: [String],
        default: []
    },
    isVisible: {
        type: Boolean,
        default: true,
        required: true
    },
    brand: {
        type: String,
        default: "Generic"
    },
    model: {
        type: String,
        default: "Standard"
    },
});

const Product = mongoose.model('Product', productSchema);

export default Product;