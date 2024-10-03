import { SectionTitle } from '@components';
import { Card, Flex } from 'antd';
import React from 'react';
import styled from 'styled-components';

const ContributorWrapper = styled.div`
  margin-bottom: 16px;

  @media only screen and (min-width: 960px) {
    margin-bottom: 24px;
  }

  .ant-card {
    padding: 24px;
    box-shadow: 0 2px 20px 0 rgba(0, 0, 0, 0.08);
  }

  .ant-card .ant-card-body {
    padding: 0 !important;
  }
`;

const SourceBanner = styled.div`
  h3 {
    font-size: 16px;
    line-height: 26px;
    font-weight: 500;
    color: #414141;
  }
`;

interface ContributorSourceProps {
  contributorName: string;
  profileImageUrl: string;
  contributorType: string;
}

const ContributorSource: React.FC<ContributorSourceProps> = ({
  contributorName,
  profileImageUrl,
  contributorType,
}) => {
  return (
    <ContributorWrapper>
      <Card bordered={false}>
        <SectionTitle title="Air Quality Data Contributors" />
        <SourceBanner>
          <h3>Station operated by</h3>
          <Flex
            gap={12}
            align="center"
            style={{
              margin: '8px 0',
              padding: 12,
              border: '1px solid rgba(0, 0, 0, .08)',
            }}
          >
            <img
              className="image"
              src={profileImageUrl}
              alt="Contributor profile"
              style={{
                width: 36,
                height: 36,
                borderRadius: '50%',
                border: '1px solid rgba(0, 0, 0, .08)',
              }}
            />
            <Flex vertical gap={4}>
              <p style={{ fontSize: 14, color: '#414141', fontWeight: 600 }}>
                {contributorName}
              </p>
              <p style={{ fontSize: 12, color: '#67788d', fontWeight: 500 }}>
                {contributorType}
              </p>
            </Flex>
          </Flex>
        </SourceBanner>
      </Card>
    </ContributorWrapper>
  );
};

export default ContributorSource;
