import React, { ReactNode, FC } from 'react';
import ReduxProvider from './ReduxProvider';
import LanguageProvider from './LanguageProvider';
import ChatApiProvider from './ChatApiProvider';
import { ChakraBaseProvider, extendBaseTheme, theme } from '@chakra-ui/react';

const extendTheme = extendBaseTheme({
  components: {
    Alert: theme.components.Alert,
  },
});

interface RootProviderProps {
  children: ReactNode;
}
const RootProvider: FC<RootProviderProps> = ({ children }) => {
  return (
    <LanguageProvider>
      <ReduxProvider>
        <ChakraBaseProvider theme={extendTheme}>
          <ChatApiProvider>{children}</ChatApiProvider>
        </ChakraBaseProvider>
      </ReduxProvider>
    </LanguageProvider>
  );
};

export default RootProvider;
