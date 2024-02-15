import { useState, useEffect } from "react";
import { Map, MapMarker } from "react-kakao-maps-sdk";

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
  const [marker, setMarker] = useState<boolean>(false);
  const [state, setState] = useState<State>({
    center: {
      lat: 33.450701,
      lng: 126.570667,
    },
    errMsg: null,
    isLoading: true,
  });

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setState((prev) => ({
            ...prev,
            center: {
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            },
            isLoading: false,
          }));
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
        errMsg: "geolocation을 사용할수 없어요..",
        isLoading: false,
      }));
    }
  }, []);

  return (
    <>
      <Map
        center={state.center}
        style={{
          width: "100%",
          height: "450px",
        }}
        level={3}
      >
        {!state.isLoading && (
          <MapMarker
            position={state.center}
            image={{
              src: marker ? "/map_PinSelected.png" : "/map_Pin.png",
              size: {
                width: 14,
                height: 16,
              },
              // options: {
              //   offset: {
              //     x: 27,
              //     y: 69,
              //   }, // 마커이미지의 옵션입니다. 마커의 좌표와 일치시킬 이미지 안에서의 좌표를 설정합니다.
              // },
            }}
            onClick={() => setMarker(!marker)}
          >
            <div style={{ padding: "5px", color: "#000" }}>
              {state.errMsg ? state.errMsg : "내위치다"}
            </div>
          </MapMarker>
        )}
      </Map>
    </>
  );
}

export default KakaoGeo;
