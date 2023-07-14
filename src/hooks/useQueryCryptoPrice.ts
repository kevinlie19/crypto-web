import { useQuery } from 'react-query';

export type CryptoCurrencyPrice = {
  pair: string;
  latestPrice: string;
  day: string;
  month: string;
  week: string;
  year: string;
};

const useQueryCryptoPrice = () => {
  const result = useQuery('crypto-price', async () => {
    const response = await fetch(
      `${process.env.REACT_APP_API_PINTU}/trade/price-changes`,
    );
    return response.json();
  });

  return result;
};

export default useQueryCryptoPrice;
