import { Menu, MenuButton, MenuItem, MenuList } from '@chakra-ui/react';
import { XCircleIcon } from '@heroicons/react/24/solid';
import contactsStorage from '@root/src/shared/storages/contactsStorage';
import clsx from 'clsx';
import { useCallback, ReactNode, useState } from 'react';
export interface ContactMenuContextProps {
  className?: string;
  children?: ReactNode;
  name?: string;
  address?: string;
}
export default function ContactMenuContext({ address, className, children }: ContactMenuContextProps) {
  const handleRemove = useCallback(() => {
    contactsStorage.remove(address);
  }, [address]);
  const [showContextMenu, setShowContextMenu] = useState(false);
  return (
    <Menu
      isOpen={showContextMenu}
      onClose={() => {
        setShowContextMenu(false);
      }}
      strategy="fixed"
      isLazy
      placement={'right'}>
      <MenuButton
        className={clsx(className)}
        onContextMenu={e => {
          e.preventDefault();
          setShowContextMenu(true);
        }}>
        {children}
      </MenuButton>
      <MenuList className="bg-[#543639] p-2 rounded-md flex flex-col">
        {/* <MenuItem className="p-1 hover:bg-[#4F52B2] rounded-sm" icon={<StarIcon className="w-4 h-4" />}>
        <div>{'Save'}</div>
      </MenuItem>
      <MenuItem className="p-1 hover:bg-[#4F52B2] rounded-sm" icon={<PaperAirplaneIcon className="w-4 h-4" />}>
        <div>{'Reply'}</div>
      </MenuItem>
      <MenuItem className="p-1 hover:bg-[#4F52B2] rounded-sm" icon={<ShareIcon className="w-4 h-4" />}>
        <div>{'Share'}</div>
      </MenuItem>
      <MenuDivider className="my-1 mx-1" /> */}
        <MenuItem
          className="p-1 hover:bg-[#4F52B2] rounded-sm cursor-pointer"
          icon={<XCircleIcon className="w-4 h-4" />}
          onClick={handleRemove}>
          <div>{'Delete'}</div>
        </MenuItem>
      </MenuList>
    </Menu>
  );
}
