import { getAQICategory } from '@utils';
import React from 'react';
import styled from 'styled-components';

const TableWrapper = styled.div`
  max-width: 100%;
  overflow-x: auto;

  .main-pollution-table {
    width: 100%;
    min-width: 702px;
    box-shadow: inset 0 -2px 0 0 #eef2f6;
    border: 1px solid rgba(0, 0, 0, 0.08);
    border-radius: 4px;
    margin-bottom: 24px;
    border-spacing: 0;
    border-collapse: separate !important;

    tr {
      height: 48px;
    }

    th {
      background-color: #f6f6f6;
    }

    td {
      .unit {
        margin-left: 8px;
      }

      span {
        color: #67788d;
        font-weight: 400;
      }
    }

    th,
    td {
      width: 234px;
      text-align: left;
      padding: 12px;
      font-size: 16px;
      line-height: 1.5;
      font-weight: 500;
      border-collapse: collapse;
    }

    th:nth-child(2),
    td:nth-child(2) {
      border-left: 1px solid #eef2f6;
      border-right: 1px solid #eef2f6;
    }
  }

  @media only screen and (max-width: 960px) {
    .main-pollution-table {
      width: 100%;
    }
  }
`;

interface AirQualityOverviewProps {
  aqi: number;
}

const MainPollutionTable: React.FC<AirQualityOverviewProps> = ({ aqi }) => {
  return (
    <TableWrapper>
      <table className="main-pollution-table">
        <thead>
          <tr>
            <th>Air pollution level</th>
            <th>Air quality index</th>
            <th>Main pollutant</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{getAQICategory(aqi)}</td>
            <td>
              {` ${aqi} `}
              <span className="unit">US AQI</span>
            </td>
            <td>PM2.5</td>
          </tr>
        </tbody>
      </table>
    </TableWrapper>
  );
};

export default MainPollutionTable;
