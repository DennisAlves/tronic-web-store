import styled, {createGlobalStyle} from "styled-components";

export const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
  }
`
export const MainDiv = styled.div`
  background-color: rgb(240, 240, 240);
  text-align: center;
  min-height: 100vh;
`
export const CustomHeader = styled.div`
    padding: 5px 15px 5px 10px;
    background-color: rgb(230,230,230);
    text-align: left;
    display: flex;
`
export const HeaderLinks = styled.div`
    margin-left: 3px;
    width: 25%;
    display: flex;
    justify-content: center;
   
`
export const HomeLogoWraper = styled.div`
  width: 75%;
  margin-left: 5%;
`
export const HomeLogo = styled.div`
  cursor: pointer;
  width: 20%;
`