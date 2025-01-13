import { from, map, Observable } from 'rxjs';

import { axiosInstance } from '@config';
import { AirQuality } from '@interfaces';

export class AirQualityService {
  private static readonly apiEndpoint = '/air-quality';

  static getCurrentAirQuality(probeId: string): Observable<AirQuality> {
    return from(
      axiosInstance.get<AirQuality>(`${this.apiEndpoint}/current/${probeId}`),
    ).pipe(map((response) => response.data));
  }

  static getRealtimeAirQuality(probeId: string): Observable<AirQuality> {
    return from(
      axiosInstance.get<AirQuality>(`${this.apiEndpoint}/realtime/${probeId}`),
    ).pipe(map((response) => response.data));
  }

  static getAirQualityHistory(
    probeId: string,
    interval: string,
  ): Observable<AirQuality[]> {
    const params = new URLSearchParams();
    params.append('interval', interval);
    return from(
      axiosInstance.get<AirQuality[]>(
        `${this.apiEndpoint}/history/${probeId}`,
        {
          params,
        },
      ),
    ).pipe(map((response) => response.data));
  }
}
