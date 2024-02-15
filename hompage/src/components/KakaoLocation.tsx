import React, { useState, useEffect } from "react";

declare global {
  interface Window {
    kakao: any;
  }
}

export default function KakaoLocation() {
  const [map, setMap] = useState<any>();
  const [marker, setMarker] = useState<any>();
  const [address, setAddress] = useState<string | null>(null);

  useEffect(() => {
    window.kakao.maps.load(() => {
      const container = document.getElementById("map");
      const options = {
        center: new window.kakao.maps.LatLng(33.450701, 126.570667),
        level: 3,
      };

      const newMap = new window.kakao.maps.Map(container, options);
      setMap(newMap);
      setMarker(new window.kakao.maps.Marker());
    });
  }, []);

  useEffect(() => {
    getCurrentPosBtn();
  }, [marker]);

  const getCurrentPosBtn = () => {
    navigator.geolocation.getCurrentPosition(
      getPosSuccess,
      () => alert("위치정보 X"),
      {
        enableHighAccuracy: true,
        maximumAge: 30000,
        timeout: 27000,
      }
    );
  };

  const getPosSuccess = (pos: GeolocationPosition) => {
    if (map) {
      const currentPos = new window.kakao.maps.LatLng(
        pos.coords.latitude,
        pos.coords.longitude
      );

      const geocoder = new window.kakao.maps.services.Geocoder();
      geocoder.coord2Address(
        currentPos.getLng(),
        currentPos.getLat(),
        (result: any, status: any) => {
          if (status === window.kakao.maps.services.Status.OK) {
            const fullAddress = result[0]?.address.address_name || "주소 없음";
            setAddress(fullAddress);
          } else {
            setAddress("주소 변환 실패");
          }
        }
      );

      map.panTo(currentPos);

      marker.setMap(null);
      marker.setPosition(currentPos);
      marker.setMap(map);
    }
  };

  return (
    <div>
      <div id="map" style={{ width: "100%", height: "700px" }}></div>
      <br />
      <button onClick={getCurrentPosBtn}>현재위치로</button>
      <br />
      {address && <p>{address}</p>}
    </div>
  );
}
