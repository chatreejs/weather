import { useEffect, useState } from 'react';
import styled from 'styled-components';

import { AQICategory } from '@enums';
import { getAQICategory } from '@utils';
import FaceGreenImage from '../../assets/images/ic-face-green.svg';
import FaceMaroonImage from '../../assets/images/ic-face-maroon.svg';
import FaceOrangeImage from '../../assets/images/ic-face-orange.svg';
import FacePurpleImage from '../../assets/images/ic-face-purple.svg';
import FaceRedImage from '../../assets/images/ic-face-red.svg';
import FaceYellowImage from '../../assets/images/ic-face-yellow.svg';

const AQISummary = styled.div`
  display: flex !important;
  justify-content: space-between;
  font-size: 12px;
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
  padding: 32px;
`;

const AQIValueWrapper = styled.div`
  display: flex;
  flex-direction: column;

  @media only screen and (min-width: 960px) {
    flex-direction: row;
  }
`;

const AQIBox = styled.div`
  display: flex;
  width: 113px;
  height: 36px;
  color: #fff;
  border-radius: 4px;
  justify-content: space-between;
  align-items: center;
  padding: 12px;
  margin-right: 24px;
  box-sizing: border-box;

  @media only screen and (min-width: 960px) {
    width: 116px;
    height: 116px;
    flex-direction: column;
    align-items: flex-start;
  }
`;

const AQIValueUnit = styled.p`
  line-height: 1.5;
  text-transform: uppercase;
  margin: 0;
`;

const AQIValue = styled.p`
  font-size: 20px;
  line-height: 1.3;
  margin: 0;

  @media only screen and (min-width: 960px) {
    font-size: 34px;
    line-height: 40px;
  }
`;

const AQIStatus = styled.p`
  font-size: 12px;
  line-height: 1.5;
  font-weight: 500;
  margin-top: 12px;
  text-transform: uppercase;
`;

const AQIStatusLabel = styled.span`
  display: none;

  @media only screen and (min-width: 960px) {
    display: block;
  }
`;

const AQIStatusText = styled.span`
  font-size: 24px;
  line-height: 1.33;
  text-transform: capitalize;

  @media only screen and (min-width: 960px) {
    font-size: 34px;
    line-height: 1.18;
  }
`;

const AQIIcon = styled.img`
  width: 64px;
  height: 64px;
  vertical-align: middle;
  border-style: none;

  @media only screen and (min-width: 960px) {
    width: 116px;
    height: 116px;
  }
`;

interface AQIBannerProps {
  airQualityIndex: number;
}

const AQIBanner: React.FC<AQIBannerProps> = ({ airQualityIndex }) => {
  const [aqiColor, setAqiColor] = useState<string>('');
  const [statusText, setStatusText] = useState<string>('');
  const [image, setImage] = useState<string>('');

  useEffect(() => {
    const aqiStatus = getAQICategory(airQualityIndex);
    setStatusText(aqiStatus);
    switch (aqiStatus) {
      case AQICategory.GOOD:
        setAqiColor('green');
        setImage(FaceGreenImage);
        break;
      case AQICategory.MODERATE:
        setAqiColor('yellow');
        setImage(FaceYellowImage);
        break;
      case AQICategory.UNHEALTHY_FOR_SENSITIVE_GROUPS:
        setAqiColor('orange');
        setImage(FaceOrangeImage);
        break;
      case AQICategory.UNHEALTHY:
        setAqiColor('red');
        setImage(FaceRedImage);
        break;
      case AQICategory.VERY_UNHEALTHY:
        setAqiColor('purple');
        setImage(FacePurpleImage);
        break;
      case AQICategory.HAZARDOUS:
        setAqiColor('maroon');
        setImage(FaceMaroonImage);
        break;
      default:
        break;
    }
  }, [airQualityIndex]);

  return (
    <AQISummary className={`aqi-${aqiColor}`}>
      <AQIValueWrapper>
        <AQIBox className={`aqi-box-${aqiColor}`}>
          <AQIValueUnit>US AQI</AQIValueUnit>
          <AQIValue>{airQualityIndex}</AQIValue>
        </AQIBox>
        <AQIStatus>
          <AQIStatusLabel>live AQI index</AQIStatusLabel>
          <AQIStatusText>{statusText}</AQIStatusText>
        </AQIStatus>
      </AQIValueWrapper>
      <AQIIcon src={image} alt="icon"></AQIIcon>
    </AQISummary>
  );
};

export default AQIBanner;
