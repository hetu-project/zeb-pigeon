import axios from 'axios';
import { getGraphByMessageId } from './api';
export const endpoint = 'http://52.221.181.98:8080';
export const rpcFetcher = path => {
  return axios.get(`${endpoint}${path}`);
};

export const rpcMessageFetcher = (id: string) => {
  getGraphByMessageId(id);
  return axios.get(`${endpoint}/gateway/overview`).then(res => {
    const data = res.data.nodes || [];
    const nodes = data.map(item => {
      return {
        id: item.node_id,
        label: item.node_id.substr(0, 6),
        clock: {
          0: 1,
          1: 2,
        },
      };
    });
    const edges = data
      .map(item => {
        return item.neighbor_nodes.map(nb => ({
          source: item.node_id,
          target: nb,
        }));
      })
      .flat();
    const graph = {
      nodes,
      edges,
    };
    return graph;
  });
};

export const fetchMessageByMessageId = (id: string) => {
  return axios.get(`${endpoint}/gateway/message/${id}`).then(res => {
    const data = res.data.nodes || [];
    const nodes = data.map(item => {
      return {
        id: item.node_id,
        label: item.node_id.substr(0, 6),
        clock: {
          0: 1,
          1: 2,
        },
      };
    });
    const edges = data
      .map(item => {
        return item.neighbor_nodes.map(nb => ({
          source: item.node_id,
          target: nb,
        }));
      })
      .flat();
    const graph = {
      nodes,
      edges,
    };
    return graph;
  });
};

export const fetchMergeLogByMessageId = (id: string) => {
  return axios.get(`${endpoint}/gateway/merge_log_by_message_id/${id}`).then(res => {
    const data = res.data.nodes || [];
    const nodes = data.map(item => {
      return {
        id: item.node_id,
        label: item.node_id.substr(0, 6),
        clock: {
          0: 1,
          1: 2,
        },
      };
    });
    const edges = data
      .map(item => {
        return item.neighbor_nodes.map(nb => ({
          source: item.node_id,
          target: nb,
        }));
      })
      .flat();
    const graph = {
      nodes,
      edges,
    };
    return graph;
  });
};
