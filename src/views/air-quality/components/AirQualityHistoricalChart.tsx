import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { useEffect, useState } from 'react';

import { AQICategory } from '@enums';
import { AirQuality } from '@models';
import { getAQIBoundary, getAQICategory, getAQICategoryFromPM25 } from '@utils';

interface AirQualityHistoricalChartProps {
  airQualityList: AirQuality[];
  pollutionType: string;
  interval: 'hourly' | 'daily';
}

const AirQualityHistoricalChart: React.FC<AirQualityHistoricalChartProps> = ({
  airQualityList,
  pollutionType,
  interval,
}) => {
  const [chartOptions, setChartOptions] = useState({
    chart: {
      type: 'column',
      plotBackgroundColor: '#F6FAFB',
      style: {
        fontFamily:
          '"Lucida Grande", "Lucida Sans Unicode", Arial, Helvetica, sans-serif',
      },
    },
    title: {
      text: '',
      style: {
        display: 'none',
      },
    },
    xAxis: {
      type: 'datetime',
      gridLineWidth: 1,
      gridLineColor: '#fff',
      lineColor: '#ccd6eb',
      tickColor: '#ccd6eb',
    },
    yAxis: {
      title: {
        enabled: false,
      },
      min: 0,
      tickInterval: 50,
      gridLineWidth: 0,
    },
    plotOptions: {
      column: {
        borderWidth: 0,
      },
    },
    legend: {
      enabled: false,
    },
    credits: {
      enabled: false,
    },
    series: [],
  });

  useEffect(() => {
    if (!airQualityList.length) return;
    // Calculate the maximum value in the data set
    const maxVal = Math.max(
      ...airQualityList.map((data) => {
        if (pollutionType === 'aqi') {
          return data.aqi;
        } else if (pollutionType === 'pm25') {
          return data.pm25;
        } else if (pollutionType === 'pm10') {
          return data.pm10;
        } else if (pollutionType === 'no2') {
          return data.no2;
        } else if (pollutionType === 'so2') {
          return data.so2;
        } else if (pollutionType === 'co') {
          return data.co;
        }
      }),
    );

    // update chart options
    setChartOptions((prevOptions) => ({
      ...prevOptions,
      xAxis: {
        ...prevOptions.xAxis,
        tickInterval:
          interval === 'hourly' ? 1000 * 3600 * 10 : 1000 * 3600 * 24 * 5,
        labels: {
          format:
            interval === 'hourly'
              ? '{value:%d %b, %I:%M %p}'
              : '{value: %a, %d %B}',
        },
      },
      yAxis: {
        ...prevOptions.yAxis,
        max: maxVal > 50 ? null : 50,
      },
      tooltip: {
        formatter: function () {
          if (pollutionType === 'aqi') {
            return `${Highcharts.dateFormat(interval == 'hourly' ? '%d %b, %I:%M %p' : '%a, %d %B', this.x)}<br/>AQI US - ${getAQICategory(this.y)} <b>${this.y}</b>`;
          } else if (pollutionType === 'pm25') {
            return `${Highcharts.dateFormat(interval == 'hourly' ? '%d %b, %I:%M %p' : '%a, %d %B', this.x)}<br/>PM2.5 µg/m³ - ${getAQICategoryFromPM25(this.y)} <b>${this.y}</b>`;
          }
        },
      },
      series: [
        {
          colorByPoint: true,
          animation: {
            duration: 1000,
            // Uses simple function
            easing: 'easeOutBounce',
          },
          data: airQualityList.map((data) => {
            let dataY;
            if (pollutionType === 'aqi') {
              dataY = data.aqi;
            } else if (pollutionType === 'pm25') {
              dataY = data.pm25;
            }
            return {
              y: dataY,
              x:
                interval === 'hourly'
                  ? new Date(data.lastUpdate).getTime() -
                    new Date(data.lastUpdate).getTimezoneOffset() * 60 * 1000
                  : new Date(data.lastUpdate).getTime(),
            };
          }),
          zones: [
            {
              value: getAQIBoundary(AQICategory.GOOD, pollutionType)[1] + 0.1,
              color: {
                linearGradient: { x1: 0, x2: 0, y1: 0, y2: 1 },
                stops: [
                  [0, '#a8e05f'],
                  [1, '#d3efaf'],
                ],
              },
            },
            {
              value:
                getAQIBoundary(AQICategory.MODERATE, pollutionType)[1] + 0.1,
              color: {
                linearGradient: { x1: 0, x2: 0, y1: 0, y2: 1 },
                stops: [
                  [0, '#fdd64b'],
                  [1, '#feeaa5'],
                ],
              },
            },
            {
              value:
                getAQIBoundary(
                  AQICategory.UNHEALTHY_FOR_SENSITIVE_GROUPS,
                  pollutionType,
                )[1] + 0.1,
              color: {
                linearGradient: { x1: 0, x2: 0, y1: 0, y2: 1 },
                stops: [
                  [0, '#ff9b57'],
                  [1, '#ffcdab'],
                ],
              },
            },
            {
              value:
                getAQIBoundary(AQICategory.UNHEALTHY, pollutionType)[1] + 0.1,
              color: {
                linearGradient: { x1: 0, x2: 0, y1: 0, y2: 1 },
                stops: [
                  [0, '#fe6a69'],
                  [1, '#feb4b4'],
                ],
              },
            },
            {
              value:
                getAQIBoundary(AQICategory.VERY_UNHEALTHY, pollutionType)[1] +
                0.1,
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

  useEffect(() => {
    // Clear the chart data
    setChartOptions((prevOptions) => ({
      ...prevOptions,
      series: [],
    }));
  }, [interval]);

  return <HighchartsReact highcharts={Highcharts} options={chartOptions} />;
};

export default AirQualityHistoricalChart;
