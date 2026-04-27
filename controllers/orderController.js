import Order from "../models/order.js";
import Product from "../models/product.js";

export async function CreateOrder(req, res) {
    //let orderId = "ORD000001";

    try{
                const orderData={
                orderId:"ORD000001",
                firstName: "janith",
                lastName: "perera",
                addressLine1: "123 main street",
                addressLine2: "apt 4",
                city: "colombo",
                country: "Sri lanka",
                postalCode: "12345",
                email: "janith@gmail.com",
                items:[],
                phone: "0712345678",
                total:0
            }
            const lastorder= await Order.findOne().sort({ date: -1 });

            if(lastorder != null){
                const lastorderid = lastorder.orderId;
                const lastOrderNumberInString = lastorderid.replace("ORD", "");
                const lastOrderNumber = parseInt(lastOrderNumberInString);
                const newOrderNumber = lastOrderNumber + 1;
                const newOrderNumberInString = newOrderNumber.toString().padStart(6, "0");
                orderData = "ORD" + newOrderNumberInString;

            }
            for(let i=0; i<req.body.items.length; i++){
                const item = req.body.items[i];
                const product= await Product.findOne({productId: item.productId});
                if(product == null){
                    return res.status(400).json({
                        message: "Product with given productId not found: " + item.productId});
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