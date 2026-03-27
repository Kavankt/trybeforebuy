"use client";

import { useEffect, useState } from "react";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");

  const fetchProducts = () => {
    fetch("http://localhost:5000/products")
      .then((res) => res.json())
      .then((data) => setProducts(data));
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const addProduct = async () => {
    if (!name || !price) return;

    await fetch("http://localhost:5000/add-product", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, price: Number(price) }),
    });

    setName("");
    setPrice("");
    fetchProducts();
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* 🔥 Navbar */}
      <nav className="flex justify-between items-center px-8 py-4 bg-white shadow">
        <h1 className="text-2xl font-bold text-blue-600">TryBeforeBuy</h1>
        <input
          placeholder="Search products..."
          className="border px-4 py-2 rounded w-1/3"
        />
      </nav>

      {/* 🔥 Hero */}
      <div className="bg-gradient-to-r from-blue-500 to-purple-500 text-white p-12 text-center">
        <h2 className="text-4xl font-bold mb-2">Try Products Before You Buy</h2>
        <p className="text-lg opacity-90">
          Find nearby gadgets & test before purchasing
        </p>
      </div>

      {/* 🔥 Add Product */}
      <div className="max-w-4xl mx-auto bg-white p-6 mt-6 rounded-xl shadow">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">
          Add Product
        </h2>

        <div className="flex gap-3">
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Product name"
            className="border p-2 rounded w-full text-black"
          />

          <input
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder="Price"
            className="border p-2 rounded w-full text-black"
          />

          <button
            onClick={addProduct}
            className="bg-blue-600 text-white px-6 rounded hover:bg-blue-700 transition"
          >
            Add
          </button>
        </div>
      </div>

      {/* 🔥 Products */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 p-10">
        {products.map((product: any) => (
          <div
            key={product.id}
            className="bg-white rounded-xl shadow hover:shadow-xl transition overflow-hidden"
          >
            {/* Image */}
            <img
              src={`https://source.unsplash.com/400x300/?${product.name}`}
              alt="product"
              className="w-full h-48 object-cover"
            />

            <div className="p-4">
              <h3 className="font-semibold text-lg text-gray-800">
                {product.name}
              </h3>

              <p className="text-gray-600 mb-3">₹{product.price} / hour</p>

              <button className="w-full bg-black text-white py-2 rounded hover:bg-gray-800 transition">
                Book Now
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
