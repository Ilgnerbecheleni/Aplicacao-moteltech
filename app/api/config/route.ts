import { NextResponse } from "next/server"
import { getConnection } from "@/lib/db"

export async function GET() {
  try {
    const connection = await getConnection()

    const [rows] = await connection.execute(
      `SELECT name, value FROM tbloptions WHERE name IN (?, ?)`,
      ['company_logo', 'companyname']
    )

    const config: Record<string, string> = {}
    for (const row of rows as { name: string; value: string }[]) {
      config[row.name] = row.value
    }

    const logoFilename = config['company_logo'] || ''
    const fullLogoUrl = `https://moteltech.com.br/gramado/uploads/company/${logoFilename}`

    return NextResponse.json({
      company_logo: fullLogoUrl,
      companyname: config['companyname'] || '',
    })
  } catch (error) {
    console.error("Erro ao buscar configurações:", error)
    return NextResponse.json({ error: "Erro interno ao buscar configurações" }, { status: 500 })
  }
}
