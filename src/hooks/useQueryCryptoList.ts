import { useQuery } from 'react-query';

export type CryptoCurrencyWallet = {
  blockchain: string;
  blockchainName: string;
  currencyGroup: string;
  decimal_point: number;
  explorer: string;
  listingDate: string;
  logo: string;
  tokenSymbol: string;
  tokenType: string;
};

export type SupportedCryptoCurrencies = {
  color: string;
  currencyGroup: string;
  currencySymbol: string;
  decimal_point: number;
  listingDate: string;
  logo: string;
  name: string;
  wallets: CryptoCurrencyWallet[];
};

const useQueryCryptoList = () => {
  const result = useQuery('crypto-list', async () => {
    const response = await fetch(
      `${process.env.REACT_APP_API_PINTU}/wallet/supportedCurrencies`,
    );
    return response.json();
  });

  return result;
};

export default useQueryCryptoList;
