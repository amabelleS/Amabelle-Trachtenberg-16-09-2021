import styled from 'styled-components';

export const Home = styled.div`
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
  flex-direction: row;
  align-items: center;
`;

export const SearchSubmitContainer = styled.div`
  display: flex;
  align-items: center;
  padding: 1rem;
`;

export const SearchContainer = styled.div`
  display: flex;
  flex-direction: column;
  /* padding: 1rem; */
`;

export const Results = styled.div`
  position: absolute;
  background: #000000;
  color: #e7e7e7;
  /* width: 100%; */
  z-index: 22;
  /* top: 6rem; */
  /* right: 6rem; */
  border: 1px solid #e7e7e7;
  /* box-shadow: 0px 2px 3px 0px #e7e7e7; */
  .result {
    padding: 1rem;
    border-bottom: 1px solid #cbcbcb;
    transition: all 0.2s;
    &:hover {
      background: #f0f0f0;
      color: #000000;
      cursor: pointer;
    }
  }
`;

export const CityContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;

  padding: 1rem;
  width: 80%;
  height: 62%;
  border: 1px solid rgb(221, 87, 199);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
  border-radius: 6px;
  background: rgba(240, 228, 237, 0.2);

  &:hover {
    background: rgba(3, 160, 176, 0.5);
    border: 1px solid #08f7fb;
  }
`;

export const CurrentHeader = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin: 1.5rem 0;
  width: 100%;
`;

export const IconButtonWrapper = styled.div`
  display: flex;
  /* flex-direction: column; */
  svg {
    opacity: ${({ isVisible }) => (isVisible ? 1 : 0.5)};
    transition: opacity 0.2s ease-in-out;
  }
`;

export const CityForcast = styled.div`
  display: flex;
`;

export const List = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  gap: 35px;
  /* width: 500px; */
  /* height: calc(100vh - 270px); */
  /* margin-block-start: 30px; */
  overflow: auto;
`;

export const SpinnerWrapper = styled.div`
  display: flex;
  justify-content: center;
`;
