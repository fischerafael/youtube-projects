"use client";
import React, { useState } from "react";

export const LongMethod = () => {
  const [scores, setScores] = useState<number[]>([]);

  const [input, setInput] = useState(0);
  const onAddScore = () => {
    setScores((prev) => [...prev, input]);
    setInput(0);
  };

  return (
    <div>
      <input value={input} onChange={(e) => setInput(e.target.valueAsNumber)} />
      <button onClick={onAddScore}>Add Score</button>

      {scores.map((score, index) => (
        <p key={index}>{score}</p>
      ))}
    </div>
  );
};
