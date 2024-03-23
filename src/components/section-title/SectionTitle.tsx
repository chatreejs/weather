import styled from 'styled-components';

const Title = styled.h3`
  font-family: Arial, Helvetica, sans-serif;
  font-size: 12px;
  line-height: 1.5;
  letter-spacing: 0.9px;
  text-transform: uppercase;
  color: #499fbc;
  margin-bottom: 10px;

  @media only screen and (min-width: 960px) {
    margin-bottom: 8px;
  }
`;

interface SectionTitleProps {
  title: string;
}

const SectionTitle: React.FC<SectionTitleProps> = ({ title }) => {
  return <Title>{title}</Title>;
};

export default SectionTitle;
