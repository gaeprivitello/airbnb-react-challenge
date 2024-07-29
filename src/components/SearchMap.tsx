import { MarkerPoint } from '@/types/map';
import { Map, AdvancedMarker, useMap } from '@vis.gl/react-google-maps';
import { useListingContext } from '@/hooks/useListingContext';
import { useEffect } from 'react';
import { CustomMarker } from '@/assets/icons/CustomMarker';

interface MarkersMapProps {
  markers?: MarkerPoint[];
}

const MarkersMap: React.FC<MarkersMapProps> = ({ markers = [] }) => {
  const mapInstance = useMap('map-container');

  const { selectedMarker, setSelectedMarker } = useListingContext();

  useEffect(() => {
    if (!mapInstance || !selectedMarker) {
      return;
    }

    navigateToMarker(selectedMarker);
  }, [selectedMarker, mapInstance]);

  const handleMarkerClick = (marker: MarkerPoint) => {
    setSelectedMarker(marker);
    navigateToMarker(marker);
  };

  const navigateToMarker = (marker: MarkerPoint) => {
    if (!mapInstance) {
      return;
    }

    const currentZoom = mapInstance.getZoom();

    if (!currentZoom || currentZoom < 16) {
      mapInstance.setZoom(16);
    }

    mapInstance?.panTo({
      lat: marker.latitude,
      lng: marker.longitude,
    });
  };

  return (
    <Map
      mapId={'map-container'}
      className="w-full h-[300px] lg:h-[600px]"
      defaultCenter={{
        lat: 40.7448608,
        lng: -73.9366702,
      }}
      defaultZoom={12}
      gestureHandling={'greedy'}
      disableDefaultUI={true}
      id="map-container"
    >
      {markers.map((marker, index) => (
        <AdvancedMarker
          zIndex={
            selectedMarker?.metadata?.id === marker.metadata?.id ? 1000 : 0
          }
          onClick={() => handleMarkerClick(marker)}
          key={`${marker.metadata?.id}-${index}`}
          position={{ lat: marker.latitude, lng: marker.longitude }}
          title={marker.metadata?.label}
        >
          {selectedMarker?.metadata?.id === marker.metadata?.id && (
            <div className="animate-bounce-short absolute p-[2px] bg-white bottom-10">
              {selectedMarker?.metadata?.popupContent}
            </div>
          )}
          <CustomMarker />
        </AdvancedMarker>
      ))}
    </Map>
  );
};

export default MarkersMap;
