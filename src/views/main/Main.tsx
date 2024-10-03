import { Skeleton } from 'antd';
import React, { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';

import {
  AirQualityHeader,
  AirQualityHistorical,
  AirQualityOverview,
  ContributorSource,
  LeftSide,
  RightSide,
  WeatherSummary,
} from '@components';
import { AirQuality, WeatherSensor } from '@models';
import { AirQualityService } from '@services';

const Container = styled.div`
  width: 100%;
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
  justify-content: space-between;
  padding-bottom: 72px;
  border-bottom: 1px solid #e6e6e6;
`;

const Main: React.FC = () => {
  const [airQuality, setAirQuality] = useState<AirQuality>(null);
  const [weatherSensor, setWeatherSensor] = useState<WeatherSensor>({
    temperature: 25,
    humidity: 61,
    pressure: 1100,
    lastUpdate: '',
    source: 'mock',
    location: 'Aspire Asoke-Ratchada, Bangkok',
  });
  const [isAirQualityLoading, setIsAirQualityLoading] = useState<boolean>(true);
  const [isMobile] = useState<boolean>(window.innerWidth < 960);

  const fetchAirQuality = useCallback(() => {
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

  const fetchWeather = useCallback(() => {
    // WeatherService.getCurrentWeather().subscribe({
    //   next: (weather) => {
    //     setWeather(weather);
    //     setIsLoading(false);
    //   },
    //   error: (error) => {
    //     console.error('Error while fetching weather data', error);
    //     setIsLoading(false);
    //   },
    // });
  }, []);

  useEffect(() => {
    fetchAirQuality();
  }, [fetchAirQuality]);

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
                <WeatherSummary weatherSensor={weatherSensor} />
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
              <WeatherSummary weatherSensor={weatherSensor} />
              <AirQualityHistorical location={airQuality.location} />
            </>
          )}
        </Container>
      )}
    </>
  );
};

export default Main;
