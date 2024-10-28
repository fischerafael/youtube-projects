"use client";

import React, { useState } from "react";

// Definição do nó da árvore binária
class TreeNode {
  value: string;
  left: TreeNode | null;
  right: TreeNode | null;

  constructor(value: string) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}

// Função para inserir uma palavra na árvore binária
function insertNode(root: TreeNode | null, value: string): TreeNode {
  if (!root) {
    return new TreeNode(value);
  }

  if (value < root.value) {
    root.left = insertNode(root.left, value);
  } else {
    root.right = insertNode(root.right, value);
  }

  return root;
}

// Função para construir a árvore a partir de uma lista de palavras
function buildTree(words: string[]): TreeNode | null {
  let root: TreeNode | null = null;
  words.forEach((word) => {
    root = insertNode(root, word);
  });
  return root;
}

// Função para buscar sugestões com base no prefixo digitado
function searchTree(
  node: TreeNode | null,
  prefix: string,
  suggestions: string[]
): void {
  if (!node) return;

  if (node.value.startsWith(prefix)) {
    suggestions.push(node.value);
  }

  if (node.value >= prefix) {
    searchTree(node.left, prefix, suggestions);
  }

  if (node.value <= prefix) {
    searchTree(node.right, prefix, suggestions);
  }
}

// Componente principal do autocomplete
export const BinaryTree: React.FC = () => {
  const [input, setInput] = useState("");
  const [suggestions, setSuggestions] = useState<string[]>([]);

  // Lista de palavras para o autocomplete
  const words = [
    "apple",
    "banana",
    "carrot",
    "date",
    "eggplant",
    "fig",
    "grape",
    "kiwi",
  ];
  const tree = buildTree(words); // Construir a árvore uma vez com as palavras

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setInput(value);

    if (value) {
      const newSuggestions: string[] = [];
      searchTree(tree, value, newSuggestions);
      setSuggestions(newSuggestions);
    } else {
      setSuggestions([]);
    }
  };

  return (
    <div>
      <h2>Autocomplete com Árvore Binária</h2>
      <input
        type="text"
        value={input}
        onChange={handleChange}
        placeholder="Digite para buscar..."
      />
      <ul>
        {suggestions.map((suggestion, index) => (
          <li key={index}>{suggestion}</li>
        ))}
      </ul>
    </div>
  );
};
