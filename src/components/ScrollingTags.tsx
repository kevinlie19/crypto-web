import { styled } from 'styled-components';

import { BLUE, LIGHT_BLUE } from '../constants/colors';
import { FONT_WEIGHT_SEMI_BOLD } from '../constants/fonts';
import { Text, View } from '../core-ui';
import { BREAKPOINTS } from '../helpers/getViewportType';

const MOCK_TAGS = [
  'Terbaru',
  'DeFi',
  'NFT/Gaming',
  'CEX',
  'DEX',
  'Layer-1',
  'Infrastructure',
  'Lending',
  'Layer-2',
  'Ekosistem Stable Coin',
];

const ScrollingTags = () => {
  return (
    <Container>
      {MOCK_TAGS.map((tag) => (
        <TagContainer>
          {/* For now, cannot show the logos, because cannot get the exact logos */}
          <TagText>{tag}</TagText>
        </TagContainer>
      ))}
    </Container>
  );
};

export default ScrollingTags;

const Container = styled(View)`
  flex: 1;
  flex-direction: row;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
  overflow-x: auto;
  overflow-y: hidden;
  @media (max-width: ${BREAKPOINTS.mobile.width}px) {
    margin: 0px 1rem 1rem;
  }
`;

const TagContainer = styled(View)`
  flex-direction: row;
  align-items: center;
  padding: 0.5rem;
  border-radius: 0.5rem;
  background-color: ${LIGHT_BLUE};
`;

const TagText = styled(Text)`
  color: ${BLUE};
  font-size: 12px;
  font-weight: ${FONT_WEIGHT_SEMI_BOLD};
`;
