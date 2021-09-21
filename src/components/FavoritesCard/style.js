import styled from 'styled-components';

export const Card = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  /* gap: 6px; */
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
  border-radius: 6px;
  height: 180px;
  margin: 8px;
`;

export const Images = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  /* width: 50%; */
  /* padding: 1rem; */
`;

export const Temperature = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
