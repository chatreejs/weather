import React from 'react';
import styled from 'styled-components';

import { Weather } from '@models';

const TableWrapper = styled.div`
  padding: 16px;

  @media only screen and (min-width: 960px) {
    padding: 24px;
  }

  table {
    width: 100%;
    border-collapse: collapse;
  }

  tr {
    padding: 6px 0;
    height: 36px;
  }

  td {
    border-bottom: 1px solid #e6e6e6;
  }

  td:nth-child(2) {
    text-align: right;
    font-weight: 500;
  }

  tr:last-child td {
    border-bottom: none;
  }
`;

interface WeatherDetailTableProps {
  weather: Weather;
}

const WeatherDetailTable: React.FC<WeatherDetailTableProps> = ({ weather }) => {
  return (
    <TableWrapper>
      <table aria-hidden="true">
        <tbody>
          <tr>
            <td>Temperature</td>
            <td>{weather?.temperature.toFixed(2)}°C</td>
          </tr>
          <tr>
            <td>Humidity</td>
            <td>{weather?.humidity.toFixed(2)}%</td>
          </tr>
          <tr>
            <td>Pressure</td>
            <td>{weather?.pressure.toFixed(2)} hPa</td>
          </tr>
        </tbody>
      </table>
    </TableWrapper>
  );
};

export default WeatherDetailTable;
