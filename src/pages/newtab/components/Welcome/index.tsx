import useStorage from '@src/shared/hooks/useStorage';
import keystoreStorage from '@src/shared/storages/keystoreStorage';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Welcome() {
  const mainAccount = useStorage(keystoreStorage);
  const navigate = useNavigate();
  useEffect(() => {
    navigate('/chat')
  }, [navigate]);
  return <div className="flex flex-col gap-10">{`Welcome ${mainAccount}`}</div>;
}
