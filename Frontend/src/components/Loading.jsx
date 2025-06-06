import React from "react";

function Loading() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen z-10 bg-orange-50">
      <div className="relative flex flex-col items-center">
        {/* Biryani Emoji with a bouncing animation */}
        <div className="text-8xl animate-bounce">🍛</div>
        {/* Animated steam effect */}
        <div className="absolute top-0 flex space-x-2">
          <div
            className="w-2 h-6 bg-orange-300 rounded-full animate-steam"
            style={{ animationDelay: "0s" }}
          ></div>
          <div
            className="w-2 h-6 bg-orange-300 rounded-full animate-steam"
            style={{ animationDelay: "0.3s" }}
          ></div>
          <div
            className="w-2 h-6 bg-orange-300 rounded-full animate-steam"
            style={{ animationDelay: "0.6s" }}
          ></div>
        </div>
      </div>
      {/* Loading message */}
      <p className="mt-8 text-2xl font-bold text-orange-700 animate-pulse">
        Loading the data...
      </p>

      {/* Custom Keyframes */}
      <style>{`
        @keyframes steam {
          0% { opacity: 0; transform: translateY(0) scale(0.8); }
          50% { opacity: 1; transform: translateY(-10px) scale(1); }
          100% { opacity: 0; transform: translateY(-20px) scale(1.1); }
        }
        .animate-steam {
          animation: steam 2s infinite;
        }
      `}</style>
    </div>
  );
}

export default Loading;
