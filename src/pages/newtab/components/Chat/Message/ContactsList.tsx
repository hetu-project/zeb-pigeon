import { TicketIcon, XCircleIcon } from '@heroicons/react/24/solid';
import { useAllContacts } from '@root/src/shared/hooks/contacts';
import contactsStorage from '@root/src/shared/storages/contactsStorage';
import { useCallback } from 'react';

export interface ContactCardProps {
  name?: string;
  address?: string;
}
export function ContactCard({ name, address }: ContactCardProps) {
  const handleRemove = useCallback(() => {
    contactsStorage.remove(address);
  }, [address]);
  return (
    <div className="flex items-center justify-between bg-black bg-opacity-50 rounded-xl">
      <div className="flex-grow flex items-center">
        <div className=" mx-2 my-2 px-2 py-2 bg-[#DADCE0] rounded-full">
          <TicketIcon className="w-6 h-6 text-[#9AA0A6]" />
        </div>
        <div className="py-4 pr-4 overflow-hidden flex items-center justify-between">
          <div className="zm-message-title text-xs">{name}</div>
        </div>
      </div>
      <div className="px-3">
        <XCircleIcon className="w-5 h-5 text-[#9AA0A6] cursor-pointer" onClick={handleRemove} />
      </div>
    </div>
  );
}

export default function ContactsList() {
  const contactsList = useAllContacts();
  return (
    <div className="flex flex-col h-full overflow-hidden gap-3">
      {contactsList.map(contact => {
        return <ContactCard key={contact.address} name={contact.name} address={contact.address} />;
      })}
    </div>
  );
}
