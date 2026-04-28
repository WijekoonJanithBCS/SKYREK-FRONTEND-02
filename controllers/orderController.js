import Order from "../models/order.js";
import Product from "../models/product.js";

export async function CreateOrder(req, res) {
    //let orderId = "ORD000001";

    try{
                const orderData={
                orderId:"ORD000001",
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                addressLine1: req.body.addressLine1,
                addressLine2: req.body.addressLine2,
                city: req.body.city,
                country: req.body.country,
                postalCode: req.body.postalCode,
                email: req.user.email,
                items: [],
                phone: req.body.phone,
                total: 0,
            }

            if(firstName== ""){
                orderData.firstName = req.user.firstName;
            }
            if(lastName== ""){
                orderData.lastName = req.user.lastName;
            }
            if(addressLine1== ""){
                res.status(400).json({
                    message: "Address Line 1 is required"
                });
                return;
            }
            if(addressLine2== ""){
                res.status(400).json({
                    message: "Address Line 2 is required"
                });
                return;
            }
            if(city== ""){
                res.status(400).json({
                    message: "City is required"
                });
                return;
            }
            if(postalCode== ""){
                res.status(400).json({
                    message: "Postal Code is required"
                });
                return;
            }

            

            const lastorder= await Order.findOne().sort({ date: -1 });

            if(lastorder != null){
                const lastorderid = lastorder.orderId;
                const lastOrderNumberInString = lastorderid.replace("ORD", "");
                const lastOrderNumber = parseInt(lastOrderNumberInString);
                const newOrderNumber = lastOrderNumber + 1;
                const newOrderNumberInString = newOrderNumber.toString().padStart(6, "0");
                orderData.orderId = "ORD" + newOrderNumberInString;

            }
            for(let i=0; i<req.body.items.length; i++){
                const item = req.body.items[i];
                const product= await Product.findOne({productId: item.productId});
                if(product == null){
                    return res.status(404).json({
                        message: "Product with given productId not found.remove it from ur cart and try again: " + item.productId});
                        return;
                }
                if(product.isVisible == false){
                    return res.status(400).json({
                        message: "Product with given productId is not available: " + item.productId});
                        return;
                }
               orderData.items.push({
                productId: item.productId,
                name: product.name,
                price: product.price,
                labelledPrice: product.labelledPrice,
                image: product.images[0],
                qty: item.qty  
                }); 
                orderData.total += product.price * item.qty;
                orderData.totalAmount = req.body.totalAmount;
            }
            const order = new Order(orderData);
            await order.save();

            // for(let i=0; i<orderData.items.length; i++){
            //     const item = orderData.items[i];
            //     await Product.updateOne({productId: item.productId}, {$inc: {qty: -item.qty}});
            // }
            res.status(201).json({
                message: "Order created successfully",
                orderId: orderData.orderId
            });
    }
    catch(error){
        console.log("Error creating order: ", error);
        return res.status(500).json({
            message: "Error creating order",
            error: error.message
        });
    }


}