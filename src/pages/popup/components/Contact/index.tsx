import React, { useCallback } from 'react';
import ContactCard from './ContactCard';
import SearchInput from './SearchInput';
import { Button } from '@chakra-ui/react';
import { PlusIcon } from '@heroicons/react/24/solid';
import { saveAs } from 'file-saver';
import contactsStorage from '@root/src/shared/storages/contactsStorage';
import { useAllContacts } from '@root/src/shared/hooks/contacts';

export default function Contact() {
  const handleExportContacts = useCallback(async () => {
    const contactJsonFile = await contactsStorage.exportContacts();
    const blob = new Blob([JSON.stringify(contactJsonFile)], { type: 'application/json; charset=utf-8' });
    saveAs(blob, `z_message_contact_${Date.now()}.json`);
  }, []);

  const contactsList = useAllContacts();
  return (
    <div className="flex flex-col h-full">
      <div className="mt-2 mb-6">
        <SearchInput />
      </div>
      <div className="flex flex-col gap-2 overflow-y-scroll flex-grow">
        {contactsList.map(contact => {
          return <ContactCard key={contact.address} name={contact.name} address={contact.address} />;
        })}
      </div>
      <div>
        <div>
          <Button
            className=" zm-bg-card rounded-3xl font-medium px-6 py-3 w-full my-2"
            leftIcon={<PlusIcon className="h-4 w-4" />}
            onClick={handleExportContacts}>
            Export Contacts
          </Button>
        </div>
      </div>
    </div>
  );
}
