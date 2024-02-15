import { useState, useEffect } from "react";
import { Map, MapMarker } from "react-kakao-maps-sdk";
import styled from "styled-components";

// 상태 타입 정의
interface State {
  center: {
    lat: number;
    lng: number;
  };
  errMsg: string | null;
  isLoading: boolean;
}

function KakaoGeo() {
  const [markerPosition, setMarkerPosition] = useState({
    lat: 33.450701,
    lng: 126.570667,
  });

  const [state, setState] = useState<State>({
    center: {
      lat: 33.450701,
      lng: 126.570667,
    },
    errMsg: null,
    isLoading: true,
  });

  const [map, setMap] = useState<kakao.maps.Map | null>(null); // 지도 객체를 관리하는 상태

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const newPos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          setState((prev) => ({
            ...prev,
            center: newPos,
            isLoading: false,
          }));
          setMarkerPosition(newPos);
        },
        (err) => {
          setState((prev) => ({
            ...prev,
            errMsg: err.message,
            isLoading: false,
          }));
        }
      );
    } else {
      setState((prev) => ({
        ...prev,
        errMsg: "Geolocation is not supported by this browser.",
        isLoading: false,
      }));
    }
  }, []);

  const moveToCurrentLocation = () => {
    if (navigator.geolocation && map) {
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
    <>
      <Map
        center={state.center}
        style={{ width: "500px", height: "450px" }}
        level={3}
        onCreate={setMap} // Map 컴포넌트가 생성될 때 지도 객체를 상태에 저장
      >
        {!state.isLoading && (
          <MapMarker
            position={markerPosition}
            image={{
              src: "/map_Pin.png",
              size: {
                width: 24,
                height: 35,
              },
            }}
          >
            <MarkerTextBox>
              {state.errMsg ? state.errMsg : "내 위치"}
            </MarkerTextBox>
          </MapMarker>
        )}
      </Map>
      <button onClick={moveToCurrentLocation}>내 위치로</button>
    </>
  );
}

const MarkerTextBox = styled.div`
  padding: 4px;
`;

export default KakaoGeo;
