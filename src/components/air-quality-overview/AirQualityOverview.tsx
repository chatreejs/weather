import { Card } from 'antd';
import { useEffect, useState } from 'react';
import styled from 'styled-components';

import { SectionTitle } from '@components';
import { AirQuality } from '@models';
import AQIBanner from './components/AQIBanner';
import MainPollutionTable from './components/MainPollutionTable';
import OtherPollutionTable from './components/OtherPollutionTable';
import WHOGuideline from './components/WHOGuideline';

const OverviewWrapper = styled.div`
  width: 100%;
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

const OverviewDetails = styled.div`
  padding: 16px;

  @media only screen and (min-width: 960px) {
    padding: 24px;
  }

  .title {
    font-size: 20px;
    font-family: Arial, Helvetica, sans-serif;
    line-height: 1.4;
    color: #414141;
    font-weight: 500;
    letter-spacing: normal;
    margin-bottom: 32px;

    @media only screen and (max-width: 960px) {
      font-size: 17px;
      line-height: 1.53;
      margin-bottom: 16px;
  }
`;

interface AirQualityOverviewProps {
  airQuality: AirQuality;
}

const AirQualityOverview: React.FC<AirQualityOverviewProps> = ({
  airQuality,
}) => {
  const [showWHOGuideline, setShowWHOGuideline] = useState<boolean>(false);

  useEffect(() => {
    if (airQuality.pm25 > 5) {
      setShowWHOGuideline(true);
    } else {
      setShowWHOGuideline(false);
    }
  }, []);

  return (
    <OverviewWrapper>
      <Card bordered={false}>
        <AQIBanner airQualityIndex={airQuality.aqi} />
        <OverviewDetails>
          <SectionTitle title="Overview" />
          <h2 className="title">
            What is the current air quality in {airQuality.location}?
          </h2>
          <MainPollutionTable aqi={airQuality.aqi} />
          <OtherPollutionTable airQuality={airQuality} />
          {showWHOGuideline && <WHOGuideline airQuality={airQuality} />}
          {/* <SectionTitle title="Health Recommendations" /> */}
        </OverviewDetails>
      </Card>
    </OverviewWrapper>
  );
};

export default AirQualityOverview;
