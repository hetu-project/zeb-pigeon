import { TicketIcon, ShareIcon, PaperAirplaneIcon, StarIcon, ChartBarSquareIcon } from '@heroicons/react/24/solid';
import clsx from 'clsx';
import { useState } from 'react';
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
} from '@chakra-ui/react';
import CausalityGraphsSvg from '@assets/img/chat/CausalityGraphs.svg';
export interface MessageCardProps {
  position: 'left' | 'right';
}

export function MessageCard({ position }: MessageCardProps) {
  const [showContextMenu, setShowContextMenu] = useState(false);
  const [showGraphs, setShowGraphs] = useState(false);
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
          <div className="zm-message-title text-xs max-w-60">{'friend1'}</div>
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
            <div>
              <img className="w-[738px] h-[646px] object-contain" src={CausalityGraphsSvg} alt="" />
            </div>
          </ModalBody>
          <ModalFooter>
            <div className="flex items-center justify-center gap-4 text-white font-semibold text-sm">
              <Button
                className=" border border-[#605E5C] py-1 w-28 items-center justify-center rounded-sm"
                onClick={() => setShowGraphs(false)}>
                Close
              </Button>
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

export default function MessageList() {
  return (
    <div className="flex flex-col h-full overflow-hidden gap-3 justify-end py-4">
      <MessageCard position="left" />
      <MessageCard position="right" />
      <MessageCard position="left" />
    </div>
  );
}
