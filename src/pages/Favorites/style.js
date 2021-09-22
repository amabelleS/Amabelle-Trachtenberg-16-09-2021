import styled from 'styled-components';

export const Favorites = styled.div`
  display: flex;
  height: 100vh;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100%;
  padding-block-start: 100px;
`;

export const Header = styled.div`
  display: flex;
  /* justify-content: center; */
  /* align-items: baseline; */
`;

export const List = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  flex-wrap: wrap;
  width: 100%;
  overflow: auto;

  ::-webkit-scrollbar {
    width: 0.42rem;
  }

  ::-webkit-scrollbar-track {
    background-color: #84ffff;
    -webkit-border-radius: 10px;
    border-radius: 10px;
  }

  ::-webkit-scrollbar-thumb {
    -webkit-border-radius: 10px;
    border-radius: 10px;
    background: #000000;
  }

  @media (max-width: 800px) {
    display: block;
    /* flex-direction: column; */
  }
`;

export const SpinnerWrapper = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
`;
