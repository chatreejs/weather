import { Client } from '@stomp/stompjs';
import { Skeleton } from 'antd';
import React, { useCallback, useEffect, useState } from 'react';

import {
  AirQualityHeader,
  AirQualityOverview,
  Container,
  ContentWrapper,
  ContributorSource,
  HeaderContainer,
  LeftSide,
  RightSide,
  WeatherSummary,
} from '@components';
import { AirQuality, WeatherSensor } from '@models';
import { AirQualityService } from '@services';

const Realtime: React.FC = () => {
  const [airQuality, setAirQuality] = useState<AirQuality>(null);
  const [weatherSensor, setWeatherSensor] = useState<WeatherSensor>(null);
  const [isAirQualityLoading, setIsAirQualityLoading] = useState<boolean>(true);
  const [isMobile] = useState<boolean>(window.innerWidth < 960);
  const location = 'Aspire Asoke-Ratchada, Bangkok';

  const fetchAirQualityData = useCallback(() => {
    AirQualityService.getRealtimeAirQuality().subscribe({
      next: (airQuality) => {
        airQuality.location = location;
        setAirQuality(airQuality);
        setIsAirQualityLoading(false);
      },
      error: (error) => {
        console.error('Error while fetching air quality data', error);
        setIsAirQualityLoading(false);
      },
    });
  }, [location]);

  const handleWeatherSensorMessage = (message) => {
    const body: WeatherSensor = JSON.parse(message.body);
    setWeatherSensor({
      location: location,
      ...body,
    });
  };

  const handleAirQualityMessage = (message) => {
    const body: AirQuality = JSON.parse(message.body);
    setAirQuality({
      location: location,
      ...body,
    });
  };

  const setupStompClient = useCallback(() => {
    const weatherStompClient = new Client({
      brokerURL: process.env.VITE_APP_BASE_SOCKET,
      reconnectDelay: 5000,
    });

    weatherStompClient.onConnect = () => {
      weatherStompClient.subscribe(
        '/topic/weather-sensor',
        handleWeatherSensorMessage,
      );
      weatherStompClient.subscribe(
        '/topic/air-quality',
        handleAirQualityMessage,
      );
    };

    weatherStompClient.activate();

    return () => {
      weatherStompClient.deactivate();
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
        {isAirQualityLoading && <Skeleton active />}
        {!isAirQualityLoading && (
          <AirQualityHeader
            location={airQuality.location}
            lastUpdate={airQuality.lastUpdate}
            showSecond={true}
            realTime={true}
          />
        )}
      </HeaderContainer>
      {!isMobile && (
        <ContentWrapper>
          {isAirQualityLoading && <Skeleton active />}
          {!isAirQualityLoading && (
            <>
              <LeftSide>
                <ContributorSource
                  contributorName="Chatree.dev"
                  profileImageUrl="https://avatars.githubusercontent.com/u/36321701?v=4"
                  contributorType="Individual"
                />
                <WeatherSummary weatherSensor={weatherSensor} />
              </LeftSide>
              <RightSide>
                <AirQualityOverview airQuality={airQuality} />
              </RightSide>
            </>
          )}
        </ContentWrapper>
      )}
      {isMobile && (
        <Container>
          {isAirQualityLoading && <Skeleton active />}
          {!isAirQualityLoading && (
            <>
              <AirQualityOverview airQuality={airQuality} />
              <ContributorSource
                contributorName="Chatree.dev"
                profileImageUrl="https://avatars.githubusercontent.com/u/36321701?v=4"
                contributorType="Individual"
              />
              <WeatherSummary weatherSensor={weatherSensor} />
            </>
          )}
        </Container>
      )}
    </>
  );
};

export default Realtime;