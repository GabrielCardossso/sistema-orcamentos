'use client';

import { useEffect, useState } from "react";
import Link from "next/link";

interface Produto {
  id: number;
  nome: string;
  preco: number;
  estoque: number;
}

export default function ProdutosPage() {
  const [produtos, setProdutos] = useState<Produto[]>([]);

  useEffect(() => {
    fetch('/api/produtos')
      .then(res => res.json())
      .then(data => setProdutos(data));
  }, []);

return (
  <div className="w-full max-w-4xl mx-auto flex flex-col">

    <h1 className="text-6xl font-bold text-center mt-12">
      Produtos
    </h1>

    <div className="flex justify-center mt-16">
      <div
        className="
          bg-[#1E1F24]
          max-w-md w-full
          p-8 rounded-2xl
          shadow-[0_10px_40px_rgba(42,45,52,0.6)]
          border border-[#343741]
          text-center
        "
      >
        <h2 className="text-2xl font-bold mb-6">
          Gerencie seus produtos facilmente
        </h2>

        <Link
          href="/produtos/create"
          className="
            inline-block 
            bg-gradient-to-r from-purple-600 to-blue-600
            px-6 py-3 rounded-xl 
            font-medium text-lg
            hover:opacity-90 transition-all duration-200
          "
        >
          Novo Produto
        </Link>
      </div>
    </div>

    <ul className="space-y-4 mt-16">
      {produtos.map(produto => (
        <li
          key={produto.id}
          className="
            bg-[#2A2D34] 
            p-4 
            rounded-xl 
            flex justify-between items-center 
            border border-[#343741] 
            hover:border-purple-500 
            transition
          "
        >
          <div>
            <p className="font-semibold text-lg">
              {produto.nome}
            </p>
            <p className="text-gray-400 text-sm">
              R$ {produto.preco.toFixed(2)} • Estoque: {produto.estoque}
            </p>
          </div>
        </li>
      ))}
    </ul>

  </div>
);
}