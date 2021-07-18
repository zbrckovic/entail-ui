import { MainPage } from 'pages/main-page'
import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import { RootWrapper } from 'root-wrapper'

ReactDOM.render(
  <RootWrapper>
    <BrowserRouter>
      <MainPage />
    </BrowserRouter>
  </RootWrapper>,
  document.getElementById('root')
)
