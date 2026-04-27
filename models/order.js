import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
    orderId: {
        type: String,
        required: true,
        unique: true
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    addressLine1: {
        type: String,
        required: true
    },
    addressLine2: {
        type: String
    },
    city: {
        type: String,
        required: true
    },
    country: {
        type: String,
        required: true,
        default: "Sri lanka"
    },
    postalCode: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: String,
        required: true
    },
    items: [
         {
            productId:{
                type: String,
                required: true
            },
            name: {
                type: String,
                required: true
            },
            labelledPrice: {
                type: Number,
            },
            price: {
                type: Number,
                required: true
            },
            image: {
                type: String,
            },
            qty: {
                type: Number,
                required: true
            }
        }
    ],
    totalAmount: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        required: true,
        default: "pending"
    },
    date: {
        type: Date,
        default: Date.now
    },
    notes: {
        type: String,
    }
});

const Order = mongoose.model('Order', orderSchema);

export default Order;

