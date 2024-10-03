import styled from 'styled-components';

export const RightSideStyled = styled.div`
  flex: 1 0 auto;
  max-width: calc(100% - 388px);
`;

interface RightSideProps {
  children: React.ReactNode;
}

const RightSide: React.FC<RightSideProps> = ({ children }) => {
  return <RightSideStyled>{children}</RightSideStyled>;
};

export default RightSide;
