import useStorage from '@src/shared/hooks/useStorage';
import keystoreStorage from '@src/shared/storages/keystoreStorage';
import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function Welcome() {
  const mainAccount = useStorage(keystoreStorage);
  const navigate = useNavigate();
  useEffect(() => {
    if (mainAccount) {
      navigate('/home/message');
    } else {
      navigate('/guide');
    }
  }, [mainAccount, navigate]);
  return (
    <div className="flex flex-col gap-10">
      <Link to={'/guide'}>Guide</Link>
      <Link to={'/home/message'}>Message</Link>
      <Link to={'/home/contact'}>Contacts</Link>
      <Link to={'/home/dapps'}>Dapps</Link>
      <Link to={'/home/Account'}>Account</Link>
    </div>
  );
}
