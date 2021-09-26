import styled from 'styled-components';

export const Card = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  border: 1px solid ${(props) => props.theme.text};
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
  border-radius: 6px;
  height: 180px;
  margin: 8px;
  background: url('https://cdn.pixabay.com/photo/2021/08/17/14/48/sea-6553205__340.jpg');

  &:hover {
    background: ${(props) => props.theme.darkLight};
  }
`;

export const Images = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
`;

export const Temperature = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
