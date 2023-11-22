const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const signupRoute = require("./Routes/signupRoute.js");
const loginRoute = require("./Routes/loginRoute.js");
const productsRoute = require("./Routes/productsRoute.js");
const getProducts = require("./Routes/getProducts.js");

dotenv.config();

const app = express();

app.use(express.json({ limit: "10mb" }));
app.use(cors());
mongoose.set("strictQuery", false);

// const connect = async () => {
//     try {
//         await mongoose.connect(process.env.MONGODB_URL, {
//             useNewUrlParser: true,
//             useUnifiedTopology: true,
//         });
//         console.log('Successfully connected to the database');
//     } catch (error) {
//         console.error('Failed to connect to the database:', error);
//     }
// };

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
  res.send("This server is connected");
});

app.use("/signup", signupRoute);
app.use("/login", loginRoute);
app.use("/products", productsRoute);
app.use("/product", getProducts);

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`The server is running on http://localhost:${PORT}`);
});
