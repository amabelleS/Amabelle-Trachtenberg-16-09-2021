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
`;

export const List = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  flex-wrap: wrap;
  width: 90%;
  overflow: auto;

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
`;

export const SpinnerWrapper = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
`;

export const FavBtn = styled.button`
  padding: 0.5rem 1rem;
  margin-left: 1rem;
  cursor: pointer;
  outline: none;
  border: ${(props) => props.theme.text};
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
  border-radius: 6px;
  transition: all 0.5s linear;
  background-color: ${(props) => props.theme.primary};
  color: ${(props) => props.theme.text};
  display: flex;
  align-items: center;
  transition: all 0.5s ease;
`;
