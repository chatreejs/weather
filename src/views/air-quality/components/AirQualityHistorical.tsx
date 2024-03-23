import { SectionTitle } from '@components';
import { AirQuality } from '@models';
import { AirQualityService } from '@services';
import { Card } from 'antd';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import AirQualityHistoricalChart from './AirQualityHistoricalChart';

const HistoricalWrapper = styled.div`
  width: 100%;

  .ant-card {
    box-shadow: 0 2px 20px 0 rgba(0, 0, 0, 0.08);
  }

  .ant-card .ant-card-body {
    padding: 16px !important;
  }

  .title {
    font-size: 20px;
    font-family: Arial, Helvetica, sans-serif;
    line-height: 1.4;
    color: #414141;
    font-weight: 500;
    letter-spacing: normal;
    margin-bottom: 32px;
    line-height: 1.35;
  }

  @media only screen and (min-width: 960px) {
    .ant-card .ant-card-body {
      padding: 24px !important;
    }
  }
`;

interface AirQualityHistoricalProps {
  location: string;
}

const AirQualityHistorical: React.FC<AirQualityHistoricalProps> = ({
  location,
}) => {
  const [airQuality, setAirQuality] = useState<AirQuality[]>([]);

  useEffect(() => {
    AirQualityService.getAirQualityHistory('d').subscribe({
      next: (airQuality) => {
        setAirQuality(airQuality);
      },
      error: (error) => {
        console.error('Error while fetching air quality data', error);
      },
    });
  }, []);

  return (
    <HistoricalWrapper>
      <Card bordered={false}>
        <SectionTitle title="Historical" />
        <h2 className="title">Historic air quality graph: {location}</h2>
        <AirQualityHistoricalChart
          airQualityList={airQuality}
          pollutionType="pm25"
        />
      </Card>
    </HistoricalWrapper>
  );
};

export default AirQualityHistorical;
