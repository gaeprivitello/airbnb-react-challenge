'use client';

import ActivityIndicator from '@/components/ActivityIndicator';
import ListingCard from '@/components/ListingCard';
import MarkersMap from '@/components/SearchMap';
import useListings from '@/hooks/useListings';
import { useState, useEffect, useCallback } from 'react';
import { debounce } from 'lodash';
import SearchInput from '@/components/SearchInput';

export default function Home() {
  const [search, setSearch] = useState('');

  const {
    loading,
    loadingMore,
    listings,
    markers,
    loadMore,
    setSelectedListing,
  } = useListings(search);

  const onScroll = useCallback(async () => {
    if (
      window.innerHeight + window.scrollY >= document.body.offsetHeight - 100 &&
      !loading
    ) {
      loadMore(listings.length);
    }
  }, [listings.length, loading]);

  const debounceHandleScroll = debounce(onScroll, 300);

  useEffect(() => {
    window.addEventListener('scroll', debounceHandleScroll);
    return () => window.removeEventListener('scroll', debounceHandleScroll);
  }, [onScroll]);

  return (
    <main className="flex flex-col items-center justify-between lg:flex-col pt-4 p-2 md:p-4 ">
      <div className="z-10 w-full items-center justify-between font-inter text-sm lg:flex relative mb-5 ">
        <SearchInput search={search} setSearch={setSearch} />
      </div>

      <MarkersMap markers={markers} />

      <div className="w-full bg-white p-1 rounded-lg shadow-lg grid grid-cols-1 md:grid-cols-2 ">
        {(loading || loadingMore) &&
          [...Array(20)].map((_, index) => (
            <div
              key={`skeleton-${index}`}
              className="animate-pulse card flex h-[100px] sm:h-[120px] lg:h-[140px] p-20 m-2 hover:shadow-lg bg-gray-200"
            />
          ))}

        {listings.map((item) => (
          <ListingCard
            key={item._id}
            listing={item}
            onClick={() => setSelectedListing(item._id)}
          />
        ))}
      </div>

      {(loading || loadingMore) && <ActivityIndicator />}
    </main>
  );
}
