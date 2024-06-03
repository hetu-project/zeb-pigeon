import axios from 'axios';
import { getGraphByMessageId } from './api';
export const endpoint = 'http://52.221.181.98:8080';
export const rpcFetcher = path => {
  return axios.get(`${endpoint}${path}`);
};

export const rpcMessageFetcher = async (id: string) => {
  const graphData = await getGraphByMessageId(id);
  // console.log('rpcMessageFetcher', graphData);
  const clocks = graphData.message.clock_json_str_list
    .map(item => JSON.parse(item))
    .map(item => ({ nodeId: item.NodeId, clock: JSON.parse(item.Clock) }));
  const mergeLogs = [
    graphData.mergeLog.start_merge_logs_query || [],
    graphData.mergeLog.end_merge_logs_query || [],
  ].flat();
  const result = {
    clocks,
    mergeLogs,
  };

  console.log('rpcMessageFetcher', result);

  const nodes = clocks.map(item => {
    let neighbor_nodes = [];
    const mLog = mergeLogs.find(log => log.node_id === item.nodeId);
    if (mLog) {
      neighbor_nodes = mergeLogs
        .filter(l => l.node_id !== item.nodeId)
        .filter(l => {
          const r =
            mLog.s_clock_hash === l.e_clock_hash ||
            mLog.s_clock_hash === l.s_clock_hash ||
            mLog.e_clock_hash === l.s_clock_hash ||
            mLog.e_clock_hash === l.e_clock_hash;
          return r;
        })
        .map(n => n.node_id);
    }
    return {
      node_id: item.nodeId,
      clock: item.clock,
      neighbor_nodes,
    };
  });

  // console.log('getGraphByMessageId', result);
  // console.log('getGraphByMessageId', nodes);
  return nodes;
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
