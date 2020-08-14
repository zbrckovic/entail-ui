import { normalize } from 'polished'
import { sourceCodeProDeclaration } from 'style/global-style/fonts/source-code-pro-declaration'
import { sourceSansProDeclaration } from 'style/global-style/fonts/source-sans-pro-declaration'
import { createGlobalStyle } from 'styled-components'

export const GlobalStyle = createGlobalStyle`
  ${normalize()}
  ${sourceSansProDeclaration}
  ${sourceCodeProDeclaration}

  html {
    height: 100%;
    width: 100%;
    
    font-size: 100%;
  
    & > body {
      font-family: "SourceSansPro", sans-serif;
        
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
  }
`
