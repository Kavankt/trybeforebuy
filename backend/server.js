const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("🚀 TryBeforeBuy Backend Running");
});

app.get("/products", (req, res) => {
  res.json([
    { id: 1, name: "iPhone 14", price: 200 },
    { id: 2, name: "DSLR Camera", price: 300 },
    { id: 3, name: "VR Headset", price: 150 }
  ]);
});

app.listen(5000, () => {
  console.log("Server running on http://localhost:5000");
});