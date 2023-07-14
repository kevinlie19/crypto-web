import { formattedPercentage } from '../textFormatter';

describe('textFormatter test case', () => {
  it('should minus string at percentage to be formatted percentage', () => {
    expect(formattedPercentage('-1.09')).toBe('1.09');
  });

  it('should return when there is no minus at the string percentage', () => {
    expect(formattedPercentage('18.50')).toBe('18.50');
  });
});
