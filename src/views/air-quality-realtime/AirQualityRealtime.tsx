import { Skeleton } from 'antd';
import React, { useCallback, useEffect, useState } from 'react';
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
`;

const AirQualityRealtime: React.FC = () => {
  const [airQuality, setAirQuality] = useState<AirQualityModel>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const location = 'Aspire Asoke-Ratchada, Bangkok';

  const fetchAirQualityData = useCallback(() => {
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
  }, [location]);

  const handleAirQualityMessage = (message) => {
    const body: AirQuality = JSON.parse(message.body);
    setAirQuality({
      location: location,
      ...body,
    });
  };

  const setupStompClient = useCallback(() => {
    const airQualityStompClient = new Client({
      brokerURL: process.env.VITE_APP_BASE_SOCKET,
      reconnectDelay: 5000,
    });

    airQualityStompClient.onConnect = () => {
      airQualityStompClient.subscribe(
        '/topic/air-quality',
        handleAirQualityMessage,
      );
    };

    airQualityStompClient.activate();

    return () => {
      airQualityStompClient.deactivate();
    };
  }, []);

  useEffect(() => {
    fetchAirQualityData();
  }, [fetchAirQualityData]);

  useEffect(() => {
    const stompClient = setupStompClient();
    return stompClient;
  }, [setupStompClient]);

  return (
    <>
      <HeaderContainer>
        {isLoading && <Skeleton active />}
        {!isLoading && (
          <AirQualityHeader
            location={airQuality.location}
            lastUpdate={airQuality.lastUpdate}
            showSecond={true}
            realTime={true}
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
