const express = require("express");
const app = express();
const path = require("path");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const api_route = require("./routes/api_route");
const portfolio_route = require("./routes/portfolio_route");
const admin_route = require("./routes/admin_routes");
const cors = require("cors");

const port = process.env.PORT || 4000;

app.use(cors({ origin: "*" }));
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.json());

app.use("/", api_route);
app.use("/portfolio", portfolio_route);
app.use("/admin", admin_route);




// const URI = process.env.MONGODB_URL;  

const URI = "mongodb://localhost:27017/Tumblr_db"

mongoose.connect( 
  URI,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    family: 4,
  },
  (err) => {
    if (err) throw err;
    console.log("Database Connected");
  }
);



// mongoose.connect("mongodb://localhost/Tumblr_db", { useNewUrlParser: true, useUnifiedTopology: true },
// err => {
//     if (err) throw err
//     console.log("Database connected")
// })

// mongoose.connect(
//   "mongodb+srv://onojavoo:voo247@tumblr-db.fhyq2pm.mongodb.net/tumblr-blog?retryWrites=true&w=majority",
//   { useNewUrlParser: true, useUnifiedTopology: true },
//   (err) => {
//     if (err) throw err;
//     console.log("Cloud Database connected");
//   }
// );

mongoose.Promise = global.Promise;

app.listen(4000, () => {
  console.log("Running on http://localhost:4000");
});
