import { MagnifyingGlassIcon } from '@heroicons/react/24/solid';
import { Tabs, TabList, Tab, TabPanel, TabPanels } from '@chakra-ui/react';
import { useState } from 'react';
import clsx from 'clsx';
import AllChatList from './Message/AllChatList';
import ContactsList from './Message/ContactsList';

export default function MessageTab() {
  const [tabIndex, setTabIndex] = useState(0);
  return (
    <div className="flex flex-col px-3 h-full zm-bg-card">
      <div className="px-2 py-6">
        <div className="flex items-center bg-[#543639] bg-opacity-50 rounded-xl px-2 py-1">
          <MagnifyingGlassIcon className="w-5 h-5" />
          <input className=" input input-xs bg-transparent flex-grow" placeholder="Search......" />
        </div>
      </div>
      <div className="flex font-semibold text-xl px-2">{'Message'}</div>
      <div className="flex font-semibold text-xs mx-2 my-4 ">
        <Tabs className="w-full overflow-hidden" variant="soft-rounded" onChange={index => setTabIndex(index)}>
          <TabList className="bg-black w-40 mb-10 rounded-3xl px-2 py-1 flex items-center">
            <Tab>
              <div className={clsx('px-2 py-2', tabIndex === 0 ? ' zm-bg-card rounded-3xl' : '')}>{'All Chats'}</div>
            </Tab>
            <Tab>
              <div className={clsx('px-2 py-2', tabIndex === 1 ? 'zm-bg-card rounded-3xl' : '')}>{'Contacts'}</div>
            </Tab>
          </TabList>
          <TabPanels className=" overflow-hidden">
            <TabPanel>
              <AllChatList />
            </TabPanel>
            <TabPanel>
              <ContactsList />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </div>
    </div>
  );
}
