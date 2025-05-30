import { NextResponse } from "next/server"

// Dados simulados do cardápio
const cardapioData = {
  categorias: [
    {
      id: 1,
      nome: "Entradas",
      itens: [
        {
          id: 101,
          nome: "Bruschetta",
          descricao: "Pão italiano com tomate, alho e manjericão",
          preco: 18.90,
          imagem: "https://source.unsplash.com/random/300x200/?bruschetta",
          disponivel: true
        },
        {
          id: 102,
          nome: "Carpaccio",
          descricao: "Finas fatias de carne crua com molho especial",
          preco: 32.50,
          imagem: "https://source.unsplash.com/random/300x200/?carpaccio",
          disponivel: true
        }
      ]
    },
    {
      id: 2,
      nome: "Pratos Principais",
      itens: [
        {
          id: 201,
          nome: "Filé Mignon",
          descricao: "Filé mignon grelhado com molho de vinho tinto e batatas",
          preco: 68.90,
          imagem: "https://source.unsplash.com/random/300x200/?steak",
          disponivel: true
        },
        {
          id: 202,
          nome: "Salmão Grelhado",
          descricao: "Salmão fresco grelhado com legumes e molho de ervas",
          preco: 59.90,
          imagem: "https://source.unsplash.com/random/300x200/?salmon",
          disponivel: true
        },
        {
          id: 203,
          nome: "Risoto de Funghi",
          descricao: "Risoto cremoso com mix de cogumelos frescos",
          preco: 48.50,
          imagem: "https://source.unsplash.com/random/300x200/?risotto",
          disponivel: false
        }
      ]
    },
    {
      id: 3,
      nome: "Sobremesas",
      itens: [
        {
          id: 301,
          nome: "Tiramisu",
          descricao: "Clássica sobremesa italiana com café e mascarpone",
          preco: 22.90,
          imagem: "https://source.unsplash.com/random/300x200/?tiramisu",
          disponivel: true
        },
        {
          id: 302,
          nome: "Cheesecake",
          descricao: "Cheesecake com calda de frutas vermelhas",
          preco: 19.90,
          imagem: "https://source.unsplash.com/random/300x200/?cheesecake",
          disponivel: true
        }
      ]
    },
    {
      id: 4,
      nome: "Bebidas",
      itens: [
        {
          id: 401,
          nome: "Vinho Tinto",
          descricao: "Taça de vinho tinto seco",
          preco: 28.00,
          imagem: "https://source.unsplash.com/random/300x200/?wine",
          disponivel: true
        },
        {
          id: 402,
          nome: "Água Mineral",
          descricao: "Garrafa de água mineral sem gás",
          preco: 6.50,
          imagem: "https://source.unsplash.com/random/300x200/?water",
          disponivel: true
        },
        {
          id: 403,
          nome: "Refrigerante",
          descricao: "Lata de refrigerante",
          preco: 8.00,
          imagem: "https://source.unsplash.com/random/300x200/?soda",
          disponivel: true
        }
      ]
    }
  ]
}

export async function GET() {
  // Simula um pequeno atraso para mostrar o estado de carregamento
  await new Promise(resolve => setTimeout(resolve, 500))
  
  return NextResponse.json(cardapioData)
}
