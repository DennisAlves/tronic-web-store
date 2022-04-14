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
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  
`
export const CupomWrapper = styled.div`
  text-align: center;
  display: flex;
  flex-direction: column;
  margin-left: 25px;
`