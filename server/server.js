const express = require('express');
const Razorpay = require('razorpay');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();

const razorpayInstance = new Razorpay({
    key_id: process.env.RAZORPAY_ID_KEY,
    key_secret: process.env.RAZORPAY_SECRET_KEY
});

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


const createOrder = async (req, res) => {
    try {
        const amount = req.body.amount * 100;
        const options = {
            amount: amount,
            currency: 'INR',
            receipt: 'razorUser@gmail.com'
        };

        razorpayInstance.orders.create(options, (err, order) => {
            if (!err) {
                const {
                    name,
                    description,
                    contact,
                    email
                } = req.body;

                res.status(200).send({
                    success: true,
                    msg: 'Order Created',
                    order_id: order.id,
                    amount: amount,
                    key_id: process.env.RAZORPAY_ID_KEY,
                    product_name: name,
                    description: description,
                    contact: contact,
                    name: name,
                    email: email
                });
            } else {
                res.status(400).send({ success: false, msg: 'Something went wrong!' });
            }
        });
    } catch (error) {
        console.log(error);
        console.log(error.message);
    }
};


app.post('/createOrder', createOrder);

app.listen(3000, function () {
    console.log('Server is running on http://localhost:3000');
});
