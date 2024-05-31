import axios from 'axios';
import { getGraphByMessageId } from './api';
export const endpoint = 'http://52.221.181.98:8080';
export const rpcFetcher = path => {
  return axios.get(`${endpoint}${path}`);
};

export const rpcMessageFetcher = async (id: string) => {
  const graphData = await getGraphByMessageId(id);

  console.log('getGraphByMessageId', graphData);
  return graphData;
};

export const fetchMessageByMessageId = (id: string) => {
  return axios.get(`${endpoint}/gateway/message/${id}`).then(res => {
    return res.data;
  });
};

export const fetchMergeLogByMessageId = (id: string) => {
  return axios.get(`${endpoint}/gateway/merge_log_by_message_id/${id}`).then(res => {
    return res.data;
  });
};
