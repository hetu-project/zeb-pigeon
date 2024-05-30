import { TicketIcon, ShareIcon, PaperAirplaneIcon, StarIcon, ChartBarSquareIcon } from '@heroicons/react/24/solid';
import clsx from 'clsx';
import { useState, useRef, useEffect, useMemo } from 'react';
import {
  Button,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  SkeletonCircle,
} from '@chakra-ui/react';
// import CausalityGraphsSvg from '@assets/img/chat/CausalityGraphs.svg';
import { useActiveAccount } from '@root/src/shared/hooks/accounts';
import { MessageItem } from '@root/src/shared/storages/messageStorage';
// import MessageGraph from './MessageGraph';
import { useMessageGraph } from '@root/src/shared/hooks/messages';
import useSWR from 'swr';
import NoData from '@root/src/shared/components/NoData';
import { rpcMessageFetcher } from '@root/src/shared/gateway/rpc';
import NodeGraph from './NodeGraph';
export interface MessageCardProps {
  position: 'left' | 'right';
  message: string;
  messageId: string;
}

export function MessageCard({ position = 'left', message, messageId }: MessageCardProps) {
  const [showContextMenu, setShowContextMenu] = useState(false);
  const [showGraphs, setShowGraphs] = useState(false);
  const graph = useMessageGraph(message);
  const { data, isLoading } = useSWR(!graph && showGraphs ? `${messageId}` : null, rpcMessageFetcher);
  const result = useMemo(() => {
    return graph || data;
  }, [data, graph]);
  return (
    <div
      className={clsx('flex items-center rounded-xl relative', {
        'justify-end': position !== 'left',
        'z-10': showContextMenu,
      })}>
      <div
        className={clsx(' mx-2 my-2 px-2 py-2 bg-[#DADCE0] rounded-full', {
          'order-1': position === 'left',
          'order-2': position !== 'left',
        })}>
        <TicketIcon className="w-10 h-10 text-[#9AA0A6]" />
      </div>
      <Menu
        isOpen={showContextMenu}
        onClose={() => {
          setShowContextMenu(false);
        }}
        strategy="fixed"
        isLazy
        placement={'right-end'}>
        <MenuButton
          className={clsx('py-4 overflow-hidden relative zm-bg-card rounded-3xl px-4 ', {
            'order-1': position !== 'left',
            'order-2': position === 'left',
          })}
          onContextMenu={e => {
            e.preventDefault();
            setShowContextMenu(true);
          }}>
          <div className="zm-message-title text-xs max-w-60">{message}</div>
        </MenuButton>
        <MenuList className=" z-10 zm-bg-card p-2 rounded-md flex flex-col">
          <MenuItem className="p-1 hover:bg-[#4F52B2] rounded-sm" icon={<StarIcon className="w-4 h-4" />}>
            <div>{'Save'}</div>
          </MenuItem>
          <MenuItem className="p-1 hover:bg-[#4F52B2] rounded-sm" icon={<PaperAirplaneIcon className="w-4 h-4" />}>
            <div>{'Reply'}</div>
          </MenuItem>
          <MenuItem className="p-1 hover:bg-[#4F52B2] rounded-sm" icon={<ShareIcon className="w-4 h-4" />}>
            <div>{'Share'}</div>
          </MenuItem>
          <MenuDivider className="my-1 mx-1" />
          <MenuItem
            className="p-1 hover:bg-[#4F52B2] rounded-sm"
            icon={<ChartBarSquareIcon className="w-4 h-4" />}
            onClick={() => setShowGraphs(true)}>
            <div>{'View Causality Graphs'}</div>
          </MenuItem>
        </MenuList>
      </Menu>
      <Modal isOpen={showGraphs} onClose={() => setShowGraphs(false)} closeOnOverlayClick isCentered>
        <ModalOverlay backdropFilter="blur(10px) hue-rotate(90deg)" />
        <ModalContent
          className="zm-bg-card p-8"
          // width={738}
          // height={645}
          maxWidth={738}
          containerProps={{
            height: '100vh',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <ModalHeader className="text-white font-bold text-base">{'Causality Graphs'}</ModalHeader>
          <ModalBody className="">
            <div className="flex items-center">
              <div className=" text-white">messageId:</div>
              <div className=" text-white">{messageId}</div>
            </div>
            <div className="flex items-center justify-center">
              {/* <img className="w-[738px] h-[646px] object-contain" src={CausalityGraphsSvg} alt="" /> */}
              {isLoading ? (
                <div className="text-white">
                  <SkeletonCircle startColor="#312F2F" endColor="#605E5C" height={'500px'} width={'500px'} />
                </div>
              ) : (
                <>
                  {/* {result ? <MessageGraph graphData={data} /> : <MessageGraph  graphData={data}/>} */}
                  {result ? <NodeGraph /> : <NodeGraph />}
                </>
              )}
            </div>
          </ModalBody>
          <ModalFooter>
            <div className="flex items-center justify-center gap-4 text-white font-semibold text-sm">
              <button
                className=" border border-[#605E5C] py-1 w-28 items-center justify-center rounded-sm"
                onClick={() => setShowGraphs(false)}>
                Close
              </button>
              <Button
                className="w-28 flex items-center justify-center py-1 bg-[#4F52B2] rounded-sm border border-[#4F52B2]"
                onClick={() => setShowGraphs(false)}>
                {' '}
                I got it
              </Button>
            </div>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
}

export interface MessageListProps {
  list?: MessageItem[];
}

export default function MessageList({ list = [] }: MessageListProps) {
  const activeAccount = useActiveAccount();
  const containerRef = useRef<HTMLDivElement>();
  useEffect(() => {
    if (list.length && containerRef.current) {
      const height = containerRef.current.scrollHeight;
      console.log('scrollHeight', height);
      containerRef.current.scroll({
        top: height,
        // behavior: 'smooth',
      });
    }
  }, [list.length]);
  return (
    <div className={clsx('overflow-scroll max-h-full', list.length > 0 ? '' : 'h-full')} ref={containerRef}>
      {list.length > 0 ? (
        <div className="flex flex-col gap-3 py-4 justify-end">
          {list.map((item, index) => {
            return (
              <MessageCard
                key={index}
                position={activeAccount?.address !== item?.from ? 'left' : 'right'}
                message={item?.message}
                messageId={item?.id}
              />
            );
          })}
        </div>
      ) : (
        <div className=" w-full h-full flex items-center justify-center">
          <NoData />
        </div>
      )}
    </div>
  );
}
