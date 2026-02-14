# Sistema de Orçamentos e Pedidos (Em Desenvolvimento)

## 🎯 Finalidade do Projeto

Este projeto é um mini sistema para gerenciar produtos, orçamentos e pedidos, com o objetivo de aprender e aplicar conceitos de sistemas web completos, incluindo CRUD, banco de dados relacional e fluxo de negócios real.

O sistema permitirá:
- Cadastro de produtos
- Criação de orçamentos adicionando produtos
- Conversão de orçamentos em pedidos
- Armazenamento de todas as informações em um banco SQLite

---

## 🛠 Tecnologias Previstas

- [Next.js](https://nextjs.org/) (TypeScript, App Router)
- [Tailwind CSS](https://tailwindcss.com/) para estilização rápida e moderna
- [Zod](https://zod.dev/) para validação de dados
- SQLite como banco de dados relacional leve

---

## 📂 Estrutura do Projeto

```
app/
components/
lib/
schemas/
database/
```

- `app/` → telas e rotas do Next.js  
- `components/` → componentes visuais reutilizáveis  
- `lib/` → conexão com o banco (`db.ts`)  
- `schemas/` → validação de dados com Zod  
- `database/` → arquivo SQLite (`database.db`)  

---

## ⚡ Funcionalidades Planejadas

- **Produtos:** Listagem, criação e validação de dados  
- **Orçamentos:** Adição de produtos, cálculo de total e armazenamento  
- **Pedidos:** Conversão de orçamentos em pedidos e atualização de status  

---

## 🧠 O que pretendo aprender com este projeto

- Estrutura de sistemas web modernos  
- CRUD completo (Produtos, Orçamentos, Pedidos)  
- Banco relacional com SQLite  
- Validação de formulários com Zod  
- Separação entre Front-end e API  
- Fluxo de negócio (Orçamento → Pedido)

