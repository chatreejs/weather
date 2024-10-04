import { from, map, Observable } from 'rxjs';

import { axiosInstance } from '@config';
import { Weather } from '@models';

export class WeatherService {
  private static readonly apiEndpoint = '/weather';

  static getCurrentWeather(): Observable<Weather> {
    return from(axiosInstance.get<Weather>(`${this.apiEndpoint}/current`)).pipe(
      map((response) => response.data),
    );
  }

  static getRealtimeWeather(): Observable<Weather> {
    return from(
      axiosInstance.get<Weather>(`${this.apiEndpoint}/realtime`),
    ).pipe(map((response) => response.data));
  }
}
