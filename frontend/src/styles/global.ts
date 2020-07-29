import { createGlobalStyle } from 'styled-components'
import 'react-toastify/dist/ReactToastify.css'

import { colors } from './variables'

export default createGlobalStyle`
  /*Default*/
  *,
  *::after,
  *::before{
    margin: 0;
    padding: 0;
    outline: 0;
    box-sizing: border-box;
    :focus{
      outline: 0;
    }
  }
  html{
    min-height: 100%;
    scroll-behavior: smooth;  
  }
  body{
    background: #f0f0f5;
    background-repeat: no-repeat;
    background-size: cover;
    -webkit-font-smoothing: antialiased !important;
  }
  body, input, button{
    font-family: 'Roboto', Arial, Helvetica, sans-serif; 
    font-size: 16px;
  }
  button{
    cursor: pointer;
  }
  a{
    text-decoration: none;
    cursor: pointer;
  }
  ul{
    list-style: none;
  }

  /*This project*/
  h1, h2, h3, h4, h5, h6 {
    color: ${colors.title};
    font-family: 'Ubuntu', Arial, Helvetica, sans-serif;
  }
`
