import React, { useState } from "react";

const StarRating = ({ maxStars = 5 }) => {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);

  const handleMouseEnter = (value) => setHover(value);
  const handleMouseLeave = () => setHover(0);
  const handleClick = (value) => {
    setRating(value);
    console.log(value);
  };

  return (
    <div className="flex justify-center gap-[5px] pb-2">
      {Array.from({ length: maxStars }, (_, index) => {
        const starValue = index + 1;
        return (
          <span
            key={index}
            className={`text-[30px] cursor-pointer transition-colors duration-300 ease-in-out ${
              starValue <= (hover || rating)
                ? "text-[gold]"
                : "text-gray-500 hover:text-[gold]"
            }`}
            onMouseEnter={() => handleMouseEnter(starValue)}
            onMouseLeave={handleMouseLeave}
            onClick={() => handleClick(starValue)}
          >
            &#9733;
          </span>
        );
      })}
    </div>
  );
};

export default StarRating;
