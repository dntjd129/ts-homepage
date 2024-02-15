import KakaoGeo from "../components/KakakoGeo";
import KakaoLoc from "../components/KakaoLoc";
import KakaoLocation from "../components/KakaoLocation";
import KakaoMap from "../components/KakaoMap";
import KakaoOne from "../components/KakaoOne";
import KakaoSdk from "../components/KakaoSdk";
import MapContainer from "../components/KakaoTest";
import { MainPageLayout } from "./MainStyle";
function MainPage() {
  return (
    <>
      <MainPageLayout>
        {/* <MapContainer /> */}
        {/* <KakaoOne /> */}
        {/* <KakaoLocation /> */}
        {/* <KakaoLoc /> */}
        {/* <KakaoSdk /> */}
        <KakaoGeo />
      </MainPageLayout>
    </>
  );
}

export default MainPage;
