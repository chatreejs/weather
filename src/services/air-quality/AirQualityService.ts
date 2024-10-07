import { from, map, Observable } from 'rxjs';

import { axiosInstance } from '@config';
import { AirQuality } from '@interfaces';

export class AirQualityService {
  private static readonly apiEndpoint = '/air-quality';

  static getCurrentAirQuality(): Observable<AirQuality> {
    return from(
      axiosInstance.get<AirQuality>(`${this.apiEndpoint}/current`),
    ).pipe(map((response) => response.data));
  }

  static getRealtimeAirQuality(): Observable<AirQuality> {
    return from(
      axiosInstance.get<AirQuality>(`${this.apiEndpoint}/realtime`),
    ).pipe(map((response) => response.data));
  }

  static getAirQualityHistory(interval: string): Observable<AirQuality[]> {
    const params = new URLSearchParams();
    params.append('interval', interval);
    return from(
      axiosInstance.get<AirQuality[]>(`${this.apiEndpoint}/history`, {
        params,
      }),
    ).pipe(map((response) => response.data));
  }
}
