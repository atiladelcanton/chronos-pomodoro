import React, { useState, useEffect, useCallback } from 'react';
import {
  HistoryIcon,
  HouseIcon,
  MoonIcon,
  SettingsIcon,
  SunIcon,
} from 'lucide-react';
import styles from './style.module.css';

type Theme = 'dark' | 'light';

const THEME_KEY = 'theme';

const themeIcons = {
  dark: <SunIcon />,
  light: <MoonIcon />,
};

export function Menu() {
  const [theme, setTheme] = useState<Theme>(() => {
    return (localStorage.getItem(THEME_KEY) as Theme) || 'dark';
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem(THEME_KEY, theme);
  }, [theme]);

  const toggleTheme = useCallback(
    (event: React.MouseEvent<HTMLAnchorElement>) => {
      event.preventDefault();
      setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));
    },
    [],
  );

  const themeLabel =
    theme === 'dark'
      ? 'Escuro, clique para mudar para o tema claro'
      : 'Claro, clique para mudar para o tema escuro';

  return (
    <nav className={styles.menu}>
      <a
        className={styles.menuLink}
        href='#'
        aria-label='Ir para a página inicial'
        title='Página Inicial'
      >
        <HouseIcon />
      </a>
      <a
        className={styles.menuLink}
        href='#'
        aria-label='Ir para Histórico de atividades'
        title='Histórico'
      >
        <HistoryIcon />
      </a>
      <a
        className={styles.menuLink}
        href='#'
        aria-label='Ir para Configurações'
        title='Configurações'
      >
        <SettingsIcon />
      </a>
      <a
        className={styles.menuLink}
        href='#'
        aria-label={`Está utilizando o tema ${themeLabel}`}
        title={`Está utilizando o tema ${themeLabel}`}
        onClick={toggleTheme}
      >
        {themeIcons[theme]}
      </a>
    </nav>
  );
}
