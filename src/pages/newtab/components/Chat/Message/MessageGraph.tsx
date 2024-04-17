import { useEffect, useState, useRef } from 'react';
import G6 from '@antv/g6';

// const defaultGraph: Graph = {
//   node: [],
//   edge: [],
// };
const data = {
  nodes: [
    {
      id: '0',
      label: '0',
      clock: {
        0: 1,
        1: 2,
      },
    },
    {
      id: '1',
      label: '1',
      clock: {
        0: 1,
        1: 2,
      },
    },
    {
      id: '2',
      label: '2',
      clock: {
        0: 1,
        1: 2,
      },
    },
    {
      id: '3',
      label: '3',
      clock: {
        0: 1,
        1: 2,
      },
    },
    {
      id: '4',
      label: '4',
      clock: {
        0: 1,
        1: 2,
      },
    },
    {
      id: '5',
      label: '5',
      clock: {
        0: 1,
        1: 2,
      },
    },
    {
      id: '6',
      label: '6',
      clock: {
        0: 1,
        1: 2,
      },
    },
    {
      id: '7',
      label: '7',
      clock: {
        0: 1,
        1: 2,
      },
    },
    {
      id: '8',
      label: '8',
      clock: {
        0: 1,
        1: 2,
      },
    },
    {
      id: '9',
      label: '9',
      clock: {
        0: 1,
        1: 2,
      },
    },
    {
      id: '10',
      label: '10',
      clock: {
        0: 1,
        1: 2,
      },
    },
    {
      id: '11',
      label: '11',
      clock: {
        0: 1,
        1: 2,
      },
    },
    {
      id: '12',
      label: '12',
      clock: {
        0: 1,
        1: 2,
      },
    },
    {
      id: '13',
      label: '13',
      clock: {
        0: 1,
        1: 2,
      },
    },
    {
      id: '14',
      label: '14',
      clock: {
        0: 1,
        1: 2,
      },
    },
    {
      id: '15',
      label: '15',
      clock: {
        0: 1,
        1: 2,
      },
    },
    {
      id: '16',
      label: '16',
      clock: {
        0: 1,
        1: 2,
      },
    },
    {
      id: '17',
      label: '17',
      clock: {
        0: 1,
        1: 2,
      },
    },
    {
      id: '18',
      label: '18',
      clock: {
        0: 1,
        1: 2,
      },
    },
    {
      id: '19',
      label: '19',
      clock: {
        0: 1,
        1: 2,
      },
    },
    {
      id: '20',
      label: '20',
      clock: {
        0: 1,
        1: 2,
      },
    },
    {
      id: '21',
      label: '21',
      clock: {
        0: 1,
        1: 2,
      },
    },
    {
      id: '22',
      label: '22',
      clock: {
        0: 1,
        1: 2,
      },
    },
    {
      id: '23',
      label: '23',
      clock: {
        0: 1,
        1: 2,
      },
    },
    {
      id: '24',
      label: '24',
      clock: {
        0: 1,
        1: 2,
      },
    },
    {
      id: '25',
      label: '25',
      clock: {
        0: 1,
        1: 2,
      },
    },
    {
      id: '26',
      label: '26',
      clock: {
        0: 1,
        1: 2,
      },
    },
    {
      id: '27',
      label: '27',
      clock: {
        0: 1,
        1: 2,
      },
    },
    {
      id: '28',
      label: '28',
      clock: {
        0: 1,
        1: 2,
      },
    },
    {
      id: '29',
      label: '29',
      clock: {
        0: 1,
        1: 2,
      },
    },
    {
      id: '30',
      label: '30',
      clock: {
        0: 1,
        1: 2,
      },
    },
    {
      id: '31',
      label: '31',
      clock: {
        0: 1,
        1: 2,
      },
    },
    {
      id: '32',
      label: '32',
      clock: {
        0: 1,
        1: 2,
      },
    },
    {
      id: '33',
      label: '33',
      clock: {
        0: 1,
        1: 2,
      },
    },
  ],
  edges: [
    {
      source: '0',
      target: '1',
    },
    {
      source: '0',
      target: '2',
    },
    {
      source: '0',
      target: '3',
    },
    {
      source: '0',
      target: '4',
    },
    {
      source: '0',
      target: '5',
    },
    {
      source: '0',
      target: '7',
    },
    {
      source: '0',
      target: '8',
    },
    {
      source: '0',
      target: '9',
    },
    {
      source: '0',
      target: '10',
    },
    {
      source: '0',
      target: '11',
    },
    {
      source: '0',
      target: '13',
    },
    {
      source: '0',
      target: '14',
    },
    {
      source: '0',
      target: '15',
    },
    {
      source: '0',
      target: '16',
    },
    {
      source: '2',
      target: '3',
    },
    {
      source: '4',
      target: '5',
    },
    {
      source: '4',
      target: '6',
    },
    {
      source: '5',
      target: '6',
    },
    {
      source: '7',
      target: '13',
    },
    {
      source: '8',
      target: '14',
    },
    {
      source: '9',
      target: '10',
    },
    {
      source: '10',
      target: '22',
    },
    {
      source: '10',
      target: '14',
    },
    {
      source: '10',
      target: '12',
    },
    {
      source: '10',
      target: '24',
    },
    {
      source: '10',
      target: '21',
    },
    {
      source: '10',
      target: '20',
    },
    {
      source: '11',
      target: '24',
    },
    {
      source: '11',
      target: '22',
    },
    {
      source: '11',
      target: '14',
    },
    {
      source: '12',
      target: '13',
    },
    {
      source: '16',
      target: '17',
    },
    {
      source: '16',
      target: '18',
    },
    {
      source: '16',
      target: '21',
    },
    {
      source: '16',
      target: '22',
    },
    {
      source: '17',
      target: '18',
    },
    {
      source: '17',
      target: '20',
    },
    {
      source: '18',
      target: '19',
    },
    {
      source: '19',
      target: '20',
    },
    {
      source: '19',
      target: '33',
    },
    {
      source: '19',
      target: '22',
    },
    {
      source: '19',
      target: '23',
    },
    {
      source: '20',
      target: '21',
    },
    {
      source: '21',
      target: '22',
    },
    {
      source: '22',
      target: '24',
    },
    {
      source: '22',
      target: '25',
    },
    {
      source: '22',
      target: '26',
    },
    {
      source: '22',
      target: '23',
    },
    {
      source: '22',
      target: '28',
    },
    {
      source: '22',
      target: '30',
    },
    {
      source: '22',
      target: '31',
    },
    {
      source: '22',
      target: '32',
    },
    {
      source: '22',
      target: '33',
    },
    {
      source: '23',
      target: '28',
    },
    {
      source: '23',
      target: '27',
    },
    {
      source: '23',
      target: '29',
    },
    {
      source: '23',
      target: '30',
    },
    {
      source: '23',
      target: '31',
    },
    {
      source: '23',
      target: '33',
    },
    {
      source: '32',
      target: '33',
    },
  ],
};
export default function MessageGraph() {
  const graphRef = useRef();
  const [, setGraphInstance] = useState(null);
  useEffect(() => {
    console.log('instance. effect', graphRef.current);
    if (graphRef.current) {
      const instance = new G6.Graph({
        // ...global,
        fitView: true,
        container: graphRef.current,
        width: 500,
        height: 500,
        layout: {
          type: 'circular',
        },
        defaultEdge: {
          style: {
            endArrow: {
              path: 'M 0,0 L 8,4 L 8,-4 Z',
              fill: '#e2e2e2',
            },
          },
        },
        modes: {
          default: [
            {
              type: 'tooltip',
              formatText(model) {
                // console.log('model', model);
                const text = `Node: ${model.id}`;
                const clock = `${JSON.stringify(Array.from(Object.values(model.clock)))}`;
                return `<div class="zm-graph-tooltip">
                <div>${text}</div>
                <div>Clock: ${clock}</div>
                
                </div>`;
              },
              shouldUpdate: () => true,
            },
          ],
        },
      });
      instance.data(data);
      instance.render();
      setGraphInstance(instance);
      return () => {
        if (!instance.destroyed) {
          instance.destroy();
        }
      };
    }
  }, []);
  return (
    <>
      {/* <img className="w-[738px] h-[646px] object-contain" src={CausalityGraphsSvg} alt="" /> */}
      <div className="w-[500px] h-[500px] flex items-center justify-center relative" ref={graphRef}></div>
    </>
  );
}
