import { Skeleton } from 'antd';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import { AirQualityHeader, AirQualityOverview } from '@components';
import { AirQuality, AirQuality as AirQualityModel } from '@models';
import { AirQualityService } from '@services';
import { Client } from '@stomp/stompjs';

const Container = styled.div`
  margin-right: auto;
  margin-left: auto;
  padding-right: 18px;
  padding-left: 18px;

  @media only screen and (min-width: 600px) {
    padding-right: 32px;
    padding-left: 32px;
  }

  @media only screen and (min-width: 1440px) {
    max-width: 1440px;
  }

  @media only screen and (min-width: 1500px) {
    padding: 0;
  }
`;

const HeaderContainer = styled(Container)`
  margin-top: 15px;
  margin-bottom: 24px;
`;

const ContentWrapper = styled(Container)`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding-bottom: 72px;
  border-bottom: 1px solid #e6e6e6;
`;

const AirQualityRealtime: React.FC = () => {
  const [airQuality, setAirQuality] = useState<AirQualityModel>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const location = 'Aspire Asoke-Ratchada, Bangkok';

  useEffect(() => {
    AirQualityService.getRealtimeAirQuality().subscribe({
      next: (airQuality) => {
        airQuality.location = location;
        setAirQuality(airQuality);
        setIsLoading(false);
      },
      error: (error) => {
        console.error('Error while fetching air quality data', error);
        setIsLoading(false);
      },
    });
  }, []);

  useEffect(() => {
    const airQualityStompClient = new Client({
      brokerURL: process.env.VITE_APP_BASE_SOCKET,
      reconnectDelay: 5000,
    });
    airQualityStompClient.onConnect = () => {
      airQualityStompClient.subscribe('/topic/air-quality', (message) => {
        const airQualityRealtime: AirQuality = JSON.parse(message.body);
        setAirQuality({
          ...airQualityRealtime,
          location: location,
        });
      });
    };
    airQualityStompClient.activate();

    // Clean up
    return () => {
      if (airQualityStompClient.connected) {
        airQualityStompClient.deactivate();
      }
    };
  }, []);

  return (
    <>
      <HeaderContainer>
        {isLoading && <Skeleton active />}
        {!isLoading && (
          <AirQualityHeader
            location={airQuality.location}
            lastUpdate={airQuality.lastUpdate}
            showSecond={true}
          />
        )}
      </HeaderContainer>
      <ContentWrapper>
        {isLoading && <Skeleton active />}
        {!isLoading && <AirQualityOverview airQuality={airQuality} />}
      </ContentWrapper>
    </>
  );
};

export default AirQualityRealtime;
