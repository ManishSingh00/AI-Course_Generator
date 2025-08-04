"use client";
import { useEffect } from "react";

export default function UpgradePage() {
  const plans = [
    { id: 1, name: "1 Month Plan", price: 5, duration: "1 month" },
    { id: 2, name: "6 Months Plan", price: 25, duration: "6 months" },
    { id: 3, name: "12 Months Plan", price: 50, duration: "12 months" },
  ];

  const handleUpgrade = async (plan) => {
    const res = await fetch("/api/create-order", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ amount: plan.price, plan: plan.name }),
    });

    const order = await res.json();

    if (!order.id) {
      alert("Failed to create order");
      return;
    }

    const options = {
      key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID, // Razorpay key for frontend
      amount: order.amount,
      currency: order.currency,
      name: "CourseCrafter",
      description: plan.name,
      image: "/new logo.png", // optional
      order_id: order.id,
      handler: async function (response) {
        alert(`Payment successful! Payment ID: ${response.razorpay_payment_id}`);

        // Here you should update the user's plan in your DB.
        // E.g., call another API like /api/upgrade-user-plan
      },
      prefill: {
        name: "", // optionally set logged-in user's name
        email: "",
      },
      notes: {
        plan: plan.name,
      },
      theme: { color: "#3399cc" },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  useEffect(() => {
    if (typeof window !== "undefined" && !window.Razorpay) {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      document.body.appendChild(script);
    }
  }, []);

  return (
    <div className="p-10">
      <h1 className="text-3xl mb-6 font-bold">Upgrade Your Plan</h1>
      <div className="grid md:grid-cols-3 gap-6">
        {plans.map(plan => (
          <div key={plan.id} className="border rounded-lg shadow p-6 flex flex-col items-center">
            <h2 className="text-xl font-semibold mb-4">{plan.name}</h2>
            <p className="text-2xl font-bold mb-4">${plan.price}</p>
            <button
              onClick={() => handleUpgrade(plan)}
              className="bg-blue-400 hover:bg-blue-500 text-white px-6 py-2 rounded mt-auto"
            >
              Buy Now
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
