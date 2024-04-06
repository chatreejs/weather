import { SectionTitle } from '@components';
import { AirQuality } from '@models';
import { AirQualityService } from '@services';
import { Card, Flex, Radio, RadioChangeEvent } from 'antd';
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

const ChartWrapper = styled.div`
  margin: 20px 0;
  max-height: 400px;
`;

interface AirQualityHistoricalProps {
  location: string;
}

const AirQualityHistorical: React.FC<AirQualityHistoricalProps> = ({
  location,
}) => {
  const [airQuality, setAirQuality] = useState<AirQuality[]>([]);
  const [interval, setInterval] = useState<'hourly' | 'daily'>('hourly');
  const [pollutionType, setPollutionType] = useState('aqi');

  const onIntervalRadioChange = (e: RadioChangeEvent) => {
    setInterval(e.target.value);
  };

  const onPollutionTypeRadioChange = (e: RadioChangeEvent) => {
    setPollutionType(e.target.value);
  };

  useEffect(() => {
    AirQualityService.getAirQualityHistory(interval).subscribe({
      next: (airQuality) => {
        setAirQuality(airQuality);
      },
      error: (error) => {
        console.error('Error while fetching air quality data', error);
      },
    });
  }, [interval]);

  return (
    <HistoricalWrapper>
      <Card bordered={false}>
        <SectionTitle title="Historical" />
        <h2 className="title">Historic air quality graph: {location}</h2>
        <Flex
          justify="center"
          align="center"
          style={{
            padding: '0 24px',
          }}
        >
          <Radio.Group
            size="large"
            buttonStyle="solid"
            value={interval}
            onChange={onIntervalRadioChange}
          >
            <Radio.Button value="hourly">Hourly</Radio.Button>
            <Radio.Button value="daily">Daily</Radio.Button>
          </Radio.Group>
        </Flex>
        <ChartWrapper>
          <AirQualityHistoricalChart
            airQualityList={airQuality}
            pollutionType={pollutionType}
            interval={interval}
          />
        </ChartWrapper>
        <Flex
          justify="center"
          align="center"
          style={{
            padding: '0 24px',
          }}
        >
          <Radio.Group
            size="large"
            buttonStyle="solid"
            value={pollutionType}
            onChange={onPollutionTypeRadioChange}
          >
            <Radio.Button value="aqi">AQI</Radio.Button>
            <Radio.Button value="pm25">PM2.5</Radio.Button>
          </Radio.Group>
        </Flex>
      </Card>
    </HistoricalWrapper>
  );
};

export default AirQualityHistorical;
