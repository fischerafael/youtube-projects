import React, { useState } from "react";

// Definição da estrutura de um nó na árvore binária
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

// Função para inserir um nó na árvore binária
function insertNode(root: TreeNode | null, value: string): TreeNode {
  if (!root) {
    return new TreeNode(value);
  }

  if (value < root.value) {
    root.left = insertNode(root.left, value);
  } else if (value > root.value) {
    root.right = insertNode(root.right, value);
  }

  return root;
}

// Função recursiva para renderizar a árvore binária
function renderTree(node: TreeNode | null): JSX.Element | null {
  if (!node) return null;

  return (
    <div className="flex flex-col w-fit gap-2 items-center">
      <p className="bg-gray-100 ">
        {node.left?.value ? "1" : "2"} - {node.value}
      </p>
      <div className="flex gap-2 ">
        {
          renderTree(node.left) ? (
            <div className="flex gap-1">{renderTree(node.left)}</div>
          ) : null
          //   <div className="bg-gray-100 min-w-[100px] h-fit">1 - Empty</div>
        }

        {renderTree(node.right) ? (
          <div>{renderTree(node.right)}</div>
        ) : null
        //   <div className="bg-gray-100 min-w-[100px] h-fit">2 - Empty</div>
        }
      </div>
    </div>
  );
}

// Componente principal da aplicação
export const RenderBinaryTree: React.FC = () => {
  const [inputValue, setInputValue] = useState("");
  const [root, setRoot] = useState<TreeNode | null>(null);

  // Função para lidar com o botão "Add"
  const handleAddWord = () => {
    if (inputValue.trim() === "") return;

    // Atualiza a árvore binária com a nova palavra
    setRoot((currentRoot) => insertNode(currentRoot, inputValue));
    setInputValue(""); // Limpa o campo de entrada
  };

  return (
    <div className="flex flex-col items-center">
      <h1 className="text-2xl font-bold mb-4">Binary Tree Visualizer</h1>
      <div className="flex mb-4">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Digite uma palavra"
          className="border border-gray-300 p-2 rounded-l"
        />
        <button
          onClick={handleAddWord}
          className="bg-blue-500 text-white p-2 rounded-r hover:bg-blue-600"
        >
          Add
        </button>
      </div>

      <h2 className="text-xl font-semibold mb-4">Árvore Binária</h2>
      <div className="flex justify-center">{renderTree(root)}</div>
    </div>
  );
};
