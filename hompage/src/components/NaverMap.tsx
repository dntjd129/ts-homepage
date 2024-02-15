// import { useState, useEffect } from "react";

// function NaverMap() {
//   const { naver } = window;
//   const [myLocation, setMyLocation] = useState<
//     { latitude: number; longitude: number } | string
//   >("");

//   useEffect(() => {
//     if (navigator.geolocation) {
//       navigator.geolocation.getCurrentPosition((position) => {
//         setMyLocation({
//           latitude: position.coords.latitude,
//           longitude: position.coords.longitude,
//         });
//       });
//     } else {
//       window.alert("현재위치를 알수 없습니다.");
//     }
//   }, []);

//   useEffect(() => {
//     if (typeof myLocation !== "string") {
//       const currentPosition = [myLocation.latitude, myLocation.longitude];

//       const map = new naver.maps.Map("map", {
//         center: new naver.maps.LatLng(currentPosition[0], currentPosition[1]),
//         zoomControl: true,
//       });
//     }
//   }, [myLocation]);

//   // 내 위치 마커 표시하기
//   useEffect(() => {
//     if (typeof myLocation !== "string") {
//       const currentPosition = [myLocation.latitude, myLocation.longitude];

//       const map = new naver.maps.Map("map", {
//         center: new naver.maps.LatLng(currentPosition[0], currentPosition[1]),
//         zoomControl: true,
//       });

//       const currentMarker = new naver.maps.Marker({
//         position: new naver.maps.LatLng(currentPosition[0], currentPosition[1]),
//         map,
//         // 원하는 이미지로 마커 커스텀
//         // icon: {
//         //     url: pinImage,
//         //     size: new naver.maps.Size(50, 52),
//         //     origin: new naver.maps.Point(0, 0),
//         //     anchor: new naver.maps.Point(25, 26),
//         //   },
//       });
//     }
//   }, [myLocation]);

//   const otherLatLngs = [
//     { lat: 37.4859, lng: 126.997865 },
//     { lat: 37.48528, lng: 126.997227 },
//     { lat: 37.485535, lng: 126.999528 },
//     { lat: 37.484234, lng: 126.999292 },
//   ];

//   useEffect(() => {
//     if (typeof myLocation !== "string") {
//       const currentPosition = [myLocation.latitude, myLocation.longitude];

//       const map = new naver.maps.Map("map", {
//         center: new naver.maps.LatLng(currentPosition[0], currentPosition[1]),
//         zoomControl: true,
//       });

//       const currentMarker = new naver.maps.Marker({
//         position: new naver.maps.LatLng(currentPosition[0], currentPosition[1]),
//         map,
//       });

//       // 주변 마커 나타내기
//       for (let i = 0; i < otherLatLngs.length; i++) {
//         const otherMarkers = new naver.maps.Marker({
//           position: new naver.maps.LatLng(
//             otherLatLngs[i].lat,
//             otherLatLngs[i].lng
//           ),
//           map,
//         });
//       }
//     }
//   }, [myLocation]);

//   // 주변마커 오버레이 클릭 이벤트 적용하기
//   useEffect(() => {
//     if (typeof myLocation !== "string") {
//       const currentPosition = [myLocation.latitude, myLocation.longitude];

//       const map = new naver.maps.Map("map", {
//         center: new naver.maps.LatLng(currentPosition[0], currentPosition[1]),
//         zoomControl: true,
//       });

//       const currentMarker = new naver.maps.Marker({
//         position: new naver.maps.LatLng(currentPosition[0], currentPosition[1]),
//         map,
//       });

//       // 주변 마커 나타내기
//       const markers: naver.maps.Marker[] = [];
//       const infowindows: naver.maps.InfoWindow[] = [];
//       const contentTags =
//         '<div class="naver-container"><p class="ptag">여깁니다</p><span class="spantag">맞아요</span></div>';

//       // 반복문을 통해 찍어준다
//       for (let i = 0; i < otherLatLngs.length; i += 1) {
//         const otherMarkers = new naver.maps.Marker({
//           position: new naver.maps.LatLng(
//             otherLatLngs[i].lat,
//             otherLatLngs[i].lng
//           ),
//           map,
//         });

//         const infowindow = new naver.maps.InfoWindow({
//           content: contentTags,
//           borderWidth: 1,
//           anchorSize: new naver.maps.Size(10, 10),
//           pixelOffset: new naver.maps.Point(10, -10),
//         });

//         markers.push(otherMarkers);
//         infowindows.push(infowindow);
//       }

//       naver.maps.Event.addListener(map, "idle", () => {
//         updateMarkers(map, markers);
//       });

//       const updateMarkers = (
//         isMap: naver.maps.Map,
//         isMarkers: naver.maps.Marker[]
//       ) => {
//         const mapBounds: any = isMap.getBounds();
//         let marker;
//         let position;

//         for (let i = 0; i < isMarkers.length; i += 1) {
//           marker = isMarkers[i];
//           position = marker.getPosition();

//           if (mapBounds.hasLatLng(position)) {
//             showMarker(isMap, marker);
//           } else {
//             hideMarker(marker);
//           }
//         }
//       };

//       const showMarker = (isMap: naver.maps.Map, marker: naver.maps.Marker) => {
//         marker.setMap(isMap);
//       };

//       const hideMarker = (marker: naver.maps.Marker) => {
//         marker.setMap(null);
//       };

//       const getClickHandler = (seq: number) => {
//         return () => {
//           const marker = markers[seq];
//           const infoWindow = infowindows[seq];

//           if (infoWindow.getMap()) {
//             infoWindow.close();
//           } else {
//             infoWindow.open(map, marker);
//           }
//         };
//       };

//       for (let i = 0; i < markers.length; i += 1) {
//         naver.maps.Event.addListener(markers[i], "click", getClickHandler(i));
//       }
//     }
//   }, [myLocation]);

//   return <div id="map" style={{ width: "100%", height: "500px" }} />;
// }

// export default NaverMap;

export {};
