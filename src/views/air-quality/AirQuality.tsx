import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import { AirQuality as AirQualityModel } from '@models';
import { AirQualityService } from '@services';
import { Skeleton } from 'antd';
import AirQualityHeader from './components/AirQualityHeader';
import AirQualityHistorical from './components/AirQualityHistorical';
import AirQualityOverview from './components/AirQualityOverview';

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

const AirQuality: React.FC = () => {
  const [airQuality, setAirQuality] = useState<AirQualityModel>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    AirQualityService.getCurrentAirQuality().subscribe({
      next: (airQuality) => {
        airQuality.location = 'Aspire Asoke - Ratchada, Bangkok';
        setAirQuality(airQuality);
        setIsLoading(false);
      },
      error: (error) => {
        console.error('Error while fetching air quality data', error);
        setIsLoading(false);
      },
    });
  }, []);

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
      <ContentWrapper>
        {isLoading && <Skeleton active />}
        {!isLoading && <AirQualityOverview airQuality={airQuality} />}
        {!isLoading && <AirQualityHistorical location={airQuality.location} />}
      </ContentWrapper>
    </>
  );
};

export default AirQuality;
