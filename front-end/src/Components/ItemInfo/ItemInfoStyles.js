import styled, {createGlobalStyle} from "styled-components";

export const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
  }
`

export const MainInfos = styled.div`
  display: flex;
  margin-top: 10px;
`
export const MainImageInfos = styled.div`
  margin-left: 15px;
`
export const MainTextInfos = styled.div`
  width: 250px;
  margin-left: 15px;
`
export const TextInfos = styled.div`
  display: flex;
`
export const StatusInfo = styled.div`
  display: flex;
  flex-direction:column;
  justify-content: space-evenly;
  margin-left: 15px;
`
export const StatusTexInfo = styled.div`
  display: flex;
  flex-direction:column;
`