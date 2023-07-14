import { numberToCurrency, numberToPercentage } from '../numberFormatter';

describe('numberToCurrency test case', () => {
  it('should convert to the exact currency', () => {
    expect(
      numberToCurrency({
        num: 14970,
      }),
    ).toEqual('Rp\xa014.970'); // "\xa0 is Intl.NumberFormat's space for non-breaking space before currency"
  });

  it('should convert to the exact percentage', () => {
    expect(
      numberToPercentage({
        num: 56.85,
      }),
    ).toBe('56.85%');
  });
});
