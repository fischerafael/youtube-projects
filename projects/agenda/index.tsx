"use client";

import React, { useRef, useState } from "react";

export const Agenda = () => {
  const [contacts, setContacts] = useState<string[]>([]);

  const inputRef = useRef<HTMLInputElement | null>(null);

  const onAdd = () => {
    setContacts((prev) => [...prev, inputRef!.current!.value!]);
    inputRef!.current!.value! = "";
  };

  return (
    <div>
      <input ref={inputRef} />
      <button onClick={onAdd}>Save</button>

      <div>
        {contacts.map((contact) => (
          <p key={contact}>{contact}</p>
        ))}
      </div>
    </div>
  );
};
