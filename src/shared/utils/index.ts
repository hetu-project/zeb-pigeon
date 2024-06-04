import { bytesToHex, hexToBytes, utf8ToBytes } from '@noble/hashes/utils';

export const hexToU8a = hexToBytes;
export const stringToU8a = utf8ToBytes;
export const u8aToHex = bytesToHex;

const decoder = new TextDecoder('utf-8');

export function u8aToString(value?: Uint8Array | null): string {
  return value ? decoder.decode(value) : '';
}
