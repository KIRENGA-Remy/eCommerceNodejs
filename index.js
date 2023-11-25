const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const { NextApiRequest, NextApiResponse } = require('next');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const signupRoute = require("./Routes/signupRoute.js");
const loginRoute = require("./Routes/loginRoute.js");
const productsRoute = require("./Routes/productsRoute.js");
const getProduct = require("./Routes/getProducts.js");


dotenv.config();

const app = express();

app.use(express.json({ limit: "10mb" }));
app.use(cors());
mongoose.set("strictQuery", false);

mongoose
  .connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Database connected..."))
  .catch((e) => console.log(e));

// Move connect() before setting up routes
// connect();

app.get("/", (req, res) => {
  res.send("Api are working properly");
});

app.use("/signup", signupRoute);
app.use("/login", loginRoute);
app.use("/uploadproducts", productsRoute);
app.use("/product", getProduct);

/*****payment getWay */
app.post("/checkout-payment", async (req, res) => {
  try {
    const params = {
      submit_type: "pay",
      mode: "payment",
      payment_method_types: ['card'],
      billing_address_collection: "auto",
      shipping_options: [{ shipping_rate: "shr_1OFwfcFYmq3sL3vkZUua9eWg" }],

      line_items: req.body.map((item) => {
        return {
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
            minimum: 1,
          },
          quantity: item.qty,
        };
      }),
      success_url: `${process.env.FRONTEND_URL}/success`,
      cancel_url: `${process.env.FRONTEND_URL}/cancel`,
    };

    // Use stripe.checkout.sessions.create instead of stripe.sessions.create
    const session = await stripe.checkout.sessions.create(params);
    console.log(session.id);
    res.status(200).json(session.id);
  } catch (err) {
    res.status(err.statusCode || 500).json(err.message);
  }
});

const PORT = process.env.PORT || 8080;


app.listen(PORT, () => {
  console.log(`The server is running on http://localhost:${PORT}`);
});
