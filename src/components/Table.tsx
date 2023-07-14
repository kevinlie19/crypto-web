import { BiSolidUpArrow } from 'react-icons/bi';
import { BiSolidDownArrow } from 'react-icons/bi';
import { FiChevronDown } from 'react-icons/fi';
import { RxCaretSort } from 'react-icons/rx';
import { css, styled } from 'styled-components';

import {
  BLACK,
  BORDER,
  GRAY,
  GREEN,
  PURE_BLACK,
  RED,
} from '../constants/colors';
import { FONT_WEIGHT_NORMAL, FONT_WEIGHT_SEMI_BOLD } from '../constants/fonts';
import { useViewportContext } from '../context/ViewportContext';
import { Text, View } from '../core-ui';
import { BREAKPOINTS } from '../helpers/getViewportType';
import {
  numberToCurrency,
  numberToPercentage,
} from '../helpers/numberFormatter';
import { formattedPercentage } from '../helpers/textFormatter';
import { SupportedCryptoCurrencies } from '../hooks/useQueryCryptoList';
import { CryptoCurrencyPrice } from '../hooks/useQueryCryptoPrice';

export type CombinedData = SupportedCryptoCurrencies & {
  price: CryptoCurrencyPrice;
};

type Props = {
  data?: CombinedData[];
};

enum TableDataPreset {
  text = 'text',
  currency = 'currency',
  percentage = 'percentage',
}

type TableColumnContainerProps = {
  flex: number;
};

type TableColumnProps = TableColumnContainerProps & {
  preset: TableDataPreset;
  value: string | number;
};

const TableColumn = ({ flex, preset, value }: TableColumnProps) => {
  const isZeroText = value === 0 || value === '0.00';
  const isRedColoredText = value.toString().includes('-');

  return (
    <TableColumnContainer flex={flex}>
      {preset === TableDataPreset.text ? (
        <>
          <TableText>{value}</TableText>
          <RxCaretSort color={GRAY} size={28} />
        </>
      ) : preset === TableDataPreset.currency ? (
        <Text>
          {numberToCurrency({
            num: Number(value),
          })}
        </Text>
      ) : (
        <>
          {!isZeroText &&
            (isRedColoredText ? (
              <BiSolidDownArrow color={RED} />
            ) : (
              <BiSolidUpArrow color={GREEN} />
            ))}
          <Text color={isZeroText ? BLACK : isRedColoredText ? RED : GREEN}>
            {formattedPercentage(
              numberToPercentage({
                num: Number(value),
              }),
            )}
          </Text>
        </>
      )}
    </TableColumnContainer>
  );
};

const Table = ({ data }: Props) => {
  const { isDesktop } = useViewportContext();
  console.log('combined data dalam table:', data);

  return (
    <Container>
      <Header>
        <TableTextName>CRYPTO</TableTextName>
        {isDesktop ? (
          <>
            <TableTextToken />
            <TableColumn flex={3} preset={TableDataPreset.text} value="HARGA" />
            <TableColumn
              flex={1.5}
              preset={TableDataPreset.text}
              value="24 JAM"
            />
            <TableColumn
              flex={1.5}
              preset={TableDataPreset.text}
              value="1 MGG"
            />
            <TableColumn
              flex={1.5}
              preset={TableDataPreset.text}
              value="1 BLN"
            />
            <TableColumn
              flex={1.5}
              preset={TableDataPreset.text}
              value="1 THN"
            />
          </>
        ) : (
          // For now, cannot change time dropdown value
          <DropdownTimeContainer>
            <DropdownTimeText>24 JAM</DropdownTimeText>
            <FiChevronDown />
          </DropdownTimeContainer>
        )}
      </Header>
      <Body>
        {data?.map((item, index) => (
          <DataContainer key={index}>
            <DataTextNameContainer>
              <LogoImage src={item.logo} />
              <View>
                <DataTextName>{item.name}</DataTextName>
                {!isDesktop && (
                  <TableTextToken>{item.currencySymbol}</TableTextToken>
                )}
              </View>
            </DataTextNameContainer>
            {isDesktop ? (
              <>
                <TableTextToken>{item.currencySymbol}</TableTextToken>
                <TableColumn
                  flex={3}
                  preset={TableDataPreset.currency}
                  value={item?.price?.latestPrice || 0}
                />
                <TableColumn
                  flex={1.5}
                  preset={TableDataPreset.percentage}
                  value={item?.price?.day || 0}
                />
                <TableColumn
                  flex={1.5}
                  preset={TableDataPreset.percentage}
                  value={item?.price?.week || 0}
                />
                <TableColumn
                  flex={1.5}
                  preset={TableDataPreset.percentage}
                  value={item?.price?.month || 0}
                />
                <TableColumn
                  flex={1.5}
                  preset={TableDataPreset.percentage}
                  value={item?.price?.year || 0}
                />
              </>
            ) : (
              <View>
                <TableColumn
                  flex={4}
                  preset={TableDataPreset.currency}
                  value={item?.price?.latestPrice || 0}
                />
                <TableColumn
                  flex={4}
                  preset={TableDataPreset.percentage}
                  value={item?.price?.day || 0}
                />
              </View>
            )}
          </DataContainer>
        ))}
      </Body>
    </Container>
  );
};

