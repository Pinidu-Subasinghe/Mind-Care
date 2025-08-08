import React from "react";

export default function Pricing() {
  const plans = [
    {
      name: "Basic",
      price: "$69.99",
      description: "Basic support for mental wellness.",
      highlighted: true,
    },
    {
      name: "Standard",
      price: "$79.99",
      description: "Extended counseling and group sessions.",
      highlighted: false,
    },
    {
      name: "Premium",
      price: "$89.99",
      description: "Full access to all services and priority support.",
      highlighted: false,
    },
  ];

  return (
    <div className="flex flex-col md:flex-row justify-center gap-8 max-w-5xl mx-auto">
      {plans.map(({ name, price, description, highlighted }, i) => (
        <div
          key={i}
          className={`flex flex-col p-8 rounded-xl shadow-lg max-w-xs text-center ${
            highlighted ? "bg-green-700 text-white" : "bg-white text-green-900"
          }`}
        >
          <h3 className="text-2xl font-semibold mb-4 font-sans">{name}</h3>
          <p className="text-4xl font-extrabold mb-4">{price}</p>
          <p className="mb-6">{description}</p>
          <button
            className={`rounded-full px-6 py-2 font-semibold transition ${
              highlighted
                ? "bg-green-900 hover:bg-green-800 text-white"
                : "bg-green-600 hover:bg-green-700 text-white"
            }`}
          >
            Choose Plan
          </button>
        </div>
      ))}
    </div>
  );
}
