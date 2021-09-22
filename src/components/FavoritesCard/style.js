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
  /* background: rgba(240, 228, 237, 0.2); */
  /* background: url('https://cdn.pixabay.com/photo/2015/10/12/14/59/milky-way-984050__340.jpg'); */
  /* background: url('https://cdn.pixabay.com/photo/2015/07/02/10/13/sky-828648__340.jpg'); */
  background: url('https://cdn.pixabay.com/photo/2021/08/17/14/48/sea-6553205__340.jpg');
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
