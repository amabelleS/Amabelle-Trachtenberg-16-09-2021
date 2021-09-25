import styled from 'styled-components';
// import {} from '../../assets/';

export const Card = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  border: 1px solid #84ffff;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
  border-radius: 6px;
  height: 180px;
  margin: 8px;
  padding: 1rem;
  background: url('https://cdn.pixabay.com/photo/2021/08/17/14/48/sea-6553205__340.jpg');
  background-position: center;
  background-size: cover;
  color: ${(props) => props.theme.text};
  cursor: pointer;

  &:hover {
    background: ${(props) => props.theme.primary};
    border: 1px solid #08f7fb;
  }

  @media (max-width: 800px) {
    height: 100%;
  }
`;

export const Location = styled.div`
  display: flex;
  align-items: center;
`;

export const ImageTextContainer = styled.div`
  display: flex;
  align-items: center;
`;

export const Humidity = styled.img`
  width: 1.5rem;
  height: 1.5rem;
`;
