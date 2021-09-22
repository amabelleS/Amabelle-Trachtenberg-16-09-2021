import styled from 'styled-components';

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
  /* background: rgba(240, 228, 237, 0.2); */
  background-image: url('https://cdn.pixabay.com/photo/2016/08/07/17/12/angel-1576656_960_720.jpg');
  background-position: center;
  background-size: cover;

  color: #84ffff;
  cursor: pointer;

  &:hover {
    background: rgba(240, 228, 237, 0.2);
    /* background: rgba(3, 160, 176, 0.5); */
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
