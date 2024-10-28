"use client";

import React, { useState } from "react";

export const ObjectsOverPrimitives = () => {
  const [inputA, setInputA] = useState(0);
  const [inputB, setInputB] = useState(0);

  return (
    <div>
      <input
        value={inputA}
        onChange={(e) => setInputA(e.target.valueAsNumber)}
      />
      <input
        value={inputB}
        onChange={(e) => setInputB(e.target.valueAsNumber)}
      />
      <p>Result {sum(inputA, inputB, 10)}</p>
    </div>
  );
};

const sum = (inputA: number, inputB: number, inputC: number): number =>
  inputA + inputB + inputC;
