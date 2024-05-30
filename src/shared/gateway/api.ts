import { fetchMergeLogByMessageId, fetchMessageByMessageId } from './rpc';

export const getGraphByMessageId = async (id: string) => {
  const message = await fetchMessageByMessageId(id);
  const mergeLog = await fetchMergeLogByMessageId(id);
  return { message, mergeLog };
};
