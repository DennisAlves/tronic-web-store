import styled from "styled-components";
import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  body{
    margin: 0;
  }
`
export const MainDiv = styled.div`
  background-color: rgb(240, 240, 240);
  height: 100%;
  width: 100%;
  margin-bottom: 30px ;
`
export const FornecedorWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  
`
export const FornecedorFieldsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin: 15px;
  gap: 10px;
`
