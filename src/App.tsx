import { ConfigProvider } from 'antd';
import React from 'react';
import Router from './config/routes';

const App: React.FC = () => {
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#49739a',
        },
      }}
    >
      <Router />
    </ConfigProvider>
  );
};

export default App;
