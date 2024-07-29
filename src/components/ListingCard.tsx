import React from 'react';
import { Listing } from '@/types/listing';
import MediaCard from './MediaCard';
import { formatListingDetails } from '@/utils/listings';
import { formatPrice } from '@/utils/currency';

interface ListingCardProps {
  listing: Listing;
  onClick?: () => void;
}

const ListingCard: React.FC<ListingCardProps> = ({ listing, onClick }) => {
  const details = formatListingDetails(listing);
  const price = formatPrice(listing.price.$numberDecimal);

  return (
    <MediaCard
      onClick={onClick}
      imageUrl={listing.images.picture_url}
      title={
        <h2 className="font-semibold text-sm md:text-base text-customGray text-ellipsis truncate">
          {listing.name}
        </h2>
      }
      body={
        <div className="text-sm md:text-base justify-between">
          <div className="flex flex-row items-center ">
            <p className="font-semibold text-[#5A5A5A] text-base ">{price}</p>
            <p className="pl-5 text-sm ">{details}</p>
          </div>
          <p className="pt-2 text-[#919191] text-sm">
            {listing.address.street?.toLocaleUpperCase()}
          </p>
        </div>
      }
      footer={
        <p className="text-sm md:text-base underline text-[#C74865] ">
          View details
        </p>
      }
    />
  );
};

export default ListingCard;
