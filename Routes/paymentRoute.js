const router = require('express').Router();
const Stripe = require('stripe')

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

router.post("/", async (req,res) => {
try {
    const params = {
        submit_type: "pay",
        mode: "payment",
        payment_method_types: ['card'],
        billing_address_collection: "auto",
        shipping_options: [{shipping_rate: "shr_1OFwfcFYmq3sL3vkZUua9eWg"}],

        line_items: req.body.map((item) => { 
            return{
                price_data: {
                    currency: "rwf",
                    product_data: {
                        name: item.name,
                        // images: [`data:image/${item.image.contentType};base64,${item.image}`],
                    },
                    unit_amount: item.price * 1250,
                },
                adjustable_quantity: {
                    enabled: true,
                    minimum: 1
                },
                quantity: item.qty
            }
        }),
        success_url: `${process.env.FRONTEND_URL}/success`,
        cancel_url: `${process.env.FRONTEND_URL}/cancel`
    }
    const session = await stripe.checkout.sessions.create(params);
    console.log(session);
    res.status(200).json(session.id);
} catch (err) {
    res.status(err.statusCode || 500).json(err.message);
}
})
module.exports = router;