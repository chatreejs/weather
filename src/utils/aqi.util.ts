import { AQICategory } from '@enums';

export const getAQICategory = (aqi: number): AQICategory => {
  if (
    aqi >= getAQIBoundary(AQICategory.GOOD, 'aqi')[0] &&
    aqi <= getAQIBoundary(AQICategory.GOOD, 'aqi')[1]
  ) {
    return AQICategory.GOOD;
  } else if (
    aqi >= getAQIBoundary(AQICategory.MODERATE, 'aqi')[0] &&
    aqi <= getAQIBoundary(AQICategory.MODERATE, 'aqi')[1]
  ) {
    return AQICategory.MODERATE;
  } else if (
    aqi >=
      getAQIBoundary(AQICategory.UNHEALTHY_FOR_SENSITIVE_GROUPS, 'aqi')[0] &&
    aqi <= getAQIBoundary(AQICategory.UNHEALTHY_FOR_SENSITIVE_GROUPS, 'aqi')[1]
  ) {
    return AQICategory.UNHEALTHY_FOR_SENSITIVE_GROUPS;
  } else if (
    aqi >= getAQIBoundary(AQICategory.UNHEALTHY, 'aqi')[0] &&
    aqi <= getAQIBoundary(AQICategory.UNHEALTHY, 'aqi')[1]
  ) {
    return AQICategory.UNHEALTHY;
  } else if (
    aqi >= getAQIBoundary(AQICategory.VERY_UNHEALTHY, 'aqi')[0] &&
    aqi <= getAQIBoundary(AQICategory.VERY_UNHEALTHY, 'aqi')[1]
  ) {
    return AQICategory.VERY_UNHEALTHY;
  }
  return AQICategory.HAZARDOUS;
};

export const getAQICategoryFromPM25 = (pm25: number): AQICategory => {
  if (
    pm25 >= getAQIBoundary(AQICategory.GOOD, 'pm25')[0] &&
    pm25 <= getAQIBoundary(AQICategory.GOOD, 'pm25')[1]
  ) {
    return AQICategory.GOOD;
  } else if (
    pm25 >= getAQIBoundary(AQICategory.MODERATE, 'pm25')[0] &&
    pm25 <= getAQIBoundary(AQICategory.MODERATE, 'pm25')[1]
  ) {
    return AQICategory.MODERATE;
  } else if (
    pm25 >=
      getAQIBoundary(AQICategory.UNHEALTHY_FOR_SENSITIVE_GROUPS, 'pm25')[0] &&
    pm25 <=
      getAQIBoundary(AQICategory.UNHEALTHY_FOR_SENSITIVE_GROUPS, 'pm25')[1]
  ) {
    return AQICategory.UNHEALTHY_FOR_SENSITIVE_GROUPS;
  } else if (
    pm25 >= getAQIBoundary(AQICategory.UNHEALTHY, 'pm25')[0] &&
    pm25 <= getAQIBoundary(AQICategory.UNHEALTHY, 'pm25')[1]
  ) {
    return AQICategory.UNHEALTHY;
  } else if (
    pm25 >= getAQIBoundary(AQICategory.VERY_UNHEALTHY, 'pm25')[0] &&
    pm25 <= getAQIBoundary(AQICategory.VERY_UNHEALTHY, 'pm25')[1]
  ) {
    return AQICategory.VERY_UNHEALTHY;
  } else {
    return AQICategory.HAZARDOUS;
  }
};

export const getAQICategoryFromPM10 = (pm10: number): AQICategory => {
  if (
    pm10 >= getAQIBoundary(AQICategory.GOOD, 'pm10')[0] &&
    pm10 <= getAQIBoundary(AQICategory.GOOD, 'pm10')[1]
  ) {
    return AQICategory.GOOD;
  } else if (
    pm10 >= getAQIBoundary(AQICategory.MODERATE, 'pm10')[0] &&
    pm10 <= getAQIBoundary(AQICategory.MODERATE, 'pm10')[1]
  ) {
    return AQICategory.MODERATE;
  } else if (
    pm10 >=
      getAQIBoundary(AQICategory.UNHEALTHY_FOR_SENSITIVE_GROUPS, 'pm10')[0] &&
    pm10 <=
      getAQIBoundary(AQICategory.UNHEALTHY_FOR_SENSITIVE_GROUPS, 'pm10')[1]
  ) {
    return AQICategory.UNHEALTHY_FOR_SENSITIVE_GROUPS;
  } else if (
    pm10 >= getAQIBoundary(AQICategory.UNHEALTHY, 'pm10')[0] &&
    pm10 <= getAQIBoundary(AQICategory.UNHEALTHY, 'pm10')[1]
  ) {
    return AQICategory.UNHEALTHY;
  } else if (
    pm10 >= getAQIBoundary(AQICategory.VERY_UNHEALTHY, 'pm10')[0] &&
    pm10 <= getAQIBoundary(AQICategory.VERY_UNHEALTHY, 'pm10')[1]
  ) {
    return AQICategory.VERY_UNHEALTHY;
  }
  return AQICategory.HAZARDOUS;
};

