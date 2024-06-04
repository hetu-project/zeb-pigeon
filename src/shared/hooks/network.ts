import { useMemo } from 'react';
import useStorage from './useStorage';
import activeNetworkStorage from '../storages/activeNetworkStorage';
import networkStorage, { NetworkConfig } from '../storages/networkStorage';

export const useActiveNetwork = (): NetworkConfig | undefined => {
  const network = useStorage(activeNetworkStorage);

  const allNetworks = useStorage(networkStorage);

  const activeNetwork: NetworkConfig | undefined = useMemo(() => {
    return allNetworks.find(item => {
      return item.name === network;
    });
  }, [allNetworks, network]);

  return activeNetwork;
};

export const useNetworkList = () => {
  const allNetworks = useStorage(networkStorage);
  return allNetworks;
};
