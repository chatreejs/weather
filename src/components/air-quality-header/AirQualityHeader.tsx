import { Tag } from 'antd';
import dayjs from 'dayjs';
import React from 'react';
import styled from 'styled-components';

const Title = styled.h1`
  font-family: Arial, Helvetica, sans-serif;
  font-size: 24px;
  font-weight: 600;
  color: #414141;
  line-height: 1.5;
  margin-bottom: 8px;

  @media only screen and (min-width: 600px) {
    font-size: 42px;
    font-weight: 700;
    line-height: normal;
    margin-bottom: 6px;
  }
`;

const Subtitle = styled.h2`
  font-size: 16px;
  font-weight: 400;
  color: #414141;
  line-height: 1.5;
  margin-bottom: 8px;

  @media only screen and (min-width: 600px) {
    opacity: 0.9;
    font-size: 18px;
    line-height: 1.44;
    font-weight: 400;
    margin-bottom: 9px;
  }
`;

const TimestampWrapper = styled.p`
  color: #516072;
  font-size: 12px;
  height: 22px;
  line-height: 1.5;

  span {
    display: inline-flex;
    line-height: 1.5;
    color: #516072;
    font-weight: 600;
    letter-spacing: 0.5px;
  }
`;

interface AirQualityHeaderProps {
  location: string;
  lastUpdate: string;
  showSecond?: boolean;
  realTime?: boolean;
}

const AirQualityHeader: React.FC<AirQualityHeaderProps> = ({
  location,
  lastUpdate,
  showSecond,
  realTime,
}) => {
  const format = showSecond ? 'HH:mm:ss, MMM D' : 'HH:mm, MMM D';

  return (
    <>
      <Title>Air quality near {location}</Title>
      <Subtitle>
        Air quality index (AQI) and PM2.5 air pollution near {location}
      </Subtitle>
      <TimestampWrapper>
        <span>Last Update at</span>
        <time dateTime={lastUpdate}> {dayjs(lastUpdate).format(format)}</time>
        {realTime && (
          <Tag color="purple" style={{ marginLeft: 6 }}>
            REALTIME DATA
          </Tag>
        )}
      </TimestampWrapper>
    </>
  );
};

export default AirQualityHeader;
