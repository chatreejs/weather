import { AQICategory } from '@enums';

export const getAQICategory = (aqi: number): AQICategory => {
  if (aqi >= 0 && aqi <= 50) {
    return AQICategory.GOOD;
  } else if (aqi >= 51 && aqi <= 100) {
    return AQICategory.MODERATE;
  } else if (aqi >= 101 && aqi <= 150) {
    return AQICategory.UNHEALTHY_FOR_SENSITIVE_GROUPS;
  } else if (aqi >= 151 && aqi <= 200) {
    return AQICategory.UNHEALTHY;
  } else if (aqi >= 201 && aqi <= 300) {
    return AQICategory.VERY_UNHEALTHY;
  } else {
    return AQICategory.HAZARDOUS;
  }
};

export const getAQICategoryFromPM25 = (pm25: number): AQICategory => {
  if (pm25 >= 0 && pm25 <= 12) {
    return AQICategory.GOOD;
  } else if (pm25 >= 12.1 && pm25 <= 35.4) {
    return AQICategory.MODERATE;
  } else if (pm25 >= 35.5 && pm25 <= 55.4) {
    return AQICategory.UNHEALTHY_FOR_SENSITIVE_GROUPS;
  } else if (pm25 >= 55.5 && pm25 <= 150.4) {
    return AQICategory.UNHEALTHY;
  } else if (pm25 >= 150.5 && pm25 <= 250.4) {
    return AQICategory.VERY_UNHEALTHY;
  } else {
    return AQICategory.HAZARDOUS;
  }
};

export const getAQICategoryFromPM10 = (pm10: number): AQICategory => {
  if (pm10 >= 0 && pm10 <= 54) {
    return AQICategory.GOOD;
  } else if (pm10 >= 55 && pm10 <= 154) {
    return AQICategory.MODERATE;
  } else if (pm10 >= 155 && pm10 <= 254) {
    return AQICategory.UNHEALTHY_FOR_SENSITIVE_GROUPS;
  } else if (pm10 >= 255 && pm10 <= 354) {
    return AQICategory.UNHEALTHY;
  } else if (pm10 >= 355 && pm10 <= 424) {
    return AQICategory.VERY_UNHEALTHY;
  } else {
    return AQICategory.HAZARDOUS;
  }
};

export const getAQICategoryFromNO2 = (no2: number): AQICategory => {
  if (no2 >= 0 && no2 <= 53) {
    return AQICategory.GOOD;
  } else if (no2 >= 54 && no2 <= 100) {
    return AQICategory.MODERATE;
  } else if (no2 >= 101 && no2 <= 360) {
    return AQICategory.UNHEALTHY_FOR_SENSITIVE_GROUPS;
  } else if (no2 >= 361 && no2 <= 649) {
    return AQICategory.UNHEALTHY;
  } else if (no2 >= 650 && no2 <= 1249) {
    return AQICategory.VERY_UNHEALTHY;
  } else {
    return AQICategory.HAZARDOUS;
  }
};

export const getAQICategoryFromSO2 = (so2: number): AQICategory => {
  if (so2 >= 0 && so2 <= 35) {
    return AQICategory.GOOD;
  } else if (so2 >= 36 && so2 <= 75) {
    return AQICategory.MODERATE;
  } else if (so2 >= 76 && so2 <= 185) {
    return AQICategory.UNHEALTHY_FOR_SENSITIVE_GROUPS;
  } else if (so2 >= 186 && so2 <= 304) {
    return AQICategory.UNHEALTHY;
  } else if (so2 >= 305 && so2 <= 604) {
    return AQICategory.VERY_UNHEALTHY;
  } else {
    return AQICategory.HAZARDOUS;
  }
};

export const getAQICategoryFromCO = (co: number): AQICategory => {
  if (co >= 0 && co <= 4.4) {
    return AQICategory.GOOD;
  } else if (co >= 4.5 && co <= 9.4) {
    return AQICategory.MODERATE;
  } else if (co >= 9.5 && co <= 12.4) {
    return AQICategory.UNHEALTHY_FOR_SENSITIVE_GROUPS;
  } else if (co >= 12.5 && co <= 15.4) {
    return AQICategory.UNHEALTHY;
  } else if (co >= 15.5 && co <= 30.4) {
    return AQICategory.VERY_UNHEALTHY;
  } else {
    return AQICategory.HAZARDOUS;
  }
};
