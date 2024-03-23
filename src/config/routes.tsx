import { Navigate, Route, Routes } from 'react-router-dom';

import { AirQuality } from '@views';

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/air-quality" element={<AirQuality />} />
      <Route path="*" element={<Navigate to="/air-quality" />} />
    </Routes>
  );
};

export default AppRoutes;
