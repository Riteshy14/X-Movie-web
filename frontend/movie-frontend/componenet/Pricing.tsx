"use client";

interface PricingCardProps {
  title: string;
  price: string;
  description: string;
  features: string[];
  buttonText: string;
  highlighted?: boolean;
  disabled?: boolean;
  onClick: () => void; // REQUIRED
}

export function PricingCard({
  title,
  price,
  description,
  features,
  buttonText,
  highlighted = false,
  disabled = false,
  onClick,
}: PricingCardProps) {
  return (
    <div
      className={`relative max-w-md w-full mx-auto rounded-2xl p-10
        ${highlighted ? "bg-gradient-to-r from-gray-700 to-gray-800" : "bg-gray-900"}
        shadow-xl transition-all duration-300
        border-4
        ${highlighted ? "border-[#C2A68D]" : "border-gray-700"}
        transform hover:scale-105 hover:shadow-2xl hover:border-[#B09D6F]
      `}
    >
      {/* Demo Badge */}
      <span className="absolute top-5 right-5 bg-gray-500 text-white text-xs px-3 py-1 rounded-full font-semibold">
        Demo Only
      </span>

      {highlighted && (
        <span className="absolute -top-5 right-5 bg-[#C2A68D] text-black text-xs px-3 py-1 rounded-full font-semibold">
          Best Value
        </span>
      )}

      <h2 className="text-4xl font-extrabold mb-3 text-white text-center">
        {title}
      </h2>

      <p className="text-gray-300 mb-6 text-center">{description}</p>

      <p className="text-6xl font-extrabold text-white mb-6 text-center">
        {price}
      </p>

      <ul className="space-y-4 text-gray-300 mb-10">
        {features.map((feature, index) => (
          <li key={index} className="flex items-center gap-3">
            <span className="text-[#C2A68D]">✔</span>
            {feature}
          </li>
        ))}
      </ul>

      <button
        disabled={disabled}
        onClick={onClick}
        className={`w-full py-4 rounded-lg font-semibold transition-all duration-200
          ${disabled
            ? "bg-gray-700 text-gray-300 cursor-not-allowed"
            : highlighted
            ? "bg-[#C2A68D] text-black hover:bg-[#B09D6F]"
            : "bg-white text-black hover:bg-gray-300"
          }
        `}
      >
        {buttonText}
      </button>
    </div>
  );
}
