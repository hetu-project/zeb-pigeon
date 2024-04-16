import React, { ReactNode, FC } from 'react';
import ReduxProvider from './ReduxProvider';
import LanguageProvider from './LanguageProvider';
import ChatApiProvider from './ChatApiProvider';
interface RootProviderProps {
  children: ReactNode;
}
const RootProvider: FC<RootProviderProps> = ({ children }) => {
  return (
    <LanguageProvider>
      <ReduxProvider>
        <ChatApiProvider>{children}</ChatApiProvider>
      </ReduxProvider>
    </LanguageProvider>
  );
};

export default RootProvider;
