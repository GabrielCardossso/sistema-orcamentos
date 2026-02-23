'use client';

import { useEffect, useState } from "react";

type Pedido = {
  id: number;
  data: string;
  total: number;
  status: string;
  itens?: { produto_id: number; quantidade: number; preco_unitario: number }[];
};

export default function PedidosPage() {
  const [pedidos, setPedidos] = useState<Pedido[]>([]);

  const fetchPedidos = async () => {
    const res = await fetch('/api/pedidos');
    const data = await res.json();
    setPedidos(data);
  };

  useEffect(() => {
    fetchPedidos();
  }, []);

return (
  <div className="w-full max-w-4xl mx-auto flex flex-col">

    <h1 className="text-6xl font-bold text-center mt-12">
      Pedidos
    </h1>

    <ul className="space-y-6 mt-16">
      {pedidos.map(p => (
        <li
          key={p.id}
          className="
            bg-[#2A2D34]
            p-6
            rounded-2xl
            border border-[#343741]
            hover:border-purple-500
            transition
          "
        >

          {/* HEADER DO PEDIDO */}
          <div className="flex justify-between items-center mb-4">
            <div>
              <p className="font-semibold text-lg">
                {new Date(p.data).toLocaleString()}
              </p>
              <p className="text-gray-400 text-sm">
                Pedido #{p.id}
              </p>
            </div>

            <div className="text-right">
              <p className="text-xl font-bold">
                R$ {p.total.toFixed(2)}
              </p>

              <span
                className={`
                  inline-block mt-2 px-3 py-1 rounded-full text-sm
                  ${
                    p.status === "concluido"
                      ? "bg-green-600/20 text-green-400"
                      : p.status === "cancelado"
                      ? "bg-red-600/20 text-red-400"
                      : "bg-yellow-600/20 text-yellow-400"
                  }
                `}
              >
                {p.status}
              </span>
            </div>
          </div>

          {/* ITENS */}
          {p.itens && p.itens.length > 0 && (
            <div className="mt-4 border-t border-[#343741] pt-4 space-y-2">
              <p className="font-semibold text-sm text-gray-400">
                Itens
              </p>

              {p.itens.map(item => (
                <div
                  key={item.produto_id}
                  className="flex justify-between text-sm"
                >
                  <span>
                    Produto #{item.produto_id} • Qtd: {item.quantidade}
                  </span>
                  <span>
                    R$ {(item.preco_unitario * item.quantidade).toFixed(2)}
                  </span>
                </div>
              ))}
            </div>
          )}

        </li>
      ))}
    </ul>

  </div>
);
}