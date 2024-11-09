"use client";

import React, { useState } from "react";

const ValueObject = () => {
  const [email, setEmail] = useState<string>("");

  const onJoin = async () => {
    try {
      const emailVo = new Email(email);
      console.log("[email]", emailVo.email);
      console.log("[email domain]", emailVo.emailDomain);

      // logica do join na lead list
      // api call
    } catch (e: any) {
      alert(e.message);
    }
  };

  return (
    <div>
      <input
        placeholder="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <button onClick={onJoin}>Join List</button>
    </div>
  );
};

export default ValueObject;

class Email {
  private _email: string | null = null;

  constructor(email: string) {
    if (!email) throw new Error("You must provide an email");
    if (!this.validateEmail(email)) throw new Error("This email is invalid");
    this._email = email;
  }

  get email() {
    return this._email;
  }

  get emailDomain() {
    if (this._email === null) throw new Error("Invalid email");
    const url = this._email.split("@")[1];
    const companyDomain = url.split(".")[0];
    return companyDomain;
  }

  private validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };
}
