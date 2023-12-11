import React, { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';
import { ContactList } from './ContactList/ContactList';
import { ContactForm } from './ContactForm/ContactForm';
import { FilterContact } from './FilterContact/FilterContact';

const contactsSave = [
  { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
  { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
  { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
  { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
];

const LOCALSTORAGE = 'contacts';

const getInitialContacts = () => {
  const savedContact = window.localStorage.getItem(LOCALSTORAGE);
  return savedContact !== null ? JSON.parse(savedContact) : contactsSave;
};

export const App = () => {
  const [contacts, setContacts] = useState(() => getInitialContacts());
  const [filter, setFilter] = useState('');

  useEffect(() => {
    window.localStorage.setItem(LOCALSTORAGE, JSON.stringify(contacts));
  }, [contacts]);

  const addContact = newContact => {
    const isNewNameExists = contacts.some(
      item => item.name === newContact.name
    );

    if (isNewNameExists) {
      alert('This name already exists in the contact list');
      return;
    }

    setContacts(prevState => [
      ...prevState,
      {
        ...newContact,
        id: nanoid(),
      },
    ]);
  };

  const updateContactFilter = newContacts => {
    setFilter(newContacts);
  };

  const deleteContact = contactId => {
    setContacts(prevState => prevState.filter(item => item.id !== contactId));
  };

  const visibleContactItems = contacts.filter(item =>
    item.name.toLowerCase().includes(filter.toLowerCase())
  );

  

  return (
    <>
      <ContactForm onAdd={addContact} />
      <FilterContact filter={filter} onUpdateContact={updateContactFilter} />

      {contacts.length > 0 && (
        <ContactList contacts={visibleContactItems} onDelete={deleteContact} />
      )}
    </>
  );
};
