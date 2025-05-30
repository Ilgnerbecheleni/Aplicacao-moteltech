import { NextResponse } from "next/server";
import { getConnection } from "@/lib/db";

const BASE_URL = "https://moteltech.com.br/gramado/modules/products/uploads/";

export async function GET() {
  const conn = await getConnection();

  try {
    const [rows] = await conn.execute("SELECT * FROM tblproduct_master");

    const produtosComImagemUrl = (rows as any[]).map((produto) => ({
      ...produto,
      product_image: produto.product_image
        ? `${BASE_URL}${produto.product_image}`
        : null,
    }));

    return NextResponse.json(produtosComImagemUrl);
  } catch (error) {
    console.error("Erro ao buscar produtos:", error);
    return NextResponse.json(
      { error: "Erro ao buscar produtos" },
      { status: 500 }
    );
  } finally {
    await conn.end();
  }
}
