import styled from 'styled-components';

export const LeftSideStyled = styled.div`
  width: 364px;
  margin-right: 24px;
`;

interface LeftSideProps {
  children: React.ReactNode;
}

const LeftSide: React.FC<LeftSideProps> = ({ children }) => {
  return <LeftSideStyled>{children}</LeftSideStyled>;
};

export default LeftSide;
