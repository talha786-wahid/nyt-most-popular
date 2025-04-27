import React from "react";
import noImageIcon from "@/assets/icons/no-image.svg";

export const NoImage: React.FC = () => {
  return (
    <div
      data-testid="no-image-container"
      className="w-full h-full min-h-[200px] bg-gray-100 flex items-center justify-center object-contain"
    >
      <img
        src={noImageIcon}
        alt="No image available"
        width={64}
        height={64}
        className="w-16 h-16 text-gray-400"
        data-testid="no-image-svg"
        loading="lazy"
      />
    </div>
  );
};
