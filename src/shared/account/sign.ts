import { Account } from '../storages/accountStorage';
import { signAsync } from '@noble/ed25519';
import { utf8ToBytes } from '@noble/hashes/utils';

export const signChatMessage = async (account: Account, message: string) => {
  return await signAsync(utf8ToBytes(message), account.privateKey);
};
