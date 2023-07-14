import { useMemo, useState } from 'react';
import { FiChevronDown } from 'react-icons/fi';
import { RxHamburgerMenu } from 'react-icons/rx';
import { styled } from 'styled-components';

import LogoBenderaIndonesia from '../../assets/logo-bendera-indonesia.png';
import PintuImage from '../../assets/pintu-image.png';
import { ScrollingTags, Searchbar, Table } from '../../components';
import { GRAY } from '../../constants/colors';
import { FONT_WEIGHT_BOLD, FONT_WEIGHT_MEDIUM } from '../../constants/fonts';
import { useViewportContext } from '../../context/ViewportContext';
import { Text, View } from '../../core-ui';
import { BREAKPOINTS } from '../../helpers/getViewportType';
import useQueryCryptoList, {
  SupportedCryptoCurrencies,
} from '../../hooks/useQueryCryptoList';
import useQueryCryptoPrice, {
  CryptoCurrencyPrice,
} from '../../hooks/useQueryCryptoPrice';

type CombinedCurrencyData = SupportedCryptoCurrencies & {
  price: CryptoCurrencyPrice;
};

const Home = () => {
  const { isDesktop } = useViewportContext();

  const [searchInput, setSearchInput] = useState('');

  const { isLoading: cryptoListLoading, data: cryptoListData } =
    useQueryCryptoList();
  const { isLoading: cryptoPriceLoading, data: cryptoPriceData } =
    useQueryCryptoPrice();

  let combinedData = useMemo(() => {
    // Combining crypto list data and crypto price data
    if (!cryptoListLoading && !cryptoPriceLoading) {
      const tempCombinedData: CombinedCurrencyData[] =
        cryptoListData.payload.map(
          (listData: SupportedCryptoCurrencies, index: number) => {
            if (index === 0) {
              return { ...listData };
            } else {
              const findData = cryptoPriceData.payload.filter(
                (priceData: CryptoCurrencyPrice) => {
                  let filteredCurrency = priceData.pair.split('/');
                  return (
                    filteredCurrency[0] ===
                    listData.currencySymbol.toLowerCase()
                  );
                },
              );
              return {
                ...listData,
                price: findData[0],
              };
            }
          },
        );

      return tempCombinedData;
    }
  }, [cryptoListData, cryptoPriceData, cryptoListLoading, cryptoPriceLoading]);

  const filteredData = useMemo(() => {
    if (combinedData && searchInput) {
      return combinedData.filter(
        (data) =>
          data.name.toLowerCase().includes(searchInput.toLowerCase()) ||
          data.currencySymbol.toLowerCase().includes(searchInput.toLowerCase()),
      );
    } else {
      return combinedData;
    }
  }, [combinedData, searchInput]);

  const onSearchCurrency = (newSearchInput: string) => {
    // Another approach is using debounce
    setSearchInput(newSearchInput);
  };

  if (cryptoListLoading || cryptoPriceLoading) {
    return <span>Loading...</span>;
  }

  return (
    <View>
      <Header>
        <HeaderImage src={PintuImage} />
        {isDesktop ? (
          <HeaderTextContainer>
            <Text>Fitur</Text>
            <Text>PTU</Text>
            <Text>Edukasi</Text>
            <Text>Ikuti Kami</Text>
            <Text>Blog & News</Text>
            <Text>Karier</Text>
            <RowCenter>
              <CountryLogoImage src={LogoBenderaIndonesia} />
              <CountryText>ID</CountryText>
              <FiChevronDown size={18} />
            </RowCenter>
          </HeaderTextContainer>
        ) : (
          <RxHamburgerMenu size={24} />
        )}
      </Header>
      <Body>
        <TitleContainer>
          <Title>Harga Crypto Dalam Rupiah Hari Ini</Title>
          {isDesktop && (
            // For now, only desktop view can search
            <Searchbar value={searchInput} onChangeValue={onSearchCurrency} />
          )}
        </TitleContainer>
        <ScrollingTags />
        <Table data={filteredData} />
      </Body>
    </View>
  );
};

export default Home;

const RowCenter = styled(View)`
  flex-direction: row;
  align-items: center;
`;

const Header = styled(RowCenter)`
  justify-content: space-between;
  padding: 0px 5.5vw;
`;

const HeaderImage = styled.img`
  width: auto;
  height: 60px;
`;

const HeaderTextContainer = styled(RowCenter)`
  gap: 1.25rem;
  padding: 0px 2.5rem;
`;

const CountryLogoImage = styled.img`
  width: 20px;
  height: 16px;
  border: 1px solid ${GRAY};
  border-radius: 2px;
`;

const CountryText = styled(Text)`
  margin: 0.5rem;
`;

const Body = styled(View)`
  flex: 1;
  padding: 0px 6.25vw;
  @media (max-width: ${BREAKPOINTS.mobile.width}px) {
    padding: 0px;
  }
`;

const TitleContainer = styled(Header)`
  flex: 1;
  padding: 0px;
  margin-bottom: 2rem;
  @media (max-width: ${BREAKPOINTS.mobile.width}px) {
    justify-content: center;
  }
`;

const Title = styled(Text)`
  font-size: 28px;
  font-weight: ${FONT_WEIGHT_MEDIUM};
  @media (max-width: ${BREAKPOINTS.mobile.width}px) {
    font-size: 16px;
    font-weight: ${FONT_WEIGHT_BOLD};
  }
`;
