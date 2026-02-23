'use client'

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function CreateProduto() {
  const router = useRouter();

  const [nome, setNome] = useState("");
  const [preco, setPreco] = useState("");
  const [estoque, setEstoque] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    await fetch("/api/produtos", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        nome,
        preco: Number(preco),
        estoque: Number(estoque),
      }),
    });

    router.push("/produtos");
  }

  return (
    <div className="w-full flex justify-center mt-16">

      <div
        className="
          w-full max-w-lg
          bg-[#1E1F24]
          border border-[#343741]
          rounded-2xl
          p-10
          shadow-[0_20px_60px_rgba(42,45,52,0.6)]
        "
      >
        <h1 className="text-3xl font-bold text-center mb-8">
          Criar Produto
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">

          {/* NOME */}
          <div>
            <label className="block text-sm text-gray-400 mb-2">
              Nome do Produto
            </label>
            <input
              type="text"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              required
              className="
                w-full
                bg-[#2A2D34]
                border border-[#343741]
                rounded-xl
                px-4 py-3
                focus:outline-none
                focus:ring-2
                focus:ring-purple-600
                transition
              "
            />
          </div>

          {/* PREÇO */}
          <div>
            <label className="block text-sm text-gray-400 mb-2">
              Preço
            </label>
            <input
              type="number"
              step="0.01"
              value={preco}
              onChange={(e) => setPreco(e.target.value)}
              required
              className="
                w-full
                bg-[#2A2D34]
                border border-[#343741]
                rounded-xl
                px-4 py-3
                focus:outline-none
                focus:ring-2
                focus:ring-purple-600
                transition
              "
            />
          </div>

          {/* ESTOQUE */}
          <div>
            <label className="block text-sm text-gray-400 mb-2">
              Estoque
            </label>
            <input
              type="number"
              value={estoque}
              onChange={(e) => setEstoque(e.target.value)}
              required
              className="
                w-full
                bg-[#2A2D34]
                border border-[#343741]
                rounded-xl
                px-4 py-3
                focus:outline-none
                focus:ring-2
                focus:ring-purple-600
                transition
              "
            />
          </div>

          {/* BOTÃO */}
          <button
            type="submit"
            className="
              w-full
              bg-gradient-to-r from-purple-600 to-blue-600
              py-3
              rounded-xl
              font-semibold
              text-lg
              hover:opacity-90
              transition-all duration-200
            "
          >
            Criar Produto
          </button>

        </form>
      </div>

    </div>
  );
}