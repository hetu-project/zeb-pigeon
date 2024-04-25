import { u8aToU8a } from '@polkadot/util';
import { Account } from '../storages/accountStorage';
import { signAsync } from '@noble/ed25519';

export const signChatMessage = async (account: Account, message: string) => {
  return await signAsync(u8aToU8a(message), account.privateKey);
};
