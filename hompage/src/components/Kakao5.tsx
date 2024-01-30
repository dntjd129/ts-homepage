import React, { useEffect, useRef } from "react";
import styled from "styled-components";

const S = {
  TitleButtonFlex: styled.div``,
  Heading3: styled.h3``,
  Paragraph: styled.p``,
  MapDiv: styled.div`
    width: 100%;
    height: 350px;
  `,
};

interface MapProps {
  address: string;
}

export const Map: React.FC<MapProps> = ({ address }) => {
  const divRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<kakao.maps.Map | null>(null);
  const markerRef = useRef<kakao.maps.Marker | null>(null);
  const geocoderRef = useRef<kakao.maps.services.Geocoder | null>(null);

  useEffect(() => {
    if (!window.kakao?.maps?.services) {
      // Kakao 지도 서비스가 없을 경우 예외 처리
      console.error("Kakao maps services not available.");
      return;
    }

    const geocoder = new window.kakao.maps.services.Geocoder();
    geocoderRef.current = geocoder;

    const mapContainer = divRef.current;
    const mapOption = {
      center: new window.kakao.maps.LatLng(37.556944, 126.923917),
      level: 5,
    };

    const map = new window.kakao.maps.Map(mapContainer, mapOption);
    mapRef.current = map;

    const marker = new window.kakao.maps.Marker({
      position: new window.kakao.maps.LatLng(37.556944, 126.923917),
      map: map,
    });
    markerRef.current = marker;
  }, []);

  useEffect(() => {
    if (
      !window.kakao?.maps?.services ||
      !geocoderRef.current ||
      !mapRef.current ||
      !markerRef.current ||
      !address
    ) {
      // Kakao 지도 서비스가 없거나 주소 또는 관련 객체가 없을 경우 예외 처리
      console.error(
        "Kakao maps services, geocoder, map, marker, or address not available."
      );
      return;
    }

    geocoderRef.current.addressSearch(address, (results: any, status: any) => {
      if (status === window.kakao.maps.services.Status.OK) {
        const result = results[0];
        const coords = new window.kakao.maps.LatLng(result.y, result.x);

        if (divRef.current) {
          divRef.current.style.display = "block";
        }

        mapRef.current.relayout();
        mapRef.current.setCenter(coords);
        markerRef.current.setPosition(coords);
      }
    });
  }, [address]);

  return (
    <>
      <S.TitleButtonFlex>
        <S.Heading3>공연장 위치</S.Heading3>
      </S.TitleButtonFlex>
      <S.Paragraph>{address || "홍대"}</S.Paragraph>
      <S.MapDiv id="map" ref={divRef} />
    </>
  );
};
