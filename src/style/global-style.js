import { normalize } from 'polished'
import { createGlobalStyle } from 'styled-components'

export const GlobalStyle = createGlobalStyle`
  ${normalize()}

  html {
    height: 100%;
    width: 100%;
    
    font-size: 100%;
  
    & > body {    
      height: 100%;
      width: 100%;
  
      & > #root {
        height: 100%;
        width: 100%;
      }
  }
  
  * {
    box-sizing: border-box;
  }
}`
