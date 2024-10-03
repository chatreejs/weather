import { Card } from 'antd';
import React from 'react';
import styled from 'styled-components';

import { SectionTitle } from '@components';
import { Weather } from '@models';
import NightRainFullImage from '../../assets/images/ic-w-12-night-rain-full.svg';

const WeatherWrapper = styled.div`
  margin-bottom: 16px;

  @media only screen and (min-width: 960px) {
    margin-bottom: 24px;
  }

  .ant-card {
    box-shadow: 0 2px 20px 0 rgba(0, 0, 0, 0.08);
  }

  .ant-card .ant-card-body {
    padding: 0 !important;
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

const DetailWrapper = styled.div`
  padding: 16px;

  @media only screen and (min-width: 960px) {
    padding: 24px;
  }

  tr {
    padding: 6px 0;
    height: 36px;
  }

  td {
    border-bottom: 1px solid #e6e6e6;
  }

  td:nth-child(2) {
    text-align: right;
    font-weight: 500;
  }

  tr:last-child td {
    border-bottom: none;
  }
`;

const WeatherImage = styled.img`
  min-width: 64px;
  max-width: 64px;
  min-height: 64px;
  max-height: 64px;

  @media only screen and (min-width: 960px) {
    min-width: 80px;
    max-width: 80px;
    min-height: 80px;
    max-height: 80px;
  }
`;

interface WeatherSummaryProps {
  weather: Weather;
}

const WeatherSummary: React.FC<WeatherSummaryProps> = ({ weather }) => {
  return (
    <WeatherWrapper>
      <Card bordered={false}>
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
          <WeatherImage src={NightRainFullImage} />
        </SummaryWrapper>
        <DetailWrapper>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <tbody>
              <tr>
                <td>Temperature</td>
                <td>{weather?.temperature}°C</td>
              </tr>
              <tr>
                <td>Humidity</td>
                <td>{weather?.humidity}%</td>
              </tr>
              <tr>
                <td>Pressure</td>
                <td>{weather?.pressure} hPa</td>
              </tr>
            </tbody>
          </table>
        </DetailWrapper>
      </Card>
    </WeatherWrapper>
  );
};

export default WeatherSummary;
