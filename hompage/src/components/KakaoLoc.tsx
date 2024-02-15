import React, { useState, useEffect } from "react";

declare global {
  interface Window {
    kakao: any;
  }
}

export default function KakaoLoc() {
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

      // 마커 생성 및 지도에 추가
      const newMarker = new window.kakao.maps.Marker({
        position: options.center,
        draggable: true, // 마커를 드래그 가능하게 설정
      });
      newMarker.setMap(newMap);

      setMap(newMap);
      setMarker(newMarker);

      // 드래그 종료 시 이벤트 핸들러 등록
      window.kakao.maps.event.addListener(
        newMarker,
        "dragend",
        handleMarkerDragEnd
      );
    });
  }, []);

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
    if (map && marker) {
      const currentPos = new window.kakao.maps.LatLng(
        pos.coords.latitude,
        pos.coords.longitude
      );

      // 주소 변환
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

      // 마커 위치 업데이트
      marker.setPosition(currentPos);
    }
  };

  const handleMarkerDragEnd = () => {
    // 드래그된 마커 위치에서 주소 다시 가져오기
    const markerPosition = marker.getPosition();
    const lat = markerPosition.getLat();
    const lng = markerPosition.getLng();

    const geocoder = new window.kakao.maps.services.Geocoder();
    geocoder.coord2Address(lng, lat, (result: any, status: any) => {
      if (status === window.kakao.maps.services.Status.OK) {
        const fullAddress = result[0]?.address.address_name || "주소 없음";
        setAddress(fullAddress);
      } else {
        setAddress("주소 변환 실패");
      }
    });
  };

  return (
    <div>
      <div id="map" style={{ width: "100%", height: "700px" }}></div>
      <br />
      <button onClick={getCurrentPosBtn}>현재위치로</button>
      {address && <p>현재 주소: {address}</p>}
    </div>
  );
}
