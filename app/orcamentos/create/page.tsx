'use client'

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type Produto = {
  id: number;
  nome: string;
  preco: number;
  estoque: number;
};

type OrcamentoItem = {
  produto_id: number;
  quantidade: number;
  preco_unitario: number;
};

export default function CreateOrcamento() {
  const router = useRouter();
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [itens, setItens] = useState<OrcamentoItem[]>([]);

  useEffect(() => {
    fetch("/api/produtos")
      .then(res => res.json())
      .then(data => setProdutos(data));
  }, []);

  const addItem = (produto: Produto) => {
    const existing = itens.find(i => i.produto_id === produto.id);
    if (existing) {
      existing.quantidade += 1;
      setItens([...itens]);
    } else {
      setItens([...itens, { produto_id: produto.id, quantidade: 1, preco_unitario: produto.preco }]);
    }
  };

  const total = itens.reduce((acc, item) => acc + item.quantidade * item.preco_unitario, 0);

  const criarOrcamento = async () => {
    if (itens.length === 0) return;

    const response = await fetch("/api/orcamentos", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ itens }) // só itens
    });

    if (response.ok) {
      alert("Orçamento criado!");
      router.push("/orcamentos");
    } else {
      const data = await response.json();
      alert("Erro: " + data.error);
    }
  };

return (
  <div className="w-full max-w-4xl mx-auto flex flex-col">

    <h1 className="text-6xl font-bold text-center mt-12">
      Novo Orçamento
    </h1>

    <div className="flex justify-center mt-16">
      <div
        className="
          bg-[#1E1F24]
          w-full
          max-w-2xl
          p-10
          rounded-2xl
          shadow-[0_10px_40px_rgba(42,45,52,0.6)]
          border border-[#343741]
        "
      >

        {/* PRODUTOS */}
        <div className="mb-10">
          <h2 className="text-2xl font-semibold mb-6">
            Produtos
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {produtos.map(prod => (
              <button
                key={prod.id}
                onClick={() => addItem(prod)}
                className="
                  bg-[#2A2D34]
                  border border-[#343741]
                  rounded-xl
                  p-4
                  text-left
                  hover:border-purple-500
                  transition
                "
              >
                <p className="font-semibold">
                  {prod.nome}
                </p>
                <p className="text-gray-400 text-sm">
                  R$ {prod.preco.toFixed(2)}
                </p>
              </button>
            ))}
          </div>
        </div>

        {/* ITENS */}
        <div>
          <h2 className="text-2xl font-semibold mb-6">
            Itens do orçamento
          </h2>

          {itens.length === 0 && (
            <p className="text-gray-400">
              Nenhum produto adicionado.
            </p>
          )}

          <ul className="space-y-4">
            {itens.map(item => {
              const produto = produtos.find(p => p.id === item.produto_id);
              return (
                <li
                  key={item.produto_id}
                  className="
                    bg-[#2A2D34]
                    border border-[#343741]
                    rounded-xl
                    p-4
                    flex justify-between items-center
                  "
                >
                  <div>
                    <p className="font-semibold">
                      {produto?.nome}
                    </p>
                    <p className="text-gray-400 text-sm">
                      R$ {(item.quantidade * item.preco_unitario).toFixed(2)}
                    </p>
                  </div>

                  <div className="flex items-center gap-3">

                    <button
                      className="
                        px-3 py-1
                        bg-[#1E1F24]
                        border border-[#343741]
                        rounded-lg
                        hover:border-purple-500
                        transition
                      "
                      onClick={() =>
                        setItens(itens.map(i =>
                          i.produto_id === item.produto_id
                            ? { ...i, quantidade: Math.max(1, i.quantidade - 1) }
                            : i
                        ))
                      }
                    >
                      -
                    </button>

                    <span className="font-semibold">
                      {item.quantidade}
                    </span>

                    <button
                      className="
                        px-3 py-1
                        bg-[#1E1F24]
                        border border-[#343741]
                        rounded-lg
                        hover:border-purple-500
                        transition
                      "
                      onClick={() =>
                        setItens(itens.map(i =>
                          i.produto_id === item.produto_id
                            ? { ...i, quantidade: i.quantidade + 1 }
                            : i
                        ))
                      }
                    >
                      +
                    </button>

                    <button
                      className="
                        text-red-400
                        hover:text-red-500
                        transition
                        ml-2
                      "
                      onClick={() =>
                        setItens(itens.filter(i => i.produto_id !== item.produto_id))
                      }
                    >
                      Remover
                    </button>

                  </div>
                </li>
              );
            })}
          </ul>

          {/* TOTAL */}
          <div className="mt-8 flex justify-between items-center">
            <p className="text-xl font-bold">
              Total: R$ {total.toFixed(2)}
            </p>

            <button
              onClick={criarOrcamento}
              disabled={itens.length === 0}
              className="
                bg-gradient-to-r from-purple-600 to-blue-600
                px-6 py-3
                rounded-xl
                font-semibold
                hover:opacity-90
                transition
                disabled:opacity-40
              "
            >
              Salvar Orçamento
            </button>
          </div>

        </div>

      </div>
    </div>

  </div>
);
}