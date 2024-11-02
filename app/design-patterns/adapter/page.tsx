"use client";

import React, { useState } from "react";

const page = () => {
  const [state, setState] = useState({
    email: "",
    password: "",
  });

  const logIn = async () => {
    await newLoginAdapter.execute(state.email, state.password);
  };

  return (
    <div>
      <form>
        <input
          placeholder="email"
          type="email"
          value={state.email}
          onChange={(e) =>
            setState((prev) => ({ ...prev, email: e.target.value }))
          }
        />
        <input
          placeholder="password"
          value={state.password}
          type="password"
          onChange={(e) =>
            setState((prev) => ({ ...prev, password: e.target.value }))
          }
        />
        <button
          onClick={(e) => {
            e.preventDefault();
            logIn();
          }}
        >
          Log In
        </button>
      </form>
    </div>
  );
};

export default page;

// backend

interface LoginAdapterInterface {
  execute: (email: string, password: string) => Promise<string>;
}

interface NewLoginInterface {
  execute: ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) => Promise<string>;
}

class CurrentLogin implements LoginAdapterInterface {
  execute = async (email: string, password: string) => {
    // valida email, valida password, verifica se o password é valido e retorna um jwt
    console.log("[old login][fake-jwt]");
    return "fake-jwt";
  };
}

const currentLogin = new CurrentLogin();

class NewLogin implements NewLoginInterface {
  execute = async ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) => {
    console.log("[new login][fake-jwt]");
    return "fake-jwt";
  };
}

const newLogin = new NewLogin();

class NewLoginAdapter implements LoginAdapterInterface {
  constructor(private NewLogin: NewLoginInterface) {}

  execute = async (email: string, password: string) => {
    const res = await this.NewLogin.execute({
      email: email,
      password: password,
    });
    console.log("[NewLoginAdapter][execute]", res);
    return res;
  };
}

const newLoginAdapter = new NewLoginAdapter(newLogin);
