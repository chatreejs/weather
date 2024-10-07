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
import { AirQuality, Weather } from '@interfaces';
import { AirQualityService, WeatherService } from '@services';

const Realtime: React.FC = () => {
  const [airQuality, setAirQuality] = useState<AirQuality>(null);
  const [weather, setWeather] = useState<Weather>(null);
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

  const fetchWeatherData = useCallback(() => {
    WeatherService.getRealtimeWeather().subscribe({
      next: (weather) => {
        weather.location = location;
        setWeather(weather);
      },
      error: (error) => {
        console.error('Error while fetching weather data', error);
      },
    });
  }, []);

  const handleWeatherMessage = (message) => {
    const body: Weather = JSON.parse(message.body);
    setWeather({
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
        handleWeatherMessage,
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
    fetchWeatherData();
  }, [fetchAirQualityData, fetchWeatherData]);

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
                <WeatherSummary weather={weather} />
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
              <WeatherSummary weather={weather} />
            </>
          )}
        </Container>
      )}
    </>
  );
};

export default Realtime;
