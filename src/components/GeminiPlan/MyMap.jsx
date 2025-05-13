// App.jsx 혹은 필요한 컴포넌트에서 사용
import { GoogleMap, LoadScript } from "@react-google-maps/api";

export default function MyMapComponent() {
  return (
    <LoadScript googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}>
      <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={12}>
        {/* 마커나 기타 컴포넌트 추가 가능 */}
      </GoogleMap>
    </LoadScript>
  );
}

const containerStyle = {
  width: "100%",
  height: "20.3rem",
};

const center = {
  lat: 37.5665, // 예: 서울
  lng: 126.978,
};
