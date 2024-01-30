import KakaoMap from "./components/KakaoMap";
import NaverMap from "./components/NaverMap";
import { Reset } from "styled-reset";
import MainPage from "./pages/MainPage";
import styled from "styled-components";

// const MainLayout = styled.div`
//   display: flex;
//   justify-content: center;
// `;

function App() {
  return (
    <>
      {/* <MainLayout> */}
      <Reset />
      <MainPage />
      {/* </MainLayout> */}
    </>
  );
}

export default App;
