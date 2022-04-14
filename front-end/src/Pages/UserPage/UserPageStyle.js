import styled, {createGlobalStyle} from "styled-components";

export const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
  }
`

export const CustomHeader = styled.div`
  padding: 5px 15px 5px 10px;
  background-color: rgb(230, 230, 230);
  text-align: left;
`

export const HomeLogo = styled.div`
  cursor: pointer;
  width: 75%;
  margin-left: 5%;
`

export const MainDiv = styled.div`
  background-color: rgb(240,240,240);
  text-align: center;
  min-height: 80vh;
`

export const Footer = styled.div`
  padding: 20px;
  background-color: rgb(230,230,230);
  text-align: center;
`

export const UserPageWrapper = styled.form`
  width: 100%;
  min-height: 80vh;
`;
