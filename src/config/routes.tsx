import { Navigate, Route, Routes } from 'react-router-dom';

import { Main, Realtime } from '@views';

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Main />} />
      <Route path="/realtime" element={<Realtime />} />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};

export default AppRoutes;
