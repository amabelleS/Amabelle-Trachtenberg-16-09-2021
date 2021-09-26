import styled from 'styled-components';

export const Navbar = styled.div`
  position: fixed;
  width: 100%;
  display: flex;
  flex-direction: row;
  flex-grow: 1;
  align-items: center;
  justify-content: space-between;
  background-color: ${(props) => props.theme.body};
  color: ${(props) => props.theme.text};
`;

export const Toggle = styled.button`
  cursor: pointer;
  height: 42px;
  width: 42px;
  border-radius: 50%;
  border: none;
  margin-left: 1rem;
  background-color: ${(props) => props.theme.body};
  color: ${(props) => props.theme.text};

  &:hover {
    background: #018786;
  }
  transition: all 0.5s ease;
`;
