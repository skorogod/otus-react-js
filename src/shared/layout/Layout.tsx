import React, { FC, ReactElement } from 'react';
import { Header } from '../header/Header';

type LayoutProps = {
  children: ReactElement;
};

export const Layout: FC<LayoutProps> = ({ children }) => {
  return (
    <section>
      <Header
        onCreateAccount={() => {
          console.log('create account');
        }}
        onLogin={() => console.log('login')}
        onLogout={() => console.log('logout')}
      />
      <main>{children}</main>
    </section>
  );
};
