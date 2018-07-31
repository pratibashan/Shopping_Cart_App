const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const userRoutes = require("./routes/api/users");
const productRoutes = require("./routes/api/products");

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//DB config
const db = require("./config/keys").mongoURI;

//connect to mongodb
mongoose
  .connect(db)
  .then(() => {
    console.log("Connected to Database");
  })
  .catch(err => {
    console.log("Not Connected to Database ERROR!", err);
  });

// app.get("/", (req, res) => {
//   res.send("Hello World!!");
// });

// Use Routes
app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);

const port = process.env.port || 5000;

app.listen(port, () => console.log(`Server running on port ${port}`));
