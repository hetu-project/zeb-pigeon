import React from 'react';
// import logo from '@assets/img/logo.svg';
import '@pages/newtab/Newtab.css';
import '@pages/newtab/Newtab.scss';
import useStorage from '@src/shared/hooks/useStorage';
import exampleThemeStorage from '@src/shared/storages/exampleThemeStorage';
import withSuspense from '@src/shared/hoc/withSuspense';
import withErrorBoundary from '@src/shared/hoc/withErrorBoundary';

import { RouterProvider } from 'react-router-dom';
import router from './router';
import clsx from 'clsx';
import RootProvider from '@src/shared/provider/RootProvider';

const Newtab = () => {
  const theme = useStorage(exampleThemeStorage);

  return (
    <RootProvider>
      <div
        className={clsx(
          'App w-screen h-screen',
          theme === 'light' ? ' zm-bg-page text-white' : ' zm-bg-page text-white',
        )}>
        <RouterProvider router={router} />
      </div>
    </RootProvider>
  );
};

export default withErrorBoundary(withSuspense(Newtab, <div> Loading ... </div>), <div> Error Occur </div>);
