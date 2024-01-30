import KakaoMap from "../components/KakaoMap";
import KakaoOne from "../components/KakaoOne";
import MapContainer from "../components/KakaoTest";
import { MainPageLayout } from "./MainStyle";
function MainPage() {
  return (
    <>
      <MainPageLayout>
        {/* <KakaoMap /> */}
        <MapContainer />
        <KakaoOne />
      </MainPageLayout>
    </>
  );
}

export default MainPage;
