import React, { useState } from 'react';
import Image from 'next/image';

interface MediaCardProps {
  imageUrl: string;
  title: React.ReactNode;
  body: React.ReactNode;
  footer: React.ReactNode;
  onClick?: () => void;
}

const MediaCard: React.FC<MediaCardProps> = ({
  imageUrl,
  title,
  body,
  footer,
  onClick,
}) => {
  const [isError, setIsError] = useState(false);

  const handleImageError = () => {
    setIsError(true);
  };

  return (
    <div
      onClick={onClick}
      className="card flex gap-2 h-[100px] sm:h-[120px] lg:h-[140px] bg-white m-2 hover:shadow-lg truncate"
    >
      <div className="relative flex-shrink-0 w-[100px] sm:w-[120px] lg:w-[140px]">
        <Image
          className="rounded-lg object-cover"
          layout="fill"
          src={isError ? '/images/default-prop-img.jpeg' : imageUrl}
          onError={handleImageError}
          alt="Listing"
        />
      </div>

      <div className="flex flex-col justify-between">
        <div>{title}</div>
        <div>{body}</div>
        <div>{footer}</div>
      </div>
    </div>
  );
};

export default MediaCard;
