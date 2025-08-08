import React from "react";

export default function Feedbacks() {
  const feedbacks = [
    {
      name: "Sarah Johnson",
      role: "Client",
      feedback:
        "Mind Care has been a game-changer for my mental well-being. The counselors are patient, understanding, and truly care about your progress.",
      img: "https://randomuser.me/api/portraits/women/44.jpg",
    },
    {
      name: "Michael Lee",
      role: "Client",
      feedback:
        "I’ve attended therapy sessions and support groups here, and I always leave feeling lighter and more empowered. Highly recommended!",
      img: "https://randomuser.me/api/portraits/men/32.jpg",
    },
    {
      name: "Emily Carter",
      role: "Client",
      feedback:
        "The team at Mind Care creates such a safe and welcoming environment. I finally feel heard and understood.",
      img: "https://randomuser.me/api/portraits/women/65.jpg",
    },
  ];

  return (
    <div className="max-w-6xl mx-auto px-6 ">
      <h2 className="text-3xl font-bold text-green-800 mb-10 text-center font-sans">
        What Our Clients Say
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {feedbacks.map(({ name, role, feedback, img }, i) => (
          <div
            key={i}
            className="bg-white rounded-xl shadow-lg p-6 text-center flex flex-col items-center"
          >
            <img
              src={img}
              alt={name}
              className="w-20 h-20 rounded-full object-cover mb-4"
            />
            <h3 className="text-lg font-semibold text-green-800">{name}</h3>
            <p className="text-sm text-green-600 mb-3">{role}</p>
            <p className="text-gray-700 text-sm">{feedback}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
