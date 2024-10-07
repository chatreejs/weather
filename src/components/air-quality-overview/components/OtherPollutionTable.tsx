import React from 'react';
import styled from 'styled-components';

import { AQICategory } from '@enums';
import { AirQuality } from '@interfaces';
import {
  getAQICategoryFromCO,
  getAQICategoryFromNO2,
  getAQICategoryFromPM10,
  getAQICategoryFromPM25,
  getAQICategoryFromSO2,
} from '@utils';
import { Progress } from 'antd';

const Table = styled.table`
  border-collapse: collapse;
  width: 100%;

  tr {
    height: 36px;
  }

  th {
    font-size: 12px;
    font-weight: 400;
  }

  td {
    .value {
      font-weight: 500;
    }
  }

  td:first-child {
    text-transform: uppercase;
  }

  th:nth-child(2) {
    text-align: right;
  }

  td:nth-child(2) {
    padding-left: 25px;
    padding-right: 26px;
  }

  td:nth-child(3) {
    text-align: right;

    span.unit {
      color: #67788d;
      font-weight: 400;
      margin-left: 8px;
    }
  }

  th:nth-child(3),
  td:nth-child(3) {
    width: 190px;
  }

  th,
  td {
    border-collapse: collapse;
    text-align: left;
    color: #414141;
    line-height: 1.5;
    padding: 6px;
  }

  th:first-child,
  td:first-child {
    width: 132px;
    padding-left: 12px;
  }

  tbody tr:nth-child(odd) {
    background-color: #f9fafb;
  }

  tbody tr:nth-child(even) {
    background-color: #fff;
  }
`;

const PollutionLevelWrapper = styled.div`
  display: none;
  width: 100%;
  height: 8px;
  border-radius: 4px;
  position: relative;

  @media only screen and (min-width: 960px) {
    display: inline-block;
  }
`;

interface OtherPollutionTableProps {
  airQuality: AirQuality;
}

interface Pollutant {
  name: string;
  value: number;
  maxValue: number;
  unit: string;
  strokeColor: string;
  trailColor: string;
}

const OtherPollutionTable: React.FC<OtherPollutionTableProps> = ({
  airQuality,
}) => {
  const getStrokeColor = (aqiCat: AQICategory) => {
    switch (aqiCat) {
      case AQICategory.GOOD:
        return '#9cd84e';
      case AQICategory.MODERATE:
        return '#facf39';
      case AQICategory.UNHEALTHY_FOR_SENSITIVE_GROUPS:
        return '#f99049';
      case AQICategory.UNHEALTHY:
        return '#f65e5f';
      case AQICategory.VERY_UNHEALTHY:
        return '#a070b6';
      case AQICategory.HAZARDOUS:
        return '#a06a7b';
    }
  };

  const getTrailColor = (aqiCat: AQICategory) => {
    switch (aqiCat) {
      case AQICategory.GOOD:
        return 'rgba(156,216,78,.24)';
      case AQICategory.MODERATE:
        return 'rgba(250,207,57,.24)';
      case AQICategory.UNHEALTHY_FOR_SENSITIVE_GROUPS:
        return 'rgba(249,144,73,.24)';
      case AQICategory.UNHEALTHY:
        return 'rgba(246,94,95,.24)';
      case AQICategory.VERY_UNHEALTHY:
        return 'rgba(160,112,182,.24)';
      case AQICategory.HAZARDOUS:
        return 'rgba(160,106,123,.24)';
    }
  };

  const pollutantList: Pollutant[] = [
    {
      name: 'PM2.5',
      value: airQuality.pm25,
      maxValue: 250,
      unit: 'µg/m³',
      strokeColor: getStrokeColor(getAQICategoryFromPM25(airQuality.pm25)),
      trailColor: getTrailColor(getAQICategoryFromPM25(airQuality.pm25)),
    },
    {
      name: 'PM10',
      value: airQuality.pm10,
      maxValue: 430,
      unit: 'µg/m³',
      strokeColor: getStrokeColor(getAQICategoryFromPM10(airQuality.pm10)),
      trailColor: getTrailColor(getAQICategoryFromPM10(airQuality.pm10)),
    },
    {
      name: 'NO2',
      value: airQuality.no2,
      maxValue: 400,
      unit: 'µg/m³',
      strokeColor: getStrokeColor(getAQICategoryFromNO2(airQuality.no2)),
      trailColor: getTrailColor(getAQICategoryFromNO2(airQuality.no2)),
    },
    {
      name: 'SO2',
      value: airQuality.so2,
      maxValue: 1600,
      unit: 'µg/m³',
      strokeColor: getStrokeColor(getAQICategoryFromSO2(airQuality.so2)),
      trailColor: getTrailColor(getAQICategoryFromSO2(airQuality.so2)),
    },
    {
      name: 'CO',
      value: airQuality.co,
      maxValue: 34,
      unit: 'µg/m³',
      strokeColor: getStrokeColor(getAQICategoryFromCO(airQuality.co)),
      trailColor: getTrailColor(getAQICategoryFromCO(airQuality.co)),
    },
  ];

  return (
    <Table>
      <thead>
        <tr>
          <th colSpan={2}>Pollutants</th>
          <th>Concentration</th>
        </tr>
      </thead>
      <tbody>
        {pollutantList
          .filter((pollutant) => pollutant.value != null)
          .map((pollutant) => (
            <tr key={pollutant.name}>
              <td>{pollutant.name}</td>
              <td>
                <PollutionLevelWrapper>
                  <Progress
                    percent={(pollutant.value / pollutant.maxValue) * 100}
                    showInfo={false}
                    strokeColor={pollutant.strokeColor}
                    trailColor={pollutant.trailColor}
                  />
                </PollutionLevelWrapper>
              </td>
              <td>
                <span className="value">{pollutant.value}</span>
                <span className="unit">{pollutant.unit}</span>
              </td>
            </tr>
          ))}
      </tbody>
    </Table>
  );
};

export default OtherPollutionTable;
