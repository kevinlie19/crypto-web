import { FiSearch } from 'react-icons/fi';
import { styled } from 'styled-components';

import { GRAY, LIGHT_GRAY } from '../constants/colors';
import { View } from '../core-ui';

type Props = {
  value: string;
  onChangeValue: (e: string) => void;
};

const Searchbar = ({ value, onChangeValue }: Props) => {
  return (
    <Container>
      <FiSearch size={23} color={GRAY} />
      <Input
        defaultValue={value}
        placeholder="Cari aset di Pintu..."
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          onChangeValue(e.target.value)
        }
      />
    </Container>
  );
};

export default Searchbar;

const Container = styled(View)`
  width: 24rem;
  flex-direction: row;
  align-items: center;
  padding: 0.75rem 1rem;
  border-radius: 0.5rem;
  background-color: ${LIGHT_GRAY};
`;

const Input = styled.input`
  width: 100%;
  border: 0;
  outline: none;
  margin-left: 12px;
  background-color: transparent;
  font-size: 14px;
`;
