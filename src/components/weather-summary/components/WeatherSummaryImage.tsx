import React from 'react';
import styled from 'styled-components';

import NightRainFullImage from '../../../assets/images/ic-w-12-night-rain-full.svg';

const ConditionImage = styled.img`
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

const WeatherSummaryImage: React.FC = () => {
  return <ConditionImage src={NightRainFullImage} />;
};

export default WeatherSummaryImage;
