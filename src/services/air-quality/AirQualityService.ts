import { from, map, Observable } from 'rxjs';

import { axiosInstance } from '@config';
import { AirQuality } from '@models';

export class AirQualityService {
  private static apiEndpoint = '/air-quality';

  static getCurrentAirQuality(): Observable<AirQuality> {
    return from(
      axiosInstance.get<AirQuality>(`${this.apiEndpoint}/current`),
    ).pipe(map((response) => response.data));
  }
}
