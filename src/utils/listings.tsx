import { Listing } from '@/types/listing';
import { MarkerPoint } from '@/types/map';
import { formatPrice } from './currency';
import ListingCard from '@/components/ListingCard';

export const createMarkerFromListing = (listing: Listing): MarkerPoint => ({
  latitude: listing.address.location.coordinates[1],
  longitude: listing.address.location.coordinates[0],
  metadata: {
    id: listing._id,
    label: `${formatPrice(listing.price.$numberDecimal)}`,
    popupContent: <ListingCard listing={listing} />,
  },
});

export const formatListingDetails = (listing: Listing) => {
  let items = [];

  if (listing.beds) {
    items.push(`${listing.beds} beds`);
  }

  if (listing.bathrooms?.$numberDecimal) {
    let bathrooms = parseFloat(listing.bathrooms.$numberDecimal);
    items.push(`${bathrooms} baths`);
  }

  if (listing.guests_included.$numberDecimal) {
    let guests = parseFloat(listing.guests_included.$numberDecimal);
    items.push(`${guests} guests`);
  }

  return items.join(' / ');
};
