import React from 'react';
import './App.css';
import { ThemeProvider } from 'src/features/themeProvider/ThemeProvider';
import { ThemeToggler } from 'src/shared/themeToggler/ThemeToggler';

function App() {
  return (
    <>
      <ThemeProvider>
        <div className="App">
          <ThemeToggler></ThemeToggler>
        </div>
      </ThemeProvider>
    </>
  );
}

export default App;