export default Table;

const Container = styled(View)`
  flex: 1;
`;

const Header = styled(View)`
  flex-direction: row;
  align-items: center;
  padding: 1.25rem;
  border: 1px solid ${BORDER};
  border-bottom-width: 0px;
  border-top-left-radius: 0.5rem;
  border-top-right-radius: 0.5rem;
  @media (max-width: ${BREAKPOINTS.mobile.width}px) {
    padding: 1rem;
    border: none;
    border-top: 1px solid ${BORDER};
    border-bottom: 1px solid ${BORDER};
    border-top-left-radius: 0px;
    border-top-right-radius: 0px;
  }
`;

const TableText = styled(Text)`
  color: ${GRAY};
  font-weight: ${FONT_WEIGHT_SEMI_BOLD};
`;

const TableTextName = styled(TableText)`
  flex: 4;
  padding-left: 3vw;
  padding-right: 2.2vw;
  @media (max-width: ${BREAKPOINTS.mobile.width}px) {
    color: ${BLACK};
    font-size: 12px;
    padding: 0px;
  }
`;

const TableTextToken = styled(TableText)`
  flex: 2;
  @media (max-width: ${BREAKPOINTS.mobile.width}px) {
    font-size: 14px;
    font-weight: ${FONT_WEIGHT_NORMAL};
  }
`;

const TableColumnContainer = styled(View)<TableColumnContainerProps>`
  flex-direction: row;
  align-items: center;
  gap: 4px;
  ${(props) =>
    props.flex &&
    css`
      flex: ${props.flex};
    `}
  @media (max-width: ${BREAKPOINTS.mobile.width}px) {
    justify-content: flex-end;
  }
`;

const DropdownTimeContainer = styled(View)`
  flex-direction: row;
  align-items: center;
  padding: 0.25rem;
  border: 1px solid ${BORDER};
  border-radius: 0.375rem;
`;

const DropdownTimeText = styled(Text)`
  font-size: 0.75rem;
  font-weight: ${FONT_WEIGHT_SEMI_BOLD};
  margin: 0px 0.3rem;
`;

const Body = styled(View)`
  flex: 1;
`;

const DataContainer = styled(Header)`
  border-top-left-radius: 0px;
  border-top-right-radius: 0px;
  border-top: none;
`;

const DataTextNameContainer = styled(View)`
  flex: 5;
  flex-direction: row;
  align-items: center;
  gap: 20px;
`;

const LogoImage = styled.img`
  width: 32px;
  height: 32px;
`;

const DataTextName = styled(TableTextName)`
  color: ${PURE_BLACK};
  padding-left: 0px;
  padding-right: 0px;
  @media (max-width: ${BREAKPOINTS.mobile.width}px) {
    font-size: 16px;
  }
`;
