import React, { ReactNode, FC } from 'react';
import ReduxProvider from './ReduxProvider';
import LanguageProvider from './LanguageProvider';
interface RootProviderProps {
  children: ReactNode;
}
const RootProvider: FC<RootProviderProps> = ({ children }) => {
  return (
    <LanguageProvider>
      <ReduxProvider>{children}</ReduxProvider>
    </LanguageProvider>
  );
};

export default RootProvider;