export const getAQICategoryFromNO2 = (no2: number): AQICategory => {
  if (
    no2 >= getAQIBoundary(AQICategory.GOOD, 'no2')[0] &&
    no2 <= getAQIBoundary(AQICategory.GOOD, 'no2')[1]
  ) {
    return AQICategory.GOOD;
  } else if (
    no2 >= getAQIBoundary(AQICategory.MODERATE, 'no2')[0] &&
    no2 <= getAQIBoundary(AQICategory.MODERATE, 'no2')[1]
  ) {
    return AQICategory.MODERATE;
  } else if (
    no2 >=
      getAQIBoundary(AQICategory.UNHEALTHY_FOR_SENSITIVE_GROUPS, 'no2')[0] &&
    no2 <= getAQIBoundary(AQICategory.UNHEALTHY_FOR_SENSITIVE_GROUPS, 'no2')[1]
  ) {
    return AQICategory.UNHEALTHY_FOR_SENSITIVE_GROUPS;
  } else if (
    no2 >= getAQIBoundary(AQICategory.UNHEALTHY, 'no2')[0] &&
    no2 <= getAQIBoundary(AQICategory.UNHEALTHY, 'no2')[1]
  ) {
    return AQICategory.UNHEALTHY;
  } else if (
    no2 >= getAQIBoundary(AQICategory.VERY_UNHEALTHY, 'no2')[0] &&
    no2 <= getAQIBoundary(AQICategory.VERY_UNHEALTHY, 'no2')[1]
  ) {
    return AQICategory.VERY_UNHEALTHY;
  }
  return AQICategory.HAZARDOUS;
};

export const getAQICategoryFromSO2 = (so2: number): AQICategory => {
  if (
    so2 >= getAQIBoundary(AQICategory.GOOD, 'so2')[0] &&
    so2 <= getAQIBoundary(AQICategory.GOOD, 'so2')[1]
  ) {
    return AQICategory.GOOD;
  } else if (
    so2 >= getAQIBoundary(AQICategory.MODERATE, 'so2')[0] &&
    so2 <= getAQIBoundary(AQICategory.MODERATE, 'so2')[1]
  ) {
    return AQICategory.MODERATE;
  } else if (
    so2 >=
      getAQIBoundary(AQICategory.UNHEALTHY_FOR_SENSITIVE_GROUPS, 'so2')[0] &&
    so2 <= getAQIBoundary(AQICategory.UNHEALTHY_FOR_SENSITIVE_GROUPS, 'so2')[1]
  ) {
    return AQICategory.UNHEALTHY_FOR_SENSITIVE_GROUPS;
  } else if (
    so2 >= getAQIBoundary(AQICategory.UNHEALTHY, 'so2')[0] &&
    so2 <= getAQIBoundary(AQICategory.UNHEALTHY, 'so2')[1]
  ) {
    return AQICategory.UNHEALTHY;
  } else if (
    so2 >= getAQIBoundary(AQICategory.VERY_UNHEALTHY, 'so2')[0] &&
    so2 <= getAQIBoundary(AQICategory.VERY_UNHEALTHY, 'so2')[1]
  ) {
    return AQICategory.VERY_UNHEALTHY;
  }
  return AQICategory.HAZARDOUS;
};

