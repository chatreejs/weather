import { Skeleton } from 'antd';
import React from 'react';
import styled from 'styled-components';

import { Card, SectionTitle } from '@components';
import { Weather } from '@models';
import WeatherDetailTable from './components/WeatherDetailTable';
import WeatherSummaryImage from './components/WeatherSummaryImage';

const WeatherWrapper = styled.div`
  margin-bottom: 16px;

  @media only screen and (min-width: 960px) {
    margin-bottom: 24px;
  }

  .ant-card .ant-card-body {
    padding: 0 !important;
  }
`;

const StyledSkeleton = styled(Skeleton)`
  padding: 16px;

  @media only screen and (min-width: 960px) {
    padding: 24px;
  }
`;

const SummaryWrapper = styled.div`
  padding: 16px;
  background-color: #f3f7fb;
  display: flex;
  justify-content: space-between;

  @media only screen and (min-width: 960px) {
    padding: 24px;
  }
`;

interface WeatherSummaryProps {
  weather: Weather;
}

const WeatherSummary: React.FC<WeatherSummaryProps> = ({ weather }) => (
  <WeatherWrapper>
    <Card bordered={false}>
      {!weather ? (
        <StyledSkeleton active={true} />
      ) : (
        <>
          <SummaryWrapper>
            <div style={{ marginRight: 16 }}>
              <SectionTitle title="Weather" />
              <h2
                style={{
                  fontSize: 18,
                  lineHeight: 1.44,
                  color: '#414141',
                  fontWeight: 500,
                }}
              >
                What is the current weather in {weather?.location}?
              </h2>
            </div>
            <WeatherSummaryImage />
          </SummaryWrapper>
          <WeatherDetailTable weather={weather} />
        </>
      )}
    </Card>
  </WeatherWrapper>
);

export default WeatherSummary;
