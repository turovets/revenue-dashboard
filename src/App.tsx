import React, { ReactNode } from 'react';
import { MuiThemeProvider, StylesProvider, jssPreset } from '@material-ui/core/styles';
import { create } from 'jss';

import { theme } from './styles/theme';
import './App.css';

const insertionPoint = document.getElementById('jss-insertion-point') as HTMLElement;

const jss = create({
  ...jssPreset(),
  insertionPoint,
})

type Props = {
  children: ReactNode
};

const App = ({ children }: Props) => {
  return (
    <StylesProvider jss={jss}>
      <MuiThemeProvider theme={theme}>
        <div className="App">
          <div className="container">
            {children}
          </div>
        </div>
      </MuiThemeProvider>
    </StylesProvider>
  );
}

export default App;
