import { Map, MapMarker, useMap } from "react-kakao-maps-sdk";
// import useKakaoLoader from "../../node_modules/useKakaoLoader";
import { useMemo, useState, useEffect } from "react";

export default function SetBounds() {
  //   useKakaoLoader();
  const [points] = useState<
    {
      lat: number;
      lng: number;
    }[]
  >([
    { lat: 33.452278, lng: 126.567803 },
    { lat: 33.452671, lng: 126.574792 },
    { lat: 33.451744, lng: 126.572441 },
  ]);

  return (
    <>
      <Map
        id="map"
        center={{
          lat: 33.450701,
          lng: 126.570667,
        }}
        style={{
          width: "100%",
          height: "350px",
        }}
        level={3}
      >
        {points.map((point) => (
          <MapMarker
            key={`marker__${point.lat}-${point.lng}`}
            position={point}
          />
        ))}
        <ReSettingMapBounds points={points} />
        <MoveToCurrentLocation />
      </Map>
    </>
  );
}

const ReSettingMapBounds = ({
  points,
}: {
  points: { lat: number; lng: number }[];
}) => {
  const map = useMap();
  const bounds = useMemo(() => {
    const bounds = new kakao.maps.LatLngBounds();

    points.forEach((point) => {
      bounds.extend(new kakao.maps.LatLng(point.lat, point.lng));
    });
    return bounds;
  }, [points]);

  return (
    <p>
      <button onClick={() => map.setBounds(bounds)}>
        지도 범위 재설정 하기
      </button>
    </p>
  );
};

const MoveToCurrentLocation = () => {
  const map = useMap();

  const moveToCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const lat = position.coords.latitude;
          const lng = position.coords.longitude;
          map.setCenter(new kakao.maps.LatLng(lat, lng));
        },
        (error) => {
          console.error("Geolocation failed: ", error);
        }
      );
    } else {
      alert("이 브라우저에서는 Geolocation이 지원되지 않습니다.");
    }
  };

  return (
    <p>
      <button onClick={moveToCurrentLocation}>내 위치로 이동하기</button>
    </p>
  );
};
