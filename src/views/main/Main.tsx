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
import { AirQuality, Weather } from '@models';
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
  const [weather, setWeather] = useState<Weather>({
    temperature: 25,
    humidity: 61,
    pressure: 1100,
    lastUpdate: '',
    source: 'mock',
    location: 'Aspire Asoke-Ratchada, Bangkok',
  });
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isMobile] = useState<boolean>(window.innerWidth < 960);

  const fetchAirQuality = useCallback(() => {
    AirQualityService.getCurrentAirQuality().subscribe({
      next: (airQuality) => {
        airQuality.location = 'Aspire Asoke-Ratchada, Bangkok';
        setAirQuality(airQuality);
        setIsLoading(false);
      },
      error: (error) => {
        console.error('Error while fetching air quality data', error);
        setIsLoading(false);
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
        {isLoading && <Skeleton active />}
        {!isLoading && (
          <AirQualityHeader
            location={airQuality.location}
            lastUpdate={airQuality.lastUpdate}
          />
        )}
      </HeaderContainer>
      {!isMobile && (
        <ContentWrapper>
          {isLoading && <Skeleton active />}
          {!isLoading && (
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
          {isLoading && <Skeleton active />}
          {!isLoading && (
            <>
              <AirQualityOverview airQuality={airQuality} />
              <ContributorSource
                contributorName="Chatree.dev"
                profileImageUrl="https://avatars.githubusercontent.com/u/36321701?v=4"
                contributorType="Individual"
              />
              <AirQualityHistorical location={airQuality.location} />
            </>
          )}
        </Container>
      )}
    </>
  );
};

export default Main;
