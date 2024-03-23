import { useEffect, useState } from 'react';
import styled from 'styled-components';

import { AQICategory } from '@enums';
import { getAQICategory } from '@utils';
import FaceGreenImage from '../../../assets/images/ic-face-green.svg';
import FaceOrangeImage from '../../../assets/images/ic-face-orange.svg';
import FacePurpleImage from '../../../assets/images/ic-face-purple.svg';
import FaceRedImage from '../../../assets/images/ic-face-red.svg';
import FaceYellowImage from '../../../assets/images/ic-face-yellow.svg';

const AQISummary = styled.div<{ background: string; color: string }>`
  display: flex !important;
  justify-content: space-between;
  font-size: 12px;
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
  padding: 32px;
  background: ${({ background }) => background};
  color: ${({ color }) => color};
`;

const AQIValueWrapper = styled.div`
  display: flex;
  flex-direction: column;

  @media only screen and (min-width: 960px) {
    flex-direction: row;
  }
`;

const AQIBox = styled.div<{ background: string }>`
  display: flex;
  width: 113px;
  height: 36px;
  color: #fff;
  border-radius: 4px;
  justify-content: space-between;
  align-items: center;
  padding: 12px;
  margin-right: 24px;
  background: ${({ background }) => background};
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
  const [summaryBackground, setSummaryBackground] = useState<string>('');
  const [summaryColor, setSummaryColor] = useState<string>('');
  const [boxColor, setBoxColor] = useState<string>('');
  const [statusText, setStatusText] = useState<string>('');
  const [image, setImage] = useState<string>('');

  useEffect(() => {
    const aqiStatus = getAQICategory(airQualityIndex);
    setStatusText(aqiStatus);
    switch (aqiStatus) {
      case AQICategory.GOOD:
        setSummaryBackground('#a8e05f');
        setSummaryColor('#607631');
        setBoxColor('#87c13c');
        setImage(FaceGreenImage);
        break;
      case AQICategory.MODERATE:
        setSummaryBackground('#fdd64b');
        setSummaryColor('#8c6c1d');
        setBoxColor('#efbe1d');
        setImage(FaceYellowImage);
        break;
      case AQICategory.UNHEALTHY_FOR_SENSITIVE_GROUPS:
        setSummaryBackground('#ff9b57');
        setSummaryColor('#974a20');
        setBoxColor('#f27e2f');
        setImage(FaceOrangeImage);
        break;
      case AQICategory.UNHEALTHY:
        setSummaryBackground('#fe6a69');
        setSummaryColor('#942431');
        setBoxColor('#e84b50');
        setImage(FaceRedImage);
        break;
      case AQICategory.VERY_UNHEALTHY:
        setSummaryBackground('#a97abc');
        setSummaryColor('#543b63');
        setBoxColor('#8a5d9d');
        setImage(FacePurpleImage);
        break;
      case AQICategory.HAZARDOUS:
        setSummaryBackground('#a97abc');
        setSummaryColor('#543b63');
        setBoxColor('#8a5d9d');
        setImage(FacePurpleImage);
        break;
      default:
        break;
    }
  }, [airQualityIndex]);

  return (
    <AQISummary background={summaryBackground} color={summaryColor}>
      <AQIValueWrapper>
        <AQIBox background={boxColor}>
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
