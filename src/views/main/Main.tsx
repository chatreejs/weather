import { Skeleton } from 'antd';
import React, { useCallback, useEffect, useState } from 'react';

import {
  AirQualityHeader,
  AirQualityHistorical,
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

const Main: React.FC = () => {
  const [airQuality, setAirQuality] = useState<AirQuality>(null);
  const [weather, setWeather] = useState<Weather>(null);
  const [isAirQualityLoading, setIsAirQualityLoading] = useState<boolean>(true);
  const [isMobile] = useState<boolean>(window.innerWidth < 960);

  const fetchAirQualityData = useCallback(() => {
    AirQualityService.getCurrentAirQuality().subscribe({
      next: (airQuality) => {
        airQuality.location = 'Aspire Asoke-Ratchada, Bangkok';
        setAirQuality(airQuality);
        setIsAirQualityLoading(false);
      },
      error: (error) => {
        console.error('Error while fetching air quality data', error);
        setIsAirQualityLoading(false);
      },
    });
  }, []);

  const fetchWeatherData = useCallback(() => {
    WeatherService.getCurrentWeather().subscribe({
      next: (weather) => {
        setWeather(weather);
      },
      error: (error) => {
        console.error('Error while fetching weather data', error);
      },
    });
  }, []);

  useEffect(() => {
    fetchAirQualityData();
    fetchWeatherData();
  }, [fetchAirQualityData, fetchWeatherData]);

  return (
    <>
      <HeaderContainer>
        {isAirQualityLoading && <Skeleton active />}
        {!isAirQualityLoading && (
          <AirQualityHeader
            location={airQuality.location}
            lastUpdate={airQuality.lastUpdate}
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
                <AirQualityHistorical location={airQuality.location} />
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
              <AirQualityHistorical location={airQuality.location} />
            </>
          )}
        </Container>
      )}
    </>
  );
};

export default Main;
