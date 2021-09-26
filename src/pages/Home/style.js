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
  margin-bottom: 1rem;
  @media (max-width: 800px) {
    flex-direction: column;
  }
`;

export const SearchSubmitContainer = styled.div`
  display: flex;
  align-items: center;
  padding: 1rem;
`;

export const Toggle = styled.button`
  cursor: pointer;
  height: 42px;
  width: 42px;
  border-radius: 50%;
  border: none;
  margin-left: 0.5rem;
  background-color: ${(props) => props.theme.body};
  color: ${(props) => props.theme.text};
  &:focus {
    outline: none;
  }
  transition: all 0.5s ease;
`;

export const FavBtn = styled.button`
  padding: 0.5rem 1.5rem;
  border-radius: 1rem;
  cursor: pointer;
  outline: none;
  border: 1px solid ${(props) => props.theme.text};
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
  border-radius: 6px;
  transition: all 0.5s linear;
  background-color: ${(props) => props.theme.primary};
  color: ${(props) => props.theme.text};
  display: flex;
  align-items: center;
  transition: all 0.5s ease;
  background: ${(props) => props.theme.darkLight};
  &:hover {
    background: ${(props) => props.theme.body};
  }
`;

export const InputSearch = styled.input`
  position: relative;
  list-style: none;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
  border-radius: 6px;
  display: flex;
  align-items: center;
  padding: 1rem;
  background-color: ${(props) => props.theme.text};
  color: ${(props) => props.theme.primary};
  &:focus {
    outline: none;
  }
`;

export const FlexColumCenter = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  @media (max-width: 800px) {
    flex-direction: row;
  }
`;
export const FlexColumLeft = styled.div`
  display: flex;
  flex-direction: column;

  @media (max-width: 800px) {
    align-items: center;
  }
`;

export const ImageContainer = styled.img`
  width: 8rem;
  height: 5rem;
`;

export const Humidity = styled.img`
  width: 1.5rem;
  height: 1.5rem;
`;

export const ImageTextContainer = styled.div`
  display: flex;
  align-items: center;
`;

export const Results = styled.div`
  position: absolute;
  background-color: ${(props) => props.theme.text};
  color: ${(props) => props.theme.primary};
  z-index: 22;
  border: 1px solid #e7e7e7;
  .result {
    padding: 1rem;
    border-bottom: 1px solid #cbcbcb;
    transition: all 0.2s;
    &:hover {
      background-color: ${(props) => props.theme.primary};
      color: ${(props) => props.theme.text};
      cursor: pointer;
    }
    &:focus {
      outline: none;
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
  height: 77%;
  border: 1px solid #84ffff;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
  border-radius: 6px;
  background-color: ${(props) => props.theme.darkLight};
  color: ${(props) => props.theme.primary};

  &:hover {
    border: 1px solid #08f7fb;
    color: ${(props) => props.theme.text};
  }

  @media (max-width: 800px) {
    height: 100%;
  }
`;

export const CurrentHeader = styled.div`
  flex-shrink: 2;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin: 1.5rem 0;
  width: 100%;

  @media (max-width: 800px) {
    flex-direction: column;
    align-items: center;
    height: 42vh;
    font-size: 1rem;
  }
`;

export const IconButtonWrapper = styled.div`
  display: flex;
  background-color: ${(props) => props.theme.text};
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
  flex-direction: row;
  justify-content: space-between;
  flex-wrap: wrap;
  width: 100%;

  overflow-y: auto;
  overflow-x: hidden;

  ::-webkit-scrollbar {
    width: 0.42rem;
  }

  ::-webkit-scrollbar-track {
    background: ${(props) => props.theme.secondary};
    -webkit-border-radius: 10px;
    border-radius: 10px;
  }

  ::-webkit-scrollbar-thumb {
    -webkit-border-radius: 10px;
    border-radius: 10px;
    background: ${(props) => props.theme.text};
  }

  @media (max-width: 800px) {
    display: block;
  }
`;

export const SpinnerWrapper = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
`;
