import { createContext, useState, useContex, useContext } from "react";

//Step 1: Create the context object
const ThemeContext = createContext();


//Step 2: Build the Provider component
// This wraps the app provides the theme state to all children
export function ThemeProvider({ children }) {
  const [darkMode, setDarkMode] = useState(false);

  function toggleDarkMode() {
    setDarkMode(prev => !prev);
  }

  return (
    <ThemeContext.Provider value={{ darkMode, toggleDarkMode }}>
      {children}
    </ThemeContext.Provider>
  );
}


// Step 3: custom hook to consume the context cleanly
// Components import useTheme instead of useContext(ThemeContext)
export function useTheme() {
  return useContext(ThemeContext);
}
