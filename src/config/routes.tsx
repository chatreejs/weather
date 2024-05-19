import { Navigate, Route, Routes } from 'react-router-dom';

import { AirQuality, AirQualityRealtime } from '@views';

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/air-quality" element={<AirQuality />} />
      <Route path="/air-quality-realtime" element={<AirQualityRealtime />} />
      <Route path="*" element={<Navigate to="/air-quality" />} />
    </Routes>
  );
};

export default AppRoutes;
