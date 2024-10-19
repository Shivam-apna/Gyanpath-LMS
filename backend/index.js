const express = require("express");
const mongoose = require("mongoose");
const app = express();
let cors = require("cors");
require("dotenv").config();

app.use(express.json());
app.use(cors({ origin: "*" }));

let PORT = process.env.PORT || 3001;

app.get("/", (req, res) => {
  res.send("welcome to home")
})


// Establish database connection before starting the server
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Connected to the database successfully.");
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.log("Error connecting to the database:", error.message);
  });