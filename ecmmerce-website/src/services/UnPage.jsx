export default function NotFound() {
  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center px-6">

      {/* Animated Triangle */}
      <div className="animate-wiggle">
        <svg
          width="90"
          height="90"
          viewBox="0 0 24 24"
          fill="none"
          className="text-yellow-500"
        >
          <path
            d="M12 2L1 21h22L12 2z"
            stroke="currentColor"
            strokeWidth="2"
            fill="transparent"
          />
          <circle cx="12" cy="16" r="1.5" fill="currentColor" />
          <rect x="11" y="8" width="2" height="5" fill="currentColor" />
        </svg>
      </div>

      {/* Title */}
      <h1 className="text-5xl sm:text-6xl font-bold text-gray-900 mt-6 animate-fade-in">
        404
      </h1>

      {/* Message */}
      <p className="text-gray-600 text-center mt-3 max-w-sm animate-fade-in-delay">
        The page you are looking for might have been removed, had its name
        changed, or is temporarily unavailable.
      </p>

      {/* Button */}
      <button
        onClick={() => (window.location.href = "/")}
        className="mt-8 px-8 py-3 bg-black text-white rounded-md font-medium 
                   hover:bg-gray-800 transition-all duration-300
                   animate-fade-in-delay2"
      >
        Go Back Home
      </button>
    </div>
  );
}