export const getAQICategoryFromCO = (co: number): AQICategory => {
  if (
    co >= getAQIBoundary(AQICategory.GOOD, 'co')[0] &&
    co <= getAQIBoundary(AQICategory.GOOD, 'co')[1]
  ) {
    return AQICategory.GOOD;
  } else if (
    co >= getAQIBoundary(AQICategory.MODERATE, 'co')[0] &&
    co <= getAQIBoundary(AQICategory.MODERATE, 'co')[1]
  ) {
    return AQICategory.MODERATE;
  } else if (
    co >= getAQIBoundary(AQICategory.UNHEALTHY_FOR_SENSITIVE_GROUPS, 'co')[0] &&
    co <= getAQIBoundary(AQICategory.UNHEALTHY_FOR_SENSITIVE_GROUPS, 'co')[1]
  ) {
    return AQICategory.UNHEALTHY_FOR_SENSITIVE_GROUPS;
  } else if (
    co >= getAQIBoundary(AQICategory.UNHEALTHY, 'co')[0] &&
    co <= getAQIBoundary(AQICategory.UNHEALTHY, 'co')[1]
  ) {
    return AQICategory.UNHEALTHY;
  } else if (
    co >= getAQIBoundary(AQICategory.VERY_UNHEALTHY, 'co')[0] &&
    co <= getAQIBoundary(AQICategory.VERY_UNHEALTHY, 'co')[1]
  ) {
    return AQICategory.VERY_UNHEALTHY;
  }
  return AQICategory.HAZARDOUS;
};

export const getAQIBoundary = (
  category: AQICategory,
  pollutionType: string,
): number[] => {
  switch (category) {
    case AQICategory.GOOD:
      if (pollutionType === 'aqi') return [0, 50];
      else if (pollutionType === 'pm25') return [0, 12];
      else if (pollutionType === 'pm10') return [0, 54];
      else if (pollutionType === 'no2') return [0, 53];
      else if (pollutionType === 'so2') return [0, 35];
      else if (pollutionType === 'co') return [0, 4.4];
      else throw new Error('Invalid pollution type');
    case AQICategory.MODERATE:
      if (pollutionType === 'aqi') return [51, 100];
      else if (pollutionType === 'pm25') return [12.1, 35.4];
      else if (pollutionType === 'pm10') return [55, 154];
      else if (pollutionType === 'no2') return [54, 100];
      else if (pollutionType === 'so2') return [36, 75];
      else if (pollutionType === 'co') return [4.5, 9.4];
      else throw new Error('Invalid pollution type');
    case AQICategory.UNHEALTHY_FOR_SENSITIVE_GROUPS:
      if (pollutionType === 'aqi') return [101, 150];
      else if (pollutionType === 'pm25') return [35.5, 55.4];
      else if (pollutionType === 'pm10') return [155, 254];
      else if (pollutionType === 'no2') return [101, 360];
      else if (pollutionType === 'so2') return [76, 185];
      else if (pollutionType === 'co') return [9.5, 12.4];
      else throw new Error('Invalid pollution type');
    case AQICategory.UNHEALTHY:
      if (pollutionType === 'aqi') return [151, 200];
      else if (pollutionType === 'pm25') return [55.5, 150.4];
      else if (pollutionType === 'pm10') return [255, 354];
      else if (pollutionType === 'no2') return [361, 649];
      else if (pollutionType === 'so2') return [186, 304];
      else if (pollutionType === 'co') return [12.5, 15.4];
      else throw new Error('Invalid pollution type');
    case AQICategory.VERY_UNHEALTHY:
      if (pollutionType === 'aqi') return [201, 300];
      else if (pollutionType === 'pm25') return [150.5, 250.4];
      else if (pollutionType === 'pm10') return [355, 424];
      else if (pollutionType === 'no2') return [650, 1249];
      else if (pollutionType === 'so2') return [305, 604];
      else if (pollutionType === 'co') return [15.5, 30.4];
      else throw new Error('Invalid pollution type');
    case AQICategory.HAZARDOUS:
      if (pollutionType === 'aqi') return [301, Infinity];
      else if (pollutionType === 'pm25') return [250.5, Infinity];
      else if (pollutionType === 'pm10') return [425, Infinity];
      else if (pollutionType === 'no2') return [1250, Infinity];
      else if (pollutionType === 'so2') return [605, Infinity];
      else if (pollutionType === 'co') return [30.5, Infinity];
      else throw new Error('Invalid pollution type');
    default:
      throw new Error('Invalid AQI category');
  }
};
