import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { useEffect, useState } from 'react';

import { AirQuality } from '@models';
import { getAQICategory } from '@utils';

interface AirQualityHistoricalChartProps {
  airQualityList: AirQuality[];
  pollutionType: string;
}

const AirQualityHistoricalChart: React.FC<AirQualityHistoricalChartProps> = ({
  airQualityList,
  pollutionType,
}) => {
  const [chartOptions, setChartOptions] = useState({
    chart: {
      type: 'column',
      plotBackgroundColor: '#F6FAFB',
      style: {
        fontFamily:
          '"Lucida Grande", "Lucida Sans Unicode", Arial, Helvetica, sans-serif',
      },
      animation: false,
    },
    title: {
      text: '',
      style: {
        display: 'none',
      },
    },
    xAxis: {
      type: 'datetime',
      labels: {
        format: '{value:%d %b, %I:%M %p}',
      },
      tickInterval: 24 * 3600 * 100,
      gridLineWidth: 1,
      gridLineColor: '#fff',
    },
    yAxis: {
      title: {
        enabled: false,
      },
      gridLineWidth: 0,
    },
    legend: {
      enabled: false,
    },
    credits: {
      enabled: false,
    },
    tooltip: {
      formatter: function () {
        return `${Highcharts.dateFormat('%d %b, %I:%M %p', this.x)}<br/>AQI US - ${getAQICategory(this.y)} <b>${this.y}</b>`;
      },
    },
    series: [],
  });

  useEffect(() => {
    // Calculate the maximum value in the data set
    const maxVal = Math.max(...airQualityList.map((data) => data.aqi));

    // update chart options
    setChartOptions((prevOptions) => ({
      ...prevOptions,
      yAxis: {
        ...prevOptions.yAxis,
        max: maxVal > 50 ? null : 50, // If the maximum value is over 50, set yAxis.max to null
      },
      series: [
        {
          colorByPoint: true,
          animation: false,
          data: airQualityList.map((data) => ({
            y: data.aqi,
            x:
              new Date(data.lastUpdate).getTime() -
              new Date().getTimezoneOffset() * 60 * 1000,
          })),
          zones: [
            {
              value: 50,
              color: {
                linearGradient: { x1: 0, x2: 0, y1: 0, y2: 1 },
                stops: [
                  [0, '#a8e05f'],
                  [1, '#d3efaf'],
                ],
              },
            },
            {
              value: 100,
              color: {
                linearGradient: { x1: 0, x2: 0, y1: 0, y2: 1 },
                stops: [
                  [0, '#fdd64b'],
                  [1, '#feeaa5'],
                ],
              },
            },
            {
              value: 150,
              color: {
                linearGradient: { x1: 0, x2: 0, y1: 0, y2: 1 },
                stops: [
                  [0, '#ff9b57'],
                  [1, '#ffcdab'],
                ],
              },
            },
            {
              value: 200,
              color: {
                linearGradient: { x1: 0, x2: 0, y1: 0, y2: 1 },
                stops: [
                  [0, '#fe6a69'],
                  [1, '#feb4b4'],
                ],
              },
            },
            {
              value: 300,
              color: {
                linearGradient: { x1: 0, x2: 0, y1: 0, y2: 1 },
                stops: [
                  [0, '#a97abc'],
                  [1, '#d4bcdd'],
                ],
              },
            },
            {
              color: {
                linearGradient: { x1: 0, x2: 0, y1: 0, y2: 1 },
                stops: [
                  [0, '#a87383'],
                  [1, '#d3b9c1'],
                ],
              },
            },
          ],
        },
      ],
    }));
  }, [airQualityList, pollutionType]);
  return <HighchartsReact highcharts={Highcharts} options={chartOptions} />;
};

export default AirQualityHistoricalChart;
