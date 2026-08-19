import React, { createContext, useContext, useState, useEffect } from 'react';
import { ThemeId, LayoutMode, ThemeConfig, themes } from '../theme';

interface ThemeContextType {
  currentTheme: ThemeId;
  theme: ThemeConfig;
  setTheme: (themeId: ThemeId) => void;
  currentLayout: LayoutMode;
  setLayout: (layout: LayoutMode) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const THEME_STORAGE_KEY = 'sharpsensei_theme_v2';
const LAYOUT_STORAGE_KEY = 'sharpsensei_layout_v2';

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentTheme, setCurrentTheme] = useState<ThemeId>(() => {
    const saved = localStorage.getItem(THEME_STORAGE_KEY);
    return (saved && themes[saved as ThemeId]) ? (saved as ThemeId) : 'vs-purple';
  });

  const [currentLayout, setCurrentLayout] = useState<LayoutMode>(() => {
    const saved = localStorage.getItem(LAYOUT_STORAGE_KEY);
    return (saved as LayoutMode) || 'classic';
  });

  const theme = themes[currentTheme] || themes['vs-purple'];

  useEffect(() => {
    localStorage.setItem(THEME_STORAGE_KEY, currentTheme);
    
    // Inject CSS Custom Properties onto root element for seamless styling
    const root = document.documentElement;
    root.style.setProperty('--theme-accent', theme.previewColor);
    root.style.setProperty('--theme-accent-secondary', theme.previewSecondary);
  }, [currentTheme, theme]);

  useEffect(() => {
    localStorage.setItem(LAYOUT_STORAGE_KEY, currentLayout);
  }, [currentLayout]);

  const handleSetTheme = (themeId: ThemeId) => {
    if (themes[themeId]) {
      setCurrentTheme(themeId);
    }
  };

  const handleSetLayout = (layoutId: LayoutMode) => {
    setCurrentLayout(layoutId);
  };

  return (
    <ThemeContext.Provider
      value={{
        currentTheme,
        theme,
        setTheme: handleSetTheme,
        currentLayout,
        setLayout: handleSetLayout
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
