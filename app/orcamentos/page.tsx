'use client';

import Link from "next/link";
import { useEffect, useState } from "react";

type Orcamento = {
  id: number;
  data: string;
  total: number;
};

export default function OrcamentosPage() {
  const [orcamentos, setOrcamentos] = useState<Orcamento[]>([]);

  const fetchOrcamentos = async () => {
    const res = await fetch("/api/orcamentos");
    const data = await res.json();
    setOrcamentos(data);
  };

  useEffect(() => {
    fetchOrcamentos();
  }, []);

  const converterEmPedido = async (id: number) => {
    const response = await fetch(`/api/pedidos`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ orcamento_id: id })
    });

    if (response.ok) {
      alert("Pedido feito!");
      fetchOrcamentos(); // opcional, atualizar lista
    } else {
      const data = await response.json();
      alert("Erro: " + data.error);
    }
  };

return (
  <div className="w-full max-w-4xl mx-auto flex flex-col">

    <h1 className="text-6xl font-bold text-center mt-12">
      Orçamentos
    </h1>

    {/* CARD PRINCIPAL */}
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
          Crie e gerencie seus orçamentos
        </h2>

        <Link
          href="/orcamentos/create"
          className="
            inline-block 
            bg-gradient-to-r from-purple-600 to-blue-600
            px-6 py-3 rounded-xl 
            font-medium text-lg
            hover:opacity-90 transition-all duration-200
          "
        >
          Novo Orçamento
        </Link>
      </div>
    </div>

    {/* LISTA */}
    <ul className="space-y-4 mt-16">
      {orcamentos.map(o => (
        <li
          key={o.id}
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
              {new Date(o.data).toLocaleString()}
            </p>
            <p className="text-gray-400 text-sm">
              R$ {o.total.toFixed(2)}
            </p>
          </div>

          <button
            onClick={() => converterEmPedido(o.id)}
            className="
              px-4 py-2 
              bg-yellow-600/20 
              text-yellow-400 
              rounded-xl 
              border border-yellow-500/30
              hover:bg-yellow-600/30 
              transition
            "
          >
            Fazer Pedido
          </button>
        </li>
      ))}
    </ul>

  </div>
);
}