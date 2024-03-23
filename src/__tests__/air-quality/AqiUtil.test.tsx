import { AQICategory } from '@enums';
import { getAQICategory } from '@utils';

describe('Test AQI Utilities', () => {
  it('should return correct AQI category', () => {
    // Test cases
    expect(getAQICategory(0)).toBe(AQICategory.GOOD);
    expect(getAQICategory(51)).toBe(AQICategory.MODERATE);
    expect(getAQICategory(101)).toBe(
      AQICategory.UNHEALTHY_FOR_SENSITIVE_GROUPS,
    );
    expect(getAQICategory(151)).toBe(AQICategory.UNHEALTHY);
    expect(getAQICategory(201)).toBe(AQICategory.VERY_UNHEALTHY);
    expect(getAQICategory(301)).toBe(AQICategory.HAZARDOUS);
    expect(getAQICategory(500)).toBe(AQICategory.HAZARDOUS);
  });
});
