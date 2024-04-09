import { TicketIcon } from '@heroicons/react/24/solid';
export function ContactCard() {
  return (
    <div className="flex items-center bg-black bg-opacity-50 rounded-xl">
      <div className=" mx-2 my-2 px-2 py-2 bg-[#DADCE0] rounded-full">
        <TicketIcon className="w-6 h-6 text-[#9AA0A6]" />
      </div>
      <div className="py-4 pr-4 overflow-hidden">
        <div className="zm-message-title text-xs">{'friend1'}</div>
      </div>
    </div>
  );
}

export default function ContactsList() {
  return (
    <div className="flex flex-col h-full overflow-hidden gap-3">
      <ContactCard />
      <ContactCard />
      <ContactCard />
    </div>
  );
}
