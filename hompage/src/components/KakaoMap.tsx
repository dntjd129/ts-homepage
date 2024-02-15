import React, { useState, useEffect, useRef } from "react";
import { Map, MapMarker } from "react-kakao-maps-sdk";
import { styled } from "styled-components";

interface Coords {
  lat: number;
  lon: number;
}

interface Marker {
  position: {
    lat: number;
    lng: number;
  };
  content: string;
}

interface Address {
  region_2depth_name: string;
  region_3depth_name: string;
}

interface KakaoMapProps {
  coords: Coords;
}

const KakaoMap: React.FC<KakaoMapProps> = ({ coords }) => {
  const [info, setInfo] = useState<Marker | null>(null);
  const [markers, setMarkers] = useState<Marker[]>([]);
  const [map, setMap] = useState<any>(null);
  const [keyword, setKeyword] = useState<string>("");

  const mapRef = useRef<any>(null);

  useEffect(() => {
    if (coords.lat !== 0 && coords.lon !== 0) {
      const geocoder = new window.kakao.maps.services.Geocoder();
      geocoder.coord2Address(coords.lon, coords.lat, (address: Address[]) => {
        // @ts-ignore
        const getAddressName = address[0].address;
        setKeyword(
          `${getAddressName.region_2depth_name} ${getAddressName.region_3depth_name} 칵테일바`
        );
      });
    }
  }, [coords]);

  useEffect(() => {
    if (!keyword || keyword.trim() === "" || !map) return;

    const ps = new window.kakao.maps.services.Places();

    ps.keywordSearch(keyword, (data: any, status: any) => {
      if (status === window.kakao.maps.services.Status.OK) {
        const bounds = new window.kakao.maps.LatLngBounds();
        const addMarkers: Marker[] = [];

        for (let i = 0; i < data.length; i += 1) {
          addMarkers.push({
            position: {
              lat: data[i].y,
              lng: data[i].x,
            },
            content: data[i].place_name,
          });
          bounds.extend(new window.kakao.maps.LatLng(data[i].y, data[i].x));
        }
        setMarkers(addMarkers);
        map.setBounds(bounds);
      }
    });
  }, [map, keyword]);

  return (
    <MapSection>
      <Map
        center={{
          lat: coords.lat,
          lng: coords.lon,
        }}
        style={{
          width: "100%",
          height: "94%",
        }}
        level={3}
        onCreate={(mapInstance: any) => {
          setMap(mapInstance);
          mapRef.current = mapInstance;
        }}
      >
        {markers.map((marker: Marker) => (
          <MapMarker
            key={`marker-${marker.content}-${marker.position.lat},${marker.position.lng}`}
            position={marker.position}
            onClick={() => setInfo(marker)}
          >
            {info && info.content === marker.content && (
              <div style={{ color: "#000" }}>{marker.content}</div>
            )}
          </MapMarker>
        ))}
      </Map>
    </MapSection>
  );
};

export default KakaoMap;

const MapSection = styled.section`
  width: 360px;
  height: 100vh;
  margin-left: -17px;
`;
