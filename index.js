const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const signupRoute = require("./Routes/signupRoute.js");
const loginRoute = require("./Routes/loginRoute.js");
const productsRoute = require("./Routes/productsRoute.js");
const getProduct = require("./Routes/getProducts.js");
// const Stripe = require('stripe')

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

const PORT = process.env.PORT || 8080;


 
/*****payment getWay */
// console.log(process.env.STRIPE_SECRET_KEY)


// const stripe  = new Stripe(process.env.STRIPE_SECRET_KEY)

// app.post("/create-checkout-session",async(req,res)=>{

//      try{
//       const params = {
//           submit_type : 'pay',
//           mode : "payment",
//           payment_method_types : ['card'],
//           billing_address_collection : "auto",
//           shipping_options : [{shipping_rate : "shr_1N0qDnSAq8kJSdzMvlVkJdua"}],

//           line_items : req.body.map((item)=>{
//             return{
//               price_data : {
//                 currency : "inr",
//                 product_data : {
//                   name : item.name,
//                   // images : [item.image]
//                 },
//                 unit_amount : item.price * 100,
//               },
//               adjustable_quantity : {
//                 enabled : true,
//                 minimum : 1,
//               },
//               quantity : item.qty
//             }
//           }),

//           success_url : `${process.env.FRONTEND_URL}/success`,
//           cancel_url : `${process.env.FRONTEND_URL}/cancel`,

//       }

      
//       const session = await stripe.checkout.sessions.create(params)
//       // console.log(session)
//       res.status(200).json(session.id)
//      }
//      catch (err){
//         res.status(err.statusCode || 500).json(err.message)
//      }

// })



app.listen(PORT, () => {
  console.log(`The server is running on http://localhost:${PORT}`);
});
