import React, { useEffect, useState } from "react";
import "./KakaoOne.css";

declare global {
  interface Window {
    kakao: any;
  }
}

const KakaoOne: React.FC = () => {
  const [map, setMap] = useState<any>(null);
  const [placeOverlay, setPlaceOverlay] = useState<any | null>(null);
  const [markers, setMarkers] = useState<any[]>([]);
  const [currCategory, setCurrCategory] = useState<string>("");

  useEffect(() => {
    const mapContainer = document.getElementById("map");
    const mapOptions = {
      center: new window.kakao.maps.LatLng(37.566826, 126.9786567),
      level: 5,
    };

    const newMap = new window.kakao.maps.Map(mapContainer, mapOptions);
    setMap(newMap);

    const newPlaceOverlay = new window.kakao.maps.CustomOverlay({ zIndex: 1 });
    setPlaceOverlay(newPlaceOverlay);

    // 각 카테고리에 클릭 이벤트를 등록
    addCategoryClickEvent();

    // 지도에 idle 이벤트 등록
    window.kakao.maps.event.addListener(newMap, "idle", searchPlaces);

    return () => {
      // 컴포넌트가 언마운트될 때 마커 제거 및 리스너 제거
      removeMarker();
      window.kakao.maps.event.removeListener(newMap, "idle", searchPlaces);
    };
  }, []);

  const addCategoryClickEvent = () => {
    const category = document.getElementById("category");
    const children = category?.children || [];

    for (let i = 0; i < children.length; i++) {
      children[i].addEventListener("click", onClickCategory);
    }
  };

  const searchPlaces = () => {
    if (!currCategory) {
      return;
    }

    if (placeOverlay) {
      placeOverlay.setMap(null);
    }

    removeMarker();

    const ps = new window.kakao.maps.services.Places(map);
    ps.categorySearch(currCategory, placesSearchCB, { useMapBounds: true });
  };

  const placesSearchCB = (data: any, status: any) => {
    if (status === window.kakao.maps.services.Status.OK) {
      displayPlaces(data);
    } else if (status === window.kakao.maps.services.Status.ZERO_RESULT) {
      // 검색결과가 없는 경우
    } else if (status === window.kakao.maps.services.Status.ERROR) {
      // 에러로 인해 검색결과가 나오지 않은 경우
    }
  };

  const displayPlaces = (places: any[]) => {
    for (let i = 0; i < places.length; i++) {
      const marker = addMarker(
        new window.kakao.maps.LatLng(places[i].y, places[i].x),
        i
      );
      (function (m, p) {
        window.kakao.maps.event.addListener(m, "click", function () {
          displayPlaceInfo(p);
        });
      })(marker, places[i]);
    }
  };

  const addMarker = (position: any, order: number) => {
    const imageSrc =
      "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/places_category.png";
    const imageSize = new window.kakao.maps.Size(27, 28);
    const imgOptions = {
      spriteSize: new window.kakao.maps.Size(72, 208),
      spriteOrigin: new window.kakao.maps.Point(46, order * 36),
      offset: new window.kakao.maps.Point(11, 28),
    };
    const markerImage = new window.kakao.maps.MarkerImage(
      imageSrc,
      imageSize,
      imgOptions
    );
    const marker = new window.kakao.maps.Marker({
      position: position,
      image: markerImage,
    });

    marker.setMap(map);
    setMarkers((prevMarkers) => [...prevMarkers, marker]);

    return marker;
  };

  const removeMarker = () => {
    for (let i = 0; i < markers.length; i++) {
      markers[i].setMap(null);
    }
    setMarkers([]);
  };

  const displayPlaceInfo = (place: any) => {
    const content = `<div class="placeinfo">
                        <a class="title" href="${place.place_url}" target="_blank" title="${place.place_name}">${place.place_name}</a>`;

    let contentHTML = "";
    if (place.road_address_name) {
      contentHTML += `    <span title="${place.road_address_name}">${place.road_address_name}</span>
                        <span class="jibun" title="${place.address_name}">(지번 : ${place.address_name})</span>`;
    } else {
      contentHTML += `    <span title="${place.address_name}">${place.address_name}</span>`;
    }

    contentHTML += `    <span class="tel">${place.phone}</span>
                    </div>
                    <div class="after"></div>`;

    contentHTML = content + contentHTML;

    if (placeOverlay) {
      placeOverlay.setContent(contentHTML);
      placeOverlay.setPosition(new window.kakao.maps.LatLng(place.y, place.x));
      placeOverlay.setMap(map);
    }
  };

  const onClickCategory = (event: any) => {
    const id = event.target.id;
    const className = event.target.className;

    if (placeOverlay) {
      placeOverlay.setMap(null);
    }

    if (className === "on") {
      setCurrCategory("");
      changeCategoryClass();
      removeMarker();
    } else {
      setCurrCategory(id);
      changeCategoryClass(event.target);
      searchPlaces();
    }
  };

  const changeCategoryClass = (el?: any) => {
    const category = document.getElementById("category");
    const children = category?.children || [];

    for (let i = 0; i < children.length; i++) {
      children[i].className = "";
    }

    if (el) {
      el.className = "on";
    }
  };

  return (
    <div>
      <div className="map_wrap">
        <div
          id="map"
          style={{
            width: "100%",
            height: "100%",
            position: "relative",
            overflow: "hidden",
          }}
        />
        <ul id="category">
          <li id="BK9" data-order="0">
            <span className="category_bg bank"></span>
            은행
          </li>
          <li id="MT1" data-order="1">
            <span className="category_bg mart"></span>
            마트
          </li>
          <li id="PM9" data-order="2">
            <span className="category_bg pharmacy"></span>
            약국
          </li>
          <li id="OL7" data-order="3">
            <span className="category_bg oil"></span>
            주유소
          </li>
          <li id="CE7" data-order="4">
            <span className="category_bg cafe"></span>
            카페
          </li>
          <li id="CS2" data-order="5">
            <span className="category_bg store"></span>
            편의점
          </li>
        </ul>
      </div>
    </div>
  );
};

export default KakaoOne;
