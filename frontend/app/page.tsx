"use client";

import { useEffect, useState } from "react";

export default function Home() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/products")
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navbar */}
      <nav className="flex justify-between items-center p-4 bg-white shadow">
        <h1 className="text-xl font-bold">TryBeforeBuy</h1>
      </nav>

      {/* Products */}
      <div className="grid grid-cols-3 gap-6 p-10">
        {products.map((product: any) => (
          <div key={product.id} className="bg-white p-4 rounded shadow">
            <h3 className="font-semibold">{product.name}</h3>
            <p className="text-gray-500">₹{product.price} / hour</p>
          </div>
        ))}
      </div>
    </div>
  );
}
