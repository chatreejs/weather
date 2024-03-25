import { Flex } from 'antd';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import { AQICategory } from '@enums';
import { AirQuality } from '@models';
import { getAQICategoryFromPM25 } from '../../../utils/aqi.util';

const WHOGuidelineWrapper = styled.div`
  margin-top: 32px;
`;

const WHOGuidelineFlex = styled(Flex)`
  @media only screen and (max-width: 768px) {
    flex-direction: column;
  }
`;

const WHOGuidelineContainer = styled.div`
  display: flex;
  justify-content: center;

  .sign {
    height: 72px;
    width: 72px;
    border-radius: 4px 0 0 4px;
    display: flex;
    justify-content: center;
    align-items: center;

    span {
      font-size: 48px;
    }
  }

  .number {
    height: 72px;
    min-width: 85px;
    width: fit-content;
    border-radius: 0 4px 4px 0;
    padding: 0 4px 0 16px;
    display: flex;
    flex-direction: column;
    justify-content: center;

    .number-measurement {
      font-size: 12px;
      font-weight: 500;
      letter-spacing: -0.43px;
      line-height: 18px;
    }

    .number-times {
      font-size: 24px;
      font-weight: 700;
    }
  }

  @media only screen and (max-width: 768px) {
    margin-right: 0;
    margin-bottom: 16px;
  }
`;

const WHOGuidelineText = styled.p`
  margin-right: 58px;
  font-size: 16px;
  line-height: 1.5;
`;

interface WHOGuidelineProps {
  airQuality: AirQuality;
}

const WHOGuideline: React.FC<WHOGuidelineProps> = ({ airQuality }) => {
  const [aqiColor, setAqiColor] = useState<string>('');
  const [times, setTimes] = useState(0);

  useEffect(() => {
    if (airQuality.pm25 > 5) {
      setTimes(airQuality.pm25 / 5);
    }

    const aqiStatus = getAQICategoryFromPM25(airQuality.pm25);
    switch (aqiStatus) {
      case AQICategory.GOOD:
        setAqiColor('green');
        break;
      case AQICategory.MODERATE:
        setAqiColor('yellow');
        break;
      case AQICategory.UNHEALTHY_FOR_SENSITIVE_GROUPS:
        setAqiColor('orange');
        break;
      case AQICategory.UNHEALTHY:
        setAqiColor('red');
        break;
      case AQICategory.VERY_UNHEALTHY:
        setAqiColor('purple');
        break;
      case AQICategory.HAZARDOUS:
        setAqiColor('maroon');
        break;
      default:
        break;
    }
  }, []);

  return (
    <WHOGuidelineWrapper>
      <WHOGuidelineFlex>
        <Flex align="center" style={{ marginRight: '32px' }}>
          <WHOGuidelineContainer>
            <div className={`sign aqi-${aqiColor}`}>
              <span>!</span>
            </div>
            <div className={`number aqi-light-${aqiColor}`}>
              <p className="number-measurement">PM2.5</p>
              <p className="number-times">x{times}</p>
            </div>
          </WHOGuidelineContainer>
        </Flex>
        <WHOGuidelineText>
          <strong>PM2.5 concentration</strong> in {airQuality.location} is
          currently at {times} times the WHO annual air quality guideline value.
        </WHOGuidelineText>
      </WHOGuidelineFlex>
    </WHOGuidelineWrapper>
  );
};

export default WHOGuideline;
