export interface WeatherSensor {
  temperature: number;
  humidity: number;
  pressure: number;
  lastUpdate: string;
  source: string;
  location: string;
}
