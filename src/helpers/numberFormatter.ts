type Props = {
  num: number;
  minimumFractionDigits?: number;
  maximumFractionDigits?: number;
};

const numberToCurrency = ({
  num,
  minimumFractionDigits,
  maximumFractionDigits = 0,
}: Props) => {
  let formatter = new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits,
    maximumFractionDigits,
  });

  return formatter.format(num);
};

const numberToPercentage = ({
  num,
  minimumFractionDigits = 2,
  maximumFractionDigits = 2,
}: Props) => {
  let formatter = new Intl.NumberFormat('en-US', {
    style: 'percent',
    minimumFractionDigits,
    maximumFractionDigits,
  });

  return formatter.format(num / 100);
};

export { numberToCurrency, numberToPercentage };
