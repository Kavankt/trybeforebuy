const express = require("express");
const cors = require("cors");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();
const app = express();

app.use(cors());
app.use(express.json());

// Root route
app.get("/", (req, res) => {
  res.send("🚀 TryBeforeBuy Backend Running");
});


// ✅ GET products from DATABASE
app.get("/products", async (req, res) => {
  try {
    const products = await prisma.product.findMany();
    res.json(products);
  } catch (error) {
    // console.error(error);
    console.error("REAL ERROR:", error); // Log the actual error for debugging
    res.status(500).json({ error: "Failed to fetch products" });
  }
});


// ✅ ADD product to DATABASE
app.post("/add-product", async (req, res) => {
  try {
    const { name, price } = req.body;

    const product = await prisma.product.create({
      data: {
        name,
        price,
      },
    });

    res.json(product);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to add product" });
  }
});


// Start server
app.listen(5000, () => {
  console.log("Server running on http://localhost:5000");
});