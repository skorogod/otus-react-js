import React, { FC } from 'react';
import type { User } from 'src/interfaces/user.interface';
import { Logo } from '../logo/Logo';
import { Button } from '../button/Button';

import headerCss from './header.module.scss';
import { ThemeToggler } from '../themeToggler/ThemeToggler';
import { useTheme } from '../../hooks/useTheme';

type HeaderProps = {
  user?: User;
  backgroundColor?: string;
  onLogin: () => void;
  onLogout: () => void;
  onCreateAccount: () => void;
};

export const Header: FC<HeaderProps> = ({ user, backgroundColor, onLogin, onLogout, onCreateAccount }) => {
  const {theme, toggleTheme} = useTheme()

  return (
    <header 
      style={{ backgroundColor: backgroundColor }} 
      className={`${headerCss.header} ${theme === 'dark' ? headerCss.dark : ''}`}
    >
      <div className={headerCss.content}>
        <div className={headerCss.logo}>
          <Logo />
        </div>
        <div style={{display: 'flex', gap: '0.5rem', alignItems: 'center'}}>
          <ThemeToggler></ThemeToggler>
          <div className={headerCss.userInfo}>
            {user ? (
              <>
                <Button primary={theme !== 'light'}  size="small" onClick={onLogout} label="Log out" />
              </>
            ) : (
              <>
                <Button size="small" onClick={onLogin} label="Log in" />
                <Button primary size="small" onClick={onCreateAccount} label="Sign up" />
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
