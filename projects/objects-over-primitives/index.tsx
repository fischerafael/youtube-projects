"use client";

import React, { useState } from "react";

export const ObjectsOverPrimitives = () => {
  const fruits = ["abacate", "banana", "cereja"];
  return (
    <div>
      {fruits.map((fruit) => (
        <p key={fruit}>{fruit}</p>
      ))}
    </div>
  );
};
