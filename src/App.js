import React, { Component } from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import { GeolocationProvider } from './context/GeolocationContext';
import WeatherCard from './components/WeatherCard';

const GlobalStyle = createGlobalStyle`
  html {
    box-sizing: border-box;
  }

  *,
  *::before,
  *::after {
    box-sizing: inherit;
  }

  body {
    margin: 0;
    padding: 0;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen",
    "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue",
    sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale; 

    background-color: #f6f6f6;
  }
`;

const AppStyles = styled.div`
  display: flex;
  justify-content: center;
  padding-top: 1rem;
`;

class App extends Component {
  render() {
    return (
      <GeolocationProvider>
        <GlobalStyle />
        <AppStyles>
          <WeatherCard />
        </AppStyles>
      </GeolocationProvider>
    );
  }
}

export default App;
