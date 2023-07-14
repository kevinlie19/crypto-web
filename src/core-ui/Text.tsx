import { forwardRef } from 'react';
import styled from 'styled-components';

import { BLACK } from '../constants/colors';
import { FONT_FAMILY_INTER, FONT_WEIGHT_NORMAL } from '../constants/fonts';

export type TextProps = ViewProps & {
  color?: string;
  fontSize?: string;
  fontWeight?: string | number;
};

export default forwardRef<HTMLDivElement, TextProps>((props, forwardRef) => {
  let { color, fontSize, fontWeight, ...otherProps } = props;

  return (
    <StyledText
      ref={forwardRef}
      color={color}
      fontSize={fontSize}
      fontWeight={fontWeight}
      {...otherProps}
    />
  );
});

const StyledText = styled.div<TextProps>`
  box-sizing: border-box;
  display: inline;
  margin: 0;
  padding: 0;
  white-space: pre-wrap;
  overflow-wrap: break-word;
  border: 0 solid black;
  border-image: initial;
  color: ${(props) => (props.color ? props.color : BLACK)};
  font-family: ${FONT_FAMILY_INTER}, system-ui, sans-serif;
  font-size: 16px;
  font-weight: ${FONT_WEIGHT_NORMAL};
`;
