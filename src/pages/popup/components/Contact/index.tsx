import React from 'react';
import ContactCard from './ContactCard';
import SearchInput from './SearchInput';

export default function Contact() {
  return (
    <div className="my-2">
      <div className="mt-2 mb-6">
        <SearchInput />
      </div>
      <div className="flex flex-col gap-2 overflow-y-scroll">
        <ContactCard />
        <ContactCard />
        <ContactCard />
      </div>
    </div>
  );
}
