import React, { ReactNode, FC } from 'react';
import { i18n } from '@lingui/core';
import { I18nProvider } from '@lingui/react';
import { messages } from '@src/locales/en';
i18n.load('en', messages);
i18n.activate('en');
interface LanguageProviderProps {
  children: ReactNode;
}
const LanguageProvider: FC<LanguageProviderProps> = ({ children }) => {
  return <I18nProvider i18n={i18n}>{children}</I18nProvider>;
};

export default LanguageProvider;
